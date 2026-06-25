// compress-images.mjs
// Converts all images in src/assets to WebP at quality 82.
// Skips files that are already small (<150KB) to save time.
// Run once: node scripts/compress-images.mjs

import sharp from "sharp";
import { readdirSync, statSync, renameSync } from "fs";
import { join, extname, basename } from "path";

const ASSETS_DIR = new URL("../src/assets", import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1");
const QUALITY = 82;
const SKIP_BELOW_KB = 150; // files already small enough — skip

const SUPPORTED = new Set([".png", ".jpg", ".jpeg"]);

const files = readdirSync(ASSETS_DIR).filter((f) => SUPPORTED.has(extname(f).toLowerCase()));

let converted = 0;
let skipped = 0;

for (const file of files) {
  const inputPath = join(ASSETS_DIR, file);
  const sizeKB = statSync(inputPath).size / 1024;
  const ext = extname(file).toLowerCase();
  const nameNoExt = basename(file, ext);
  const outputPath = join(ASSETS_DIR, `${nameNoExt}.webp`);

  // Skip if already a webp or already small enough
  if (sizeKB < SKIP_BELOW_KB) {
    console.log(`  skip  ${file.padEnd(35)} ${Math.round(sizeKB)}KB (already small)`);
    skipped++;
    continue;
  }

  try {
    await sharp(inputPath).webp({ quality: QUALITY }).toFile(outputPath);
    const newSizeKB = statSync(outputPath).size / 1024;
    const saving = Math.round(((sizeKB - newSizeKB) / sizeKB) * 100);
    console.log(`  ✓     ${file.padEnd(35)} ${Math.round(sizeKB)}KB → ${Math.round(newSizeKB)}KB  (-${saving}%)`);
    converted++;
  } catch (err) {
    console.error(`  ERROR ${file}: ${err.message}`);
  }
}

console.log(`\nDone. ${converted} converted, ${skipped} skipped.`);
console.log(`\nNext step: update import paths in products.ts and index.tsx from .png/.jpg to .webp`);
