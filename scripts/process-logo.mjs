import sharp from "sharp";
import { resolve } from "node:path";
import { existsSync, mkdirSync } from "node:fs";

const inputPath = "C:/Users/LUSHEGS/.gemini/antigravity-ide/brain/384caf10-c228-4d57-ae40-d26f6cc389c5/.user_uploaded/media_1788273754993.png";

async function main() {
  console.log("Processing logo from:", inputPath);
  
  // 1. Trim transparency to exact bounds
  const trimmedBuffer = await sharp(inputPath).trim().toBuffer();
  const trimmedMeta = await sharp(trimmedBuffer).metadata();
  console.log("Trimmed dimensions:", trimmedMeta.width, trimmedMeta.height);

  const maxDim = Math.max(trimmedMeta.width, trimmedMeta.height);

  // Helper to create a padded square image (transparent bg)
  const makeSquare = async (size, paddingRatio = 0.08) => {
    const innerSize = Math.round(size * (1 - paddingRatio * 2));
    const resized = await sharp(trimmedBuffer)
      .resize({
        width: innerSize,
        height: innerSize,
        fit: "inside",
        kernel: "lanczos3",
      })
      .toBuffer();

    return sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite([{ input: resized, gravity: "center" }])
      .png({ compressionLevel: 9 });
  };

  // Helper to create maskable icon on brand background (#0A0D0C or #F7F6F2)
  const makeMaskable = async (size, bgHex = "#0A0D0C", paddingRatio = 0.2) => {
    const innerSize = Math.round(size * (1 - paddingRatio * 2));
    const resized = await sharp(trimmedBuffer)
      .resize({
        width: innerSize,
        height: innerSize,
        fit: "inside",
        kernel: "lanczos3",
      })
      .toBuffer();

    // parse bgHex
    const r = parseInt(bgHex.slice(1, 3), 16);
    const g = parseInt(bgHex.slice(3, 5), 16);
    const b = parseInt(bgHex.slice(5, 7), 16);

    return sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r, g, b, alpha: 1 },
      },
    })
      .composite([{ input: resized, gravity: "center" }])
      .png({ compressionLevel: 9 });
  };

  // Ensure public and public/icons exist
  if (!existsSync("public/icons")) {
    mkdirSync("public/icons", { recursive: true });
  }

  // 1. High-res logo for web display (512x512 and webp)
  await (await makeSquare(512, 0.04)).toFile("public/logo.png");
  await sharp(await (await makeSquare(512, 0.04)).toBuffer()).webp({ quality: 95 }).toFile("public/logo.webp");
  await (await makeSquare(256, 0.04)).toFile("public/logo-mark.png");
  await sharp(await (await makeSquare(256, 0.04)).toBuffer()).webp({ quality: 95 }).toFile("public/logo-mark.webp");
  console.log("Created public/logo.png, logo.webp, logo-mark.png");

  // 2. Next.js app icons
  await (await makeSquare(256, 0.05)).toFile("app/icon.png");
  await (await makeSquare(180, 0.06)).toFile("app/apple-icon.png");
  console.log("Created app/icon.png and app/apple-icon.png");

  // 3. PWA & Web manifest icons
  await (await makeSquare(180, 0.06)).toFile("public/icons/apple-touch-icon.png");
  await (await makeSquare(192, 0.06)).toFile("public/icons/icon-192.png");
  await (await makeSquare(512, 0.06)).toFile("public/icons/icon-512.png");
  await (await makeMaskable(192, "#0A0D0C", 0.22)).toFile("public/icons/maskable-192.png");
  await (await makeMaskable(512, "#0A0D0C", 0.22)).toFile("public/icons/maskable-512.png");
  console.log("Created public/icons/*");
}

main().catch(console.error);
