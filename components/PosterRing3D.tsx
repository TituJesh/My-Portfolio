"use client";

import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

export type RingImage = { src: string; alt: string };

// Ring geometry in world units. The camera is set so one unit is roughly a fifth of the canvas height.
const RADIUS = 1.45;
const ROW_H = 0.42;
const ROW_GAP = 0.07;
const BASE_SPEED = 0.28; // radians per second
// Negative X tips the front of the band (the part over the forehead) up and away from the face;
// positive Z raises the right side, which is the side his face points to.
const TILT: [number, number, number] = [-0.24, 0, 0.3];

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

    // static
    col += (hash(uv.x * 917.0 + uv.y * 311.0 + floor(t * 30.0)) - 0.5) * 0.06;

    // thin light frame around each card
    float fx = min(uv.x, 1.0 - uv.x);
    float fy = min(uv.y, 1.0 - uv.y);
    float frame = 1.0 - smoothstep(0.012, 0.02, min(fx * 0.66, fy));
    col = mix(col, vec3(0.92), frame * 0.9);

    // edge shading: darker as the surface turns away from the camera
    float facing = clamp(vNormalV.z, 0.0, 1.0);
    float shade = mix(0.22, 1.0, smoothstep(0.0, 0.75, facing));

    gl_FragColor = vec4(col * shade, 1.0);
  }
`;

type Refs = { speedRef: React.RefObject<number>; timeRef: React.RefObject<number>; reduce: boolean };

function Card({ texture, index, count, y, speedRef, timeRef }: { texture: THREE.Texture; index: number; count: number; y: number } & Omit<Refs, "reduce">) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const seg = (Math.PI * 2) / count;
  const geometry = useMemo(() => {
    // open cylinder segment: a plane bent to the ring radius, facing outward
    const g = new THREE.CylinderGeometry(RADIUS, RADIUS, ROW_H, 16, 1, true, 0, seg * 0.86);
    // flip u so the image reads left to right from outside
    const uv = g.attributes.uv as THREE.BufferAttribute;
    for (let i = 0; i < uv.count; i++) uv.setX(i, 1 - uv.getX(i));
    return g;
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
      <shaderMaterial ref={matRef} uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} side={THREE.FrontSide} />
    </mesh>
  );
}

function Ring({ images, speedRef, timeRef, reduce, onHover }: { images: RingImage[]; onHover: (v: boolean) => void } & Refs) {
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
  const hover = useRef(false);
  const count = textures.length;
  const half = Math.floor(count / 2);

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);
    const target = reduce ? 0 : drag.current.on ? 0 : hover.current ? BASE_SPEED * 0.18 : BASE_SPEED;
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
      {/* depth-only occluder standing in for the head: cards behind it are hidden, cards in front draw over the temple */}
      <mesh renderOrder={-1} position={[0, -0.1, 0]}>
        <cylinderGeometry args={[1.02, 1.02, 2.6, 32]} />
        <meshBasicMaterial colorWrite={false} depthWrite />
      </mesh>
      <group
        ref={group}
        onPointerOver={() => {
          hover.current = true;
          onHover(true);
        }}
        onPointerOut={() => {
          hover.current = false;
          onHover(false);
        }}
        onPointerDown={onDown}
      >
        {textures.map((t, i) => (
          <Card key={`t${i}`} texture={t} index={i} count={count} y={(ROW_H + ROW_GAP) / 2} speedRef={speedRef} timeRef={timeRef} />
        ))}
        {textures.map((t, i) => (
          // lower row starts half a turn round so the two rows never show the same image stacked
          <Card key={`b${i}`} texture={textures[(i + half) % count]} index={i} count={count} y={-(ROW_H + ROW_GAP) / 2} speedRef={speedRef} timeRef={timeRef} />
        ))}
      </group>
    </group>
  );
}

export default function PosterRing3D({ images }: { images: RingImage[] }) {
  const [inView, setInView] = useState(false);
  const [hovering, setHovering] = useState(false);
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
    <div ref={wrap} className="poster-canvas" style={{ cursor: hovering ? "grab" : "default" }} aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        frameloop={inView ? "always" : "never"}
        camera={{ fov: 30, position: [0, 0.15, 7.2], near: 0.1, far: 30 }}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <group position={[0, 0.72, 0]}>
            <Ring images={images} speedRef={speedRef} timeRef={timeRef} reduce={reduce} onHover={setHovering} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
