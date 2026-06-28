// Renames WhatsApp images to A1.webp, A2.webp ... and compresses them
import sharp from "sharp";
import { readdirSync, statSync } from "fs";
import { join, extname } from "path";

const ASSETS = new URL("../src/assets", import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1");

const files = readdirSync(ASSETS)
  .filter(f => f.startsWith("WhatsApp") && f.endsWith(".jpeg"))
  .sort();

console.log(`Found ${files.length} WhatsApp images\n`);

for (let i = 0; i < files.length; i++) {
  const input = join(ASSETS, files[i]);
  const outName = `A${i + 1}.webp`;
  const output = join(ASSETS, outName);
  const sizeBefore = Math.round(statSync(input).size / 1024);

  await sharp(input).webp({ quality: 82 }).toFile(output);

  const sizeAfter = Math.round(statSync(output).size / 1024);
  console.log(`  A${i+1}.webp  ← ${files[i].substring(0,40)}...  ${sizeBefore}KB → ${sizeAfter}KB`);
}

console.log(`\nDone! ${files.length} accessories ready.`);
