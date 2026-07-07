// Generates PWA icons from the CampOS mark in public/logo.png.
// Run with: node scripts/generate-icons.mjs
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "public/logo.png";
const OUT = "public/icons";

// Brand background for icon tiles. The mark is a dark-green emblem, so a clean
// near-white tile keeps it legible on any home screen while matching the site.
const BG = { r: 255, g: 255, b: 255, alpha: 1 };

await mkdir(OUT, { recursive: true });

// Trim the surrounding whitespace/construction-grid down to just the mark, then
// lift the faint near-white blueprint lines to pure white without crushing the
// dark-green emblem (linear: out = 1.5*in - 64).
const mark = await sharp(SRC)
  .trim({ threshold: 30 })
  .linear(1.5, -64)
  .flatten({ background: BG }) // drop any residual alpha onto white
  .png()
  .toBuffer();

async function tile(size, innerRatio, name) {
  const inner = Math.round(size * innerRatio);
  const resized = await sharp(mark)
    .resize(inner, inner, { fit: "inside", background: BG })
    .toBuffer();
  await sharp({
    create: { width: size, height: size, channels: 4, background: BG },
  })
    .composite([{ input: resized, gravity: "center" }])
    .png()
    .toFile(`${OUT}/${name}`);
  console.log("wrote", `${OUT}/${name}`, `${size}x${size}`);
}

// Standard "any" icons: modest padding so the mark reads at a glance.
await tile(192, 0.72, "icon-192.png");
await tile(512, 0.72, "icon-512.png");

// Maskable icons: mark kept inside the circular safe zone (~56% of the tile).
await tile(192, 0.56, "maskable-192.png");
await tile(512, 0.56, "maskable-512.png");

// Apple touch icon: iOS applies its own squircle mask, so leave a little room.
await tile(180, 0.68, "apple-touch-icon.png");

// App-directory file conventions (Next.js auto-links these):
//   app/icon.png       -> favicon      app/apple-icon.png -> apple-touch-icon
async function appTile(size, innerRatio, path) {
  const inner = Math.round(size * innerRatio);
  const resized = await sharp(mark)
    .resize(inner, inner, { fit: "inside", background: BG })
    .toBuffer();
  await sharp({
    create: { width: size, height: size, channels: 4, background: BG },
  })
    .composite([{ input: resized, gravity: "center" }])
    .png()
    .toFile(path);
  console.log("wrote", path, `${size}x${size}`);
}

// Favicon reads at tiny sizes, so give the mark a bit more room.
await appTile(512, 0.82, "app/icon.png");
await appTile(180, 0.68, "app/apple-icon.png");
