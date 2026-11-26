import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const pdfPath = process.argv[2];
const outPath = process.argv[3] || "docs/research/video-brief-extracted.txt";

async function main() {
  const mod = require("pdf-parse");
  const pdfParse = typeof mod === "function" ? mod : mod.default;
  if (typeof pdfParse !== "function") {
    console.error("pdf-parse export shape:", Object.keys(mod || {}));
    process.exit(1);
  }
  const data = await pdfParse(fs.readFileSync(pdfPath));
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, data.text);
  console.log("wrote", outPath, data.text.length);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
