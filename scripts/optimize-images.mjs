/**
 * One-shot asset optimiser. Screenshots and photos in public/ were committed at
 * full export size (3.3 MB total, logo.png alone was 1024px square for a 32px
 * slot). Re-encodes them to WebP at the largest size they are actually rendered
 * at. Run with `node scripts/optimize-images.mjs`.
 */
import sharp from "sharp";
import { readFileSync, writeFileSync, statSync } from "node:fs";

const KB = (bytes) => `${(bytes / 1024).toFixed(0)}KB`;

/** `max` is the widest CSS pixel size the asset is ever painted at, x2 for DPR. */
const JOBS = [
  { in: "public/scanmark-portal.png", out: "public/scanmark-portal.webp", max: 1000, quality: 76 },
  { in: "public/funaabnb-portal.png", out: "public/funaabnb-portal.webp", max: 1000, quality: 76 },
  { in: "public/nada-portal.png", out: "public/nada-portal.webp", max: 1000, quality: 76 },
  { in: "public/verity-portal.png", out: "public/verity-portal.webp", max: 1000, quality: 76 },
  { in: "public/app-mockup.png", out: "public/app-mockup.webp", max: 800, quality: 78 },
  { in: "public/hero-campus.webp", out: "public/hero-campus.webp", max: 1920, quality: 70 },
  { in: "public/logo.png", out: "public/logo.webp", max: 128, quality: 90 },
];

let before = 0;
let after = 0;

for (const job of JOBS) {
  const original = statSync(job.in).size;
  // Re-encoding onto the same path needs the source buffered first.
  const source = readFileSync(job.in);
  const buffer = await sharp(source)
    .resize({ width: job.max, withoutEnlargement: true })
    .webp({ quality: job.quality, effort: 6 })
    .toBuffer();

  writeFileSync(job.out, buffer);
  before += original;
  after += buffer.length;
  console.log(`${job.out.padEnd(34)} ${KB(original).padStart(7)} -> ${KB(buffer.length).padStart(7)}`);
}

console.log(`\ntotal ${KB(before)} -> ${KB(after)} (${(100 - (after / before) * 100).toFixed(0)}% smaller)`);
