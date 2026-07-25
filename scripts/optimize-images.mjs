/**
 * One-shot asset optimiser, kept as the record of how public/ was produced.
 *
 * The screenshots and photography were committed at full export size (3.3 MB
 * total; logo.png alone was a 1024px square for a 32px slot). This re-encodes
 * them to WebP at the largest size they are actually rendered at.
 *
 * The PNG sources are no longer in the tree — they were replaced by their WebP
 * output. To re-run against an original, restore it first:
 *
 *   git show main:public/logo.png > public/logo.png
 *
 * Missing inputs are skipped rather than treated as failures.
 *
 *   node scripts/optimize-images.mjs
 */
import sharp from "sharp";
import { existsSync, readFileSync, writeFileSync, statSync } from "node:fs";

const KB = (bytes) => `${(bytes / 1024).toFixed(0)}KB`;

/** `max` is the widest CSS pixel size the asset is ever painted at, x2 for DPR. */
const JOBS = [
  { in: "public/scanmark-portal.png", out: "public/scanmark-portal.webp", max: 1000, quality: 76 },
  { in: "public/funaabnb-portal.png", out: "public/funaabnb-portal.webp", max: 1000, quality: 76 },
  { in: "public/nada-portal.png", out: "public/nada-portal.webp", max: 1000, quality: 76 },
  { in: "public/verity-portal.png", out: "public/verity-portal.webp", max: 1000, quality: 76 },
  { in: "public/app-mockup.png", out: "public/app-mockup.webp", max: 800, quality: 78 },
  { in: "public/hero-campus.webp", out: "public/hero-campus.webp", max: 1920, quality: 70 },
];

let before = 0;
let after = 0;

for (const job of JOBS) {
  if (!existsSync(job.in)) {
    console.log(`${job.in.padEnd(34)} skipped (source not in tree)`);
    continue;
  }
  const original = statSync(job.in).size;
  // Re-encoding onto the same path needs the source buffered first.
  const buffer = await sharp(readFileSync(job.in))
    .resize({ width: job.max, withoutEnlargement: true })
    .webp({ quality: job.quality, effort: 6 })
    .toBuffer();

  writeFileSync(job.out, buffer);
  before += original;
  after += buffer.length;
  console.log(`${job.out.padEnd(34)} ${KB(original).padStart(7)} -> ${KB(buffer.length).padStart(7)}`);
}

/**
 * The logo needs more than a resize: it was exported flattened onto a white
 * card with no alpha channel, so it rendered as a white box on the dark navbar.
 * The mark is dark green on white, so alpha can be keyed off luminance —
 * a flood fill from the edges does not work here because the counter of the
 * glyph opens onto the background.
 */
const LOGO_SRC = "public/logo.png";
if (existsSync(LOGO_SRC)) {
  const OPAQUE = 198; // at or below this luminance, keep the pixel solid
  const CLEAR = 236; // at or above, drop it; between the two, ramp for a soft edge

  const { data, info } = await sharp(LOGO_SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const keyed = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const r = data[i * channels];
    const g = data[i * channels + 1];
    const b = data[i * channels + 2];
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    let alpha = 255;
    if (luma >= CLEAR) alpha = 0;
    else if (luma > OPAQUE) alpha = Math.round((255 * (CLEAR - luma)) / (CLEAR - OPAQUE));

    keyed[i * 4] = r;
    keyed[i * 4 + 1] = g;
    keyed[i * 4 + 2] = b;
    keyed[i * 4 + 3] = alpha;
  }

  const original = statSync(LOGO_SRC).size;
  const out = await sharp(keyed, { raw: { width, height, channels: 4 } })
    .trim({ threshold: 10 })
    .resize({ width: 128, height: 128, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 92, alphaQuality: 100, effort: 6 })
    .toBuffer();

  writeFileSync("public/logo.webp", out);
  before += original;
  after += out.length;
  console.log(`${"public/logo.webp".padEnd(34)} ${KB(original).padStart(7)} -> ${KB(out.length).padStart(7)} (background keyed out)`);
} else {
  console.log(`${LOGO_SRC.padEnd(34)} skipped (source not in tree)`);
}

if (before > 0) {
  console.log(`\ntotal ${KB(before)} -> ${KB(after)} (${(100 - (after / before) * 100).toFixed(0)}% smaller)`);
}
