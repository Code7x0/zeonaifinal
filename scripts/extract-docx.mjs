import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const p = process.argv[2];
const out = process.argv[3] || "docs/research/content-review-extracted.txt";

async function main() {
  let JSZip;
  try {
    JSZip = require("jszip");
  } catch {
    // unzip via powershell Expand-Archive won't work on docx as zip easily from here
    // use child process with tar or powershell
    console.error("jszip missing");
    process.exit(1);
  }
  const buf = fs.readFileSync(p);
  const z = await JSZip.loadAsync(buf);
  const xml = await z.file("word/document.xml").async("string");
  const text = xml
    .replace(/<w:tab[^/]*\/>/g, "\t")
    .replace(/<w:br[^/]*\/>/g, "\n")
    .replace(/<\/w:p>/g, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/\n{3,}/g, "\n\n");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, text);
  console.log("wrote", out, text.length);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
