import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const asset = (name) => fileURLToPath(new URL(`../public/${name}`, import.meta.url));
await sharp(asset('hero-golden-landscape.jpg')).resize({ width: 2400, withoutEnlargement: true }).webp({ quality: 88 }).toFile(asset('hero-golden-landscape.webp'));
// Rasterize the cloud's noise once; no turbulence or blur filters run per frame.
const cloud = `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="480" viewBox="0 0 1400 480">
<defs>
<radialGradient id="shape"><stop stop-color="#ddd0b8" stop-opacity=".85"/><stop offset=".55" stop-color="#b6a48e" stop-opacity=".65"/><stop offset="1" stop-color="#887a6d" stop-opacity="0"/></radialGradient>
<filter id="cloud" x="-25%" y="-50%" width="150%" height="200%" color-interpolation-filters="sRGB">
<feTurbulence type="fractalNoise" baseFrequency=".009 .019" numOctaves="4" seed="12" result="noise"/>
<feDisplacementMap in="SourceGraphic" in2="noise" scale="105" xChannelSelector="R" yChannelSelector="G" result="shape"/>
<feColorMatrix in="noise" type="matrix" values="0 0 0 0 1 0 0 0 0 .91 0 0 0 0 .77 0 0 0 1.6 -.3" result="texture"/>
<feComposite in="texture" in2="shape" operator="in"/><feGaussianBlur stdDeviation="2"/>
</filter></defs>
<g filter="url(#cloud)"><ellipse cx="670" cy="255" rx="560" ry="145" fill="url(#shape)"/><ellipse cx="450" cy="210" rx="260" ry="145" fill="url(#shape)"/><ellipse cx="840" cy="225" rx="320" ry="160" fill="url(#shape)"/></g></svg>`;
await sharp(Buffer.from(cloud)).png().toFile(asset('hero-preview-cloud.png'));
console.log('Prepared landscape and raster cloud assets.');
