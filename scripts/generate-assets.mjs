import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");

// 1. Generate SVG Logo & Favicon with dark/light auto-adaptation
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <style>
    :root {
      --bg: #15181d;
      --border: #282d36;
      --fg: #ece9e2;
      --accent: #fb923c;
    }
    @media (prefers-color-scheme: light) {
      :root {
        --bg: #fcfbf8;
        --border: #e0dcd2;
        --fg: #16181d;
        --accent: #be3e0a;
      }
    }
    .badge { fill: var(--bg); stroke: var(--border); stroke-width: 1.2; }
    .glyph-main { stroke: var(--fg); stroke-width: 2.2; stroke-linecap: round; }
    .glyph-accent { stroke: var(--accent); stroke-width: 2.2; stroke-linecap: round; }
  </style>
  <rect width="32" height="32" rx="7.5" class="badge"/>
  <path d="M8 24L15.5 8" class="glyph-main"/>
  <path d="M15.5 8V24" class="glyph-main"/>
  <path d="M15.5 8H24" class="glyph-accent"/>
  <path d="M11.75 16H21.5" class="glyph-main"/>
</svg>
`;

fs.writeFileSync(path.join(publicDir, "logo.svg"), svgContent.trim());
fs.writeFileSync(path.join(publicDir, "favicon.svg"), svgContent.trim());
fs.writeFileSync(path.join(publicDir, "icon.svg"), svgContent.trim());
console.log("SVG logo & favicons written successfully.");

// 2. Generate crisp binary favicon.ico (32x32 32-bit RGBA)
const width = 32;
const height = 32;

function distToSegment(px, py, x1, y1, x2, y2) {
  const l2 = (x2 - x1) ** 2 + (y2 - y1) ** 2;
  if (l2 === 0) return Math.hypot(px - x1, py - y1);
  let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (x1 + t * (x2 - x1)), py - (y1 + t * (y2 - y1)));
}

// Pixel buffer: BGRA bottom-to-top
const pixelData = Buffer.alloc(width * height * 4);
const andMask = Buffer.alloc(width * 4); // 32 rows * 4 bytes per row = 128 bytes

for (let y = 0; y < height; y++) {
  // BMP stores bottom row first
  const bmpY = height - 1 - y;
  for (let x = 0; x < width; x++) {
    const idx = (bmpY * width + x) * 4;

    // Badge rounded rect SDF
    const cornerR = 7.5;
    const cx = Math.max(0, Math.max(cornerR - x, x - (width - 1 - cornerR)));
    const cy = Math.max(0, Math.max(cornerR - y, y - (height - 1 - cornerR)));
    const cornerDist = Math.hypot(cx, cy);

    if (cornerDist > cornerR + 0.5) {
      // Outside
      pixelData[idx + 0] = 0;
      pixelData[idx + 1] = 0;
      pixelData[idx + 2] = 0;
      pixelData[idx + 3] = 0;
      const maskByte = bmpY * 4 + Math.floor(x / 8);
      andMask[maskByte] |= (1 << (7 - (x % 8)));
      continue;
    }

    // Default badge background #15181d
    let b = 0x1d, g = 0x18, r = 0x15, a = 255;

    // Badge border #282d36
    if (cornerDist >= cornerR - 1.2 || x <= 1 || x >= width - 2 || y <= 1 || y >= height - 2) {
      b = 0x36; g = 0x2d; r = 0x28;
    }

    // Check glyph strokes
    const dLeft = distToSegment(x, y, 8, 24, 15.5, 8);
    const dStem = distToSegment(x, y, 15.5, 8, 15.5, 24);
    const dCross = distToSegment(x, y, 11.75, 16, 21.5, 16);
    const dTop = distToSegment(x, y, 15.5, 8, 24, 8);

    const radius = 1.35;

    if (dTop <= radius) {
      // Accent ember #fb923c (B=0x3c, G=0x92, R=0xfb)
      b = 0x3c; g = 0x92; r = 0xfb;
    } else if (dLeft <= radius || dStem <= radius || dCross <= radius) {
      // Ivory #ece9e2 (B=0xe2, G=0xe9, R=0xec)
      b = 0xe2; g = 0xe9; r = 0xec;
    }

    pixelData[idx + 0] = b;
    pixelData[idx + 1] = g;
    pixelData[idx + 2] = r;
    pixelData[idx + 3] = a;
  }
}

// Construct ICO buffer
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // Reserved
header.writeUInt16LE(1, 2); // Icon
header.writeUInt16LE(1, 4); // 1 Image

const dirEntry = Buffer.alloc(16);
dirEntry.writeUInt8(width, 0);
dirEntry.writeUInt8(height, 1);
dirEntry.writeUInt8(0, 2); // Color palette
dirEntry.writeUInt8(0, 3); // Reserved
dirEntry.writeUInt16LE(1, 4); // Planes
dirEntry.writeUInt16LE(32, 6); // BPP
const imageSize = 40 + pixelData.length + andMask.length; // 40 + 4096 + 128 = 4264
dirEntry.writeUInt32LE(imageSize, 8);
dirEntry.writeUInt32LE(22, 12); // Offset = 6 + 16 = 22

const bih = Buffer.alloc(40);
bih.writeUInt32LE(40, 0); // biSize
bih.writeInt32LE(width, 4); // biWidth
bih.writeInt32LE(height * 2, 8); // biHeight (double for ICO)
bih.writeUInt16LE(1, 12); // biPlanes
bih.writeUInt16LE(32, 14); // biBitCount
bih.writeUInt32LE(0, 16); // biCompression (BI_RGB)
bih.writeUInt32LE(pixelData.length + andMask.length, 20); // biSizeImage

const icoBuffer = Buffer.concat([header, dirEntry, bih, pixelData, andMask]);
fs.writeFileSync(path.join(publicDir, "favicon.ico"), icoBuffer);
console.log("favicon.ico written successfully (" + icoBuffer.length + " bytes).");
