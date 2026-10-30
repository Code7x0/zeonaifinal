import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const colorDir = path.join(root, "public/sites/zeonai/brands/color");
const outDir = path.join(root, "public/sites/zeonai/brands");

async function knockOutBlack(input, output, threshold = 28) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r <= threshold && g <= threshold && b <= threshold) data[i + 3] = 0;
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(output);
}

async function tintGrayscaleToTeal(input, output) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    if (a < 12) continue;
    const lum = (data[i] + data[i + 1] + data[i + 2]) / 3 / 255;
    // dark ink → teal #00A3A1
    data[i] = Math.round(0 + 255 * lum * 0.2);
    data[i + 1] = Math.round(163 + (255 - 163) * lum * 0.25);
    data[i + 2] = Math.round(161 + (255 - 161) * lum * 0.25);
    data[i + 3] = Math.round(a * (1 - lum * 0.85));
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(output);
}

async function main() {
  // Colorful PNGs (black bg → transparent)
  await knockOutBlack(
    path.join(colorDir, "aidea-labs.png"),
    path.join(outDir, "aidea-labs.png"),
  );
  await knockOutBlack(
    path.join(colorDir, "nuvola.png"),
    path.join(outDir, "nuvola.png"),
  );
  await knockOutBlack(
    path.join(colorDir, "mcl.png"),
    path.join(outDir, "mcl.png"),
    18,
  );

  await sharp(path.join(colorDir, "hindalco.webp"))
    .png()
    .toFile(path.join(outDir, "hindalco.png"));

  await sharp(path.join(colorDir, "ncdc.png"))
    .resize({ width: 480, withoutEnlargement: true })
    .png()
    .toFile(path.join(outDir, "ncdc.png"));

  // Quantum: light-bg text
  let quantum = fs.readFileSync(path.join(colorDir, "quantum.svg"), "utf8");
  quantum = quantum.replaceAll("#FFFBF9", "#1B1B1B");
  fs.writeFileSync(path.join(outDir, "quantum-lending.svg"), quantum);

  // Fujitsu red infinity + wordmark
  const fujitsu = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 64" fill="none">
  <g fill="#E60012">
    <path transform="translate(4,8) scale(2)" d="M16.56 3C14.15 3 12.04 4.24 10.68 5.97L10.68 9.76C12.5 4.71 16.56 5.08 16.56 5.08C19.5 5.08 21.84 7.38 21.84 10.2C21.84 13.04 19.5 15.33 16.56 15.33A5.32 5.32 0 0 1 12.84 13.83L10.28 11.03A6.06 6.06 0 0 0 6.03 9.32C2.7 9.32 0 11.93 0 15.16C0 18.4 2.7 21 6.03 21C7.9 21 9.58 20.19 10.68 18.89L10.68 15.86C8.88 19.29 6.03 18.92 6.03 18.92C3.9 18.92 2.17 17.24 2.17 15.16C2.17 13.1 3.9 11.42 6.03 11.42C7.09 11.42 8.05 11.84 8.75 12.5L11.31 15.31A7.5 7.5 0 0 0 16.56 17.43C20.67 17.43 24 14.19 24 10.2C24 6.21 20.67 3 16.56 3Z"/>
    <text x="64" y="42" font-family="Arial Black, Arial, Helvetica, sans-serif" font-size="28" font-weight="700" letter-spacing="0.5">FUJITSU</text>
  </g>
</svg>`;
  fs.writeFileSync(path.join(outDir, "fujitsu.svg"), fujitsu);

  // La Trobe Financial brand blue lockup
  const latrobe = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 72" fill="none">
  <rect x="0" y="6" width="60" height="60" rx="4" fill="#0769B3"/>
  <text x="8" y="44" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700">LTF</text>
  <text x="74" y="34" fill="#0769B3" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700">La Trobe</text>
  <text x="74" y="56" fill="#054A73" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="600">Financial</text>
</svg>`;
  fs.writeFileSync(path.join(outDir, "latrobe-financial.svg"), latrobe);

  // IAF tricolor roundel
  const iaf = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <circle cx="60" cy="52" r="42" fill="#FF9933"/>
  <circle cx="60" cy="52" r="28" fill="#FFFFFF"/>
  <circle cx="60" cy="52" r="14" fill="#138808"/>
  <text x="60" y="112" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="700" fill="#0B3D91">INDIAN AIR FORCE</text>
</svg>`;
  await sharp(Buffer.from(iaf)).png().toFile(path.join(outDir, "indian-air-force.png"));

  // Ergonomics: tint existing grayscale
  const ergoSrc = path.join(outDir, "ergonomics.png");
  if (fs.existsSync(ergoSrc)) {
    // backup then tint from color dir if exists, else current
    const src = fs.existsSync(path.join(colorDir, "ergo-src.png"))
      ? path.join(colorDir, "ergo-src.png")
      : ergoSrc;
    // Prefer original grayscale from brands before overwrite — copy from git? use current grayscale if still gray
    await tintGrayscaleToTeal(src, path.join(outDir, "ergonomics.png"));
  }

  // Also tint from a fresh copy if we saved grayscale earlier — recreate teal wordmark SVG
  const ergoSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 48" fill="none">
  <circle cx="22" cy="24" r="16" fill="#00A3A1"/>
  <text x="16" y="29" fill="#FFFFFF" font-family="Georgia,serif" font-size="18" font-style="italic" font-weight="600">e</text>
  <text x="46" y="30" fill="#1a1a1a" font-family="Arial,Helvetica,sans-serif" font-size="18" font-weight="600">rgonomics</text>
</svg>`;
  fs.writeFileSync(path.join(outDir, "ergonomics.svg"), ergoSvg);

  console.log("Color logos prepared in", outDir);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
