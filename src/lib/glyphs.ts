// The glass ብሩኽ's letter outlines, read from Abyssinica SIL at build time so the browser gets only the shapes it
// needs. Used by GlassHero (every page's glass). Build-time only.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import * as opentype from "opentype.js";

// ብ ሩ ኽ: each letter's family of 7 vowel forms, which form is the one in the name, and the sound it makes.
const FAMILIES = [
  { forms: [0x1260, 0x1261, 0x1262, 0x1263, 0x1264, 0x1265, 0x1266], t: 5, lat: "BU" },
  { forms: [0x1228, 0x1229, 0x122a, 0x122b, 0x122c, 0x122d, 0x122e], t: 1, lat: "RU" },
  { forms: [0x12b8, 0x12b9, 0x12ba, 0x12bb, 0x12bc, 0x12bd, 0x12be], t: 5, lat: "K" },
];
const fontFile = readFileSync(join(process.cwd(), "node_modules/@fontsource/abyssinica-sil/files/abyssinica-sil-ethiopic-400-normal.woff"));
const font = opentype.parse(fontFile.buffer.slice(fontFile.byteOffset, fontFile.byteOffset + fontFile.byteLength));
const upm = font.unitsPerEm;

/** One glyph: its advance and its outline as a flat command list in font units, y pointing down:
 *  ["M", x, y, "L", x, y, "Q", x1, y1, x, y, "C", …, "Z"] */
export interface Glyph { adv: number; d: (string | number)[] }
function outline(cp: number): Glyph {
  const g = font.charToGlyph(String.fromCodePoint(cp));
  const d: (string | number)[] = [];
  for (const c of g.getPath(0, 0, upm).commands) {
    d.push(c.type);
    if (c.type === "Q") d.push(Math.round(c.x1), Math.round(c.y1));
    if (c.type === "C") d.push(Math.round(c.x1), Math.round(c.y1), Math.round(c.x2), Math.round(c.y2));
    if (c.type !== "Z") d.push(Math.round(c.x), Math.round(c.y));
  }
  return { adv: g.advanceWidth ?? upm, d };
}

/** Every vowel form of each letter (the intro cycles through them). */
export const glyphs = { upm, families: FAMILIES.map((f) => ({ t: f.t, lat: f.lat, forms: f.forms.map(outline) })) };
