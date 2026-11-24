/**
 * Sound state. Off unless the visitor chooses it; the choice is remembered.
 * Actual sounds are added later (docs/sound-kit.md); play() is the single entry point.
 */
const KEY = "bk-sound";
type Listener = (on: boolean) => void;
const listeners = new Set<Listener>();
let ctx: AudioContext | null = null;

function read(): boolean {
  try { return localStorage.getItem(KEY) === "on"; } catch { return false; }
}

export function isSoundOn(): boolean { return read(); }

export function setSound(on: boolean): void {
  try { localStorage.setItem(KEY, on ? "on" : "off"); } catch { /* private mode: keep it in memory only */ }
  if (on) unlock();
  listeners.forEach((fn) => fn(on));
}

export function onSoundChange(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** Must be called from a click/tap: browsers only allow audio after a user gesture. */
export function unlock(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const C = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!C) return null;
  ctx ??= new C();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export type SoundName =
  | "enter" | "menuOpen" | "menuClose" | "copy" | "toggle"
  | "sunrise" | "blinds" | "paper" | "shadow" | "crt" | "iris" | "dissolve" | "tear" | "glitch";

/** Plays a named sound if sound is on. Silent until the sound kit files are added. */
export function play(_name: SoundName): void {
  if (!read() || !ctx) return;
}
