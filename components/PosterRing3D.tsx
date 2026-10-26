"use client";

import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

export type RingImage = { src: string; alt: string };

// Ring geometry in world units. The camera is set so one unit is roughly a fifth of the canvas height.
const RADIUS = 1.18; // ring diameter about 1.5x the head width, as in the reference
const ROW_H = 0.3; // two rows total about half the head height; cards come out near 1.8:1
const ROW_GAP = 0.05;
const BASE_SPEED = -0.05; // radians per second, a slow drift; negative so it turns toward the face
// Positive X shows the ring from slightly above so its far side appears over the hair; negative Z raises the
// left side, which is where this subject faces. The band wraps the upper head just above the eyebrows.
const TILT: [number, number, number] = [0.2, 0, -0.17];

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormalV;
  void main() {
    vUv = uv;
    vNormalV = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Directional blur along the direction of travel, periodic scanline glitch with RGB shift,
// a little static, a thin light frame, and edge shading from the surface normal.
const fragmentShader = /* glsl */ `
  uniform sampler2D map;
  uniform float uTime;
  uniform float uBlur;
  uniform float uSeed;
  varying vec2 vUv;
  varying vec3 vNormalV;

  float hash(float n) { return fract(sin(n) * 43758.5453123); }

  void main() {
    vec2 uv = vUv;
    // the far side of the ring is seen from inside: flip it so the artwork still reads left to right
    if (!gl_FrontFacing) uv.x = 1.0 - uv.x;
    float t = uTime + uSeed * 7.0;

    // glitch: a short burst every so often shifts a few scanlines sideways
    float gate = step(0.965, hash(floor(t * 2.0) + uSeed));
    float band = step(0.82, hash(floor(uv.y * 28.0) + floor(t * 9.0) + uSeed));
    uv.x += gate * band * (hash(floor(t * 23.0) + uSeed) - 0.5) * 0.08;

    // horizontal directional blur with chromatic aberration on the outer taps
    vec3 col = vec3(0.0);
    float total = 0.0;
    float ca = 0.0035 + uBlur * 0.4;
    for (int i = -4; i <= 4; i++) {
      float fi = float(i);
      float w = 1.0 - abs(fi) / 5.0;
      vec2 o = vec2(fi * uBlur, 0.0);
      col.r += texture2D(map, uv + o + vec2(ca, 0.0)).r * w;
      col.g += texture2D(map, uv + o).g * w;
      col.b += texture2D(map, uv + o - vec2(ca, 0.0)).b * w;
      total += w;
    }
    col /= total;

    // softer contrast so the cards sit back a little against the subject
    col = mix(vec3(0.5), col, 0.9) + 0.015;

    // static
    col += (hash(uv.x * 917.0 + uv.y * 311.0 + floor(t * 30.0)) - 0.5) * 0.05;

    // edge shading: darker as the surface turns away from the camera; the far side sits a little darker
    float facing = clamp(abs(vNormalV.z), 0.0, 1.0);
    float shade = mix(0.62, 1.0, smoothstep(0.0, 0.75, facing)) * (gl_FrontFacing ? 1.0 : 0.9);

    gl_FragColor = vec4(col * shade, 1.0);
  }
`;

type Refs = { speedRef: React.RefObject<number>; timeRef: React.RefObject<number>; reduce: boolean };

function Card({ texture, index, count, y, speedRef, timeRef }: { texture: THREE.Texture; index: number; count: number; y: number } & Omit<Refs, "reduce">) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const seg = (Math.PI * 2) / count;
  const geometry = useMemo(() => {
    // open cylinder segment: a plane bent to the ring radius, facing outward
    // the cylinder's own uv already reads left to right from outside; the shader flips the far side
    return new THREE.CylinderGeometry(RADIUS, RADIUS, ROW_H, 16, 1, true, 0, seg * 0.86);
  }, [seg]);
  const uniforms = useMemo(() => ({ map: { value: texture }, uTime: { value: 0 }, uBlur: { value: 0 }, uSeed: { value: index * 1.37 + y } }), [texture, index, y]);

  useFrame(() => {
    const m = matRef.current;
    if (!m) return;
    m.uniforms.uTime.value = timeRef.current;
    // ~10% blur at full speed, scaled to a per-tap uv offset
    m.uniforms.uBlur.value = Math.min(0.012, Math.abs(speedRef.current) * 0.1 * 0.045);
  });

  return (
    <mesh geometry={geometry} rotation={[0, index * seg, 0]} position={[0, y, 0]}>
      <shaderMaterial ref={matRef} uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Ring({ images, speedRef, timeRef, reduce }: { images: RingImage[] } & Refs) {
  const textures = useTexture(images.map((i) => i.src)) as THREE.Texture[];
  useEffect(() => {
    textures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 4;
      t.needsUpdate = true;
    });
  }, [textures]);

  const group = useRef<THREE.Group>(null);
  const rot = useRef(0);
  const drag = useRef({ on: false, x: 0, vel: 0 });
  const count = textures.length;
  const half = Math.floor(count / 2);

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);
    const target = reduce || drag.current.on ? 0 : BASE_SPEED;
    speedRef.current += (target - speedRef.current) * Math.min(1, d * 3.5);
    rot.current += speedRef.current * d + drag.current.vel;
    drag.current.vel *= 0.88;
    if (!reduce) timeRef.current += d;
    if (group.current) group.current.rotation.y = rot.current;
  });

  // drag to scrub; pointer moves are tracked on the window so the gesture survives leaving the ring
  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!drag.current.on) return;
      const dx = e.clientX - drag.current.x;
      drag.current.x = e.clientX;
      drag.current.vel = dx * 0.0045;
    };
    const up = () => {
      drag.current.on = false;
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, []);

  const onDown = (e: ThreeEvent<PointerEvent>) => {
    drag.current.on = true;
    drag.current.x = e.clientX;
    drag.current.vel = 0;
  };

  return (
    <group rotation={TILT}>
      {/* depth-only occluder standing in for the head: cards behind it are hidden, cards in front draw over the forehead */}
      <mesh renderOrder={-1} position={[-0.05, -0.55, 0]} scale={[1, 1.25, 1]}>
        <sphereGeometry args={[1.0, 32, 24]} />
        <meshBasicMaterial colorWrite={false} depthWrite />
      </mesh>
      <group ref={group} onPointerDown={onDown}>
        {textures.map((t, i) => (
          <Card key={`t${i}`} texture={t} index={i} count={count} y={(ROW_H + ROW_GAP) / 2} speedRef={speedRef} timeRef={timeRef} />
        ))}
        {/* lower row: half a turn round so no image repeats under itself, and offset by half a card so the columns never line up */}
        <group rotation={[0, Math.PI / count, 0]}>
          {textures.map((t, i) => (
            <Card key={`b${i}`} texture={textures[(i + half) % count]} index={i} count={count} y={-(ROW_H + ROW_GAP) / 2} speedRef={speedRef} timeRef={timeRef} />
          ))}
        </group>
      </group>
    </group>
  );
}

export default function PosterRing3D({ images }: { images: RingImage[] }) {
  const [inView, setInView] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const speedRef = useRef(BASE_SPEED);
  const timeRef = useRef(0);
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Render only while the poster is on screen.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "100px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="poster-canvas" aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        frameloop={inView ? "always" : "never"}
        camera={{ fov: 30, position: [0, 0.15, 7.2], near: 0.1, far: 30 }}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <group position={[-0.17, 0.66, 0]}>
<Ring images={images} speedRef={speedRef} timeRef={timeRef} reduce={reduce} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
