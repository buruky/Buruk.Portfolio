import { seededRandom } from "@/lib/name-letters";

export const ENTER_STAGGER = 45;
export const ENTER_DUR = 650;
export const PRESS_STAGGER = 120;
export const WORD_PAUSE = 220;
export const PRESS_DUR = 260;
export const PRESS_BUFFER = 200;
export const SETTLE_HOLD = 400;
export const LAND_DUR = 1000;
export const DOCK_STAGGER = 40;
export const MELT_DELAY = 120;
export const MELT_STAGGER = 45;
export const MELT_DUR = 750;
// when, into a key's melt, its serif letter starts fading in underneath
export const LETTER_REVEAL_AT = 380;
export const SPACING = 1.12;
export const ROW_GAP = 1.5;

export type Rest = { x: number; z: number; word: number };

export function pressTime(i: number, word: number, pressStartBase: number) {
  return pressStartBase + i * PRESS_STAGGER + (word > 0 ? WORD_PAUSE : 0);
}

export function sequenceTiming(words: number[]) {
  const total = words.length;
  const lastEntranceEnd = (total - 1) * ENTER_STAGGER + ENTER_DUR;
  const pressStartBase = lastEntranceEnd + PRESS_BUFFER;
  const lastPress = pressTime(total - 1, words[total - 1] ?? 0, pressStartBase);
  const sequenceTotal = lastPress + PRESS_DUR + SETTLE_HOLD;
  const landTotal = LAND_DUR + (total - 1) * DOCK_STAGGER;
  return { pressStartBase, sequenceTotal, landTotal };
}

export function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function backOut(t: number) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  const x = Math.max(0, Math.min(1, t));
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// vertical offset of a key press `t` ms after it starts: dip, then a small overshoot back up
export function pressOffset(t: number, depth = 0.22) {
  if (t < 0 || t >= PRESS_DUR) return 0;
  const p = t / PRESS_DUR;
  return p < 0.35 ? -depth * easeOutCubic(p / 0.35) : -depth + depth * backOut((p - 0.35) / 0.65);
}

// rows stacked in depth (first name behind, last name in front) so the camera,
// looking down at an angle, reads them as two lines
export function restPositions(words: number[]): Rest[] {
  const counts = new Map<number, number>();
  words.forEach((w) => counts.set(w, (counts.get(w) ?? 0) + 1));
  const rowCount = counts.size;
  const seen = new Map<number, number>();
  return words.map((w) => {
    const idx = seen.get(w) ?? 0;
    seen.set(w, idx + 1);
    const n = counts.get(w)!;
    return { x: (idx - (n - 1) / 2) * SPACING, z: (w - (rowCount - 1) / 2) * ROW_GAP, word: w };
  });
}

export type LetterPose = { x: number; y: number; z: number; rotY: number; scale: number };

export function letterPose(elapsed: number, i: number, pressStartBase: number, rest: Rest): LetterPose {
  const entranceStart = i * ENTER_STAGGER;
  const entranceEnd = entranceStart + ENTER_DUR;

  const angle = seededRandom(i * 3 + 1) * Math.PI * 2;
  const radius = 6 + seededRandom(i * 3 + 2) * 3;
  const startX = rest.x + Math.cos(angle) * radius;
  const startY = 3 + seededRandom(i * 3 + 4) * 3;
  const startZ = rest.z + Math.sin(angle) * radius * 0.6;
  const startRotY = (seededRandom(i * 3 + 3) - 0.5) * Math.PI * 2;

  const restY = (seededRandom(i * 7 + 5) - 0.5) * 0.08;
  const restRotY = (seededRandom(i * 7 + 6) - 0.5) * 0.22;

  if (elapsed < entranceStart) {
    return { x: startX, y: startY, z: startZ, rotY: startRotY, scale: 0.4 };
  }
  if (elapsed < entranceEnd) {
    const p = easeOutCubic((elapsed - entranceStart) / ENTER_DUR);
    return {
      x: lerp(startX, rest.x, p),
      y: lerp(startY, restY, p),
      z: lerp(startZ, rest.z, p),
      rotY: lerp(startRotY, restRotY, p),
      scale: lerp(0.4, 1, p),
    };
  }
  const dip = pressOffset(elapsed - pressTime(i, rest.word, pressStartBase));
  return { x: rest.x, y: restY + dip, z: rest.z, rotY: restRotY, scale: 1 };
}
