/**
 * Builds the social card at app/opengraph-image.png from an SVG + 3D logo.
 *
 * Run with `npm run og` after changing the headline or the palette. The output
 * is committed, so nothing is rendered at request time.
 */
import { writeFileSync, readFileSync } from "node:fs";
import sharp from "sharp";

const W = 1200;
const H = 630;

const INK = "#0A0D0C";
const PAPER = "#F7F6F2";
const SAGE = "#7B968A";
const LINE = "rgba(247,246,242,0.13)";

const HEADLINE = ["The digital infrastructure", "behind the modern university."];

const RAIL = "IDENTITY · ACADEMICS · ATTENDANCE · FINANCE · RECORDS · SERVICES";

const grid = () => {
  const lines = [];
  for (let x = 0; x <= W; x += 60) {
    lines.push(`<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${LINE}" stroke-width="1"/>`);
  }
  for (let y = 0; y <= H; y += 60) {
    lines.push(`<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${LINE}" stroke-width="1"/>`);
  }
  return lines.join("");
};

const logoBase64 = readFileSync(new URL("../public/logo.png", import.meta.url)).toString("base64");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${INK}"/>
  <g opacity="0.55">${grid()}</g>

  <image href="data:image/png;base64,${logoBase64}" x="72" y="56" width="44" height="44"/>
  <text x="128" y="90" font-family="Instrument Sans, sans-serif" font-weight="600" font-size="32" fill="${PAPER}" letter-spacing="-0.6">CampOS</text>

  <text x="72" y="188" font-family="Geist Mono, monospace" font-size="17" fill="${SAGE}" letter-spacing="3.4">CAMPOS CORE · INSTITUTIONAL INFRASTRUCTURE</text>

  ${HEADLINE.map(
    (line, index) =>
      `<text x="72" y="${292 + index * 78}" font-family="Instrument Sans, sans-serif" font-weight="500" font-size="66" fill="${PAPER}" letter-spacing="-2.2">${line}</text>`
  ).join("\n  ")}

  <line x1="72" y1="472" x2="1128" y2="472" stroke="rgba(247,246,242,0.2)" stroke-width="1"/>
  <text x="72" y="518" font-family="Instrument Sans, sans-serif" font-size="25" fill="#A6B0AB" letter-spacing="-0.3">One verified identity. One permission model. One record of truth.</text>
  <text x="72" y="568" font-family="Geist Mono, monospace" font-size="15" fill="#79837E" letter-spacing="3">${RAIL}</text>
</svg>`;

const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
writeFileSync(new URL("../app/opengraph-image.png", import.meta.url), png);
writeFileSync(new URL("../app/twitter-image.png", import.meta.url), png);
console.log(`og image written · ${(png.length / 1024).toFixed(0)} kB`);
