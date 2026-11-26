/**
 * Sound: the "Glass (original)" kit from docs/sound-kit.md, synthesised live with the Web Audio API.
 * Everything is tuned to D major pentatonic. Off unless the visitor chooses it; the choice is remembered.
 */
const KEY = "bk-sound";
const VOLUME = 0.55;
type Listener = (on: boolean) => void;
const listeners = new Set<Listener>();
let ctx: AudioContext | null = null;
let master: GainNode | null = null;

function read(): boolean {
  try { return localStorage.getItem(KEY) === "on"; } catch { return false; }
}

export function isSoundOn(): boolean { return read(); }

export function setSound(on: boolean): void {
  try { localStorage.setItem(KEY, on ? "on" : "off"); } catch { /* private mode: in-memory only */ }
  if (on) unlock();
  listeners.forEach((fn) => fn(on));
}

export function onSoundChange(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** Must run inside a click/tap: browsers only allow audio after a user gesture. */
export function unlock(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const C = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!C) return null;
  if (!ctx) {
    ctx = new C();
    master = ctx.createGain();
    master.gain.value = VOLUME;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.ratio.value = 3;
    master.connect(comp).connect(ctx.destination);
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

// After a reload with sound on, the first tap anywhere re-enables audio.
if (typeof window !== "undefined") {
  const wake = () => { if (read()) unlock(); };
  window.addEventListener("pointerdown", wake, { capture: true, passive: true });
  window.addEventListener("keydown", wake, { capture: true });
}

/* ---------- the Glass instrument ---------- */
const PENT = [0, 2, 4, 7, 9];
/** Note i of D major pentatonic, in octave `oct` (4 = the D above middle C). */
function hz(i: number, oct = 4): number {
  const o = Math.floor(i / 5);
  const st = PENT[((i % 5) + 5) % 5] + 12 * (o + oct - 4);
  return 293.66 * Math.pow(2, st / 12);
}
function noiseBuf(c: AudioContext, d: number): AudioBuffer {
  const b = c.createBuffer(1, Math.max(1, Math.floor(c.sampleRate * d)), c.sampleRate);
  const x = b.getChannelData(0);
  for (let i = 0; i < x.length; i++) x[i] = Math.random() * 2 - 1;
  return b;
}
function env(g: GainNode, t: number, a: number, peak: number, dec: number) {
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(peak, t + a);
  g.gain.exponentialRampToValueAtTime(0.0001, t + a + dec);
}
function note(c: AudioContext, out: AudioNode, f: number, t: number, gain = 0.12, dec = 0.5) {
  [1, 2.01, 3.02].forEach((m, k) => {
    const os = c.createOscillator();
    const g = c.createGain();
    os.type = "sine";
    os.frequency.value = f * m;
    env(g, t, 0.004, gain * [1, 0.28, 0.08][k], dec * [1, 0.6, 0.35][k]);
    os.connect(g).connect(out);
    os.start(t);
    os.stop(t + dec + 0.1);
  });
}
function whoosh(c: AudioContext, out: AudioNode, t: number, d: number, from: number, to: number, g = 0.05) {
  const n = c.createBufferSource();
  const bp = c.createBiquadFilter();
  const gg = c.createGain();
  n.buffer = noiseBuf(c, d + 0.1);
  bp.type = "bandpass";
  bp.Q.value = 2;
  bp.frequency.setValueAtTime(from, t);
  bp.frequency.exponentialRampToValueAtTime(to, t + d);
  gg.gain.setValueAtTime(0, t);
  gg.gain.linearRampToValueAtTime(g, t + d * 0.4);
  gg.gain.exponentialRampToValueAtTime(0.0001, t + d);
  n.connect(bp).connect(gg).connect(out);
  n.start(t);
}
function pad(c: AudioContext, out: AudioNode, t: number, freqs: number[], d: number, g = 0.03) {
  const lp = c.createBiquadFilter();
  const bus = c.createGain();
  lp.type = "lowpass";
  lp.frequency.setValueAtTime(300, t);
  lp.frequency.exponentialRampToValueAtTime(3400, t + d * 0.4);
  bus.gain.setValueAtTime(0, t);
  bus.gain.linearRampToValueAtTime(1, t + d * 0.25);
  bus.gain.exponentialRampToValueAtTime(0.0001, t + d);
  lp.connect(bus).connect(out);
  freqs.forEach((f, k) => [-5, 5].forEach((dt) => {
    const o = c.createOscillator();
    const gg = c.createGain();
    o.type = "sine";
    o.frequency.value = f;
    o.detune.value = dt;
    gg.gain.value = g * (k < 2 ? 1 : 0.6);
    o.connect(gg).connect(lp);
    o.start(t);
    o.stop(t + d + 0.1);
  }));
}
function staticBurst(c: AudioContext, out: AudioNode, t: number, d: number, g = 0.06) {
  const n = c.createBufferSource();
  const hp = c.createBiquadFilter();
  const gg = c.createGain();
  n.buffer = noiseBuf(c, d + 0.05);
  hp.type = "highpass";
  hp.frequency.value = 2500;
  gg.gain.setValueAtTime(0, t);
  for (let k = 0; k < d; k += 0.03) gg.gain.setValueAtTime(Math.random() < 0.6 ? g : 0, t + k);
  gg.gain.setValueAtTime(0, t + d);
  n.connect(hp).connect(gg).connect(out);
  n.start(t);
}
function tone(c: AudioContext, out: AudioNode, type: OscillatorType, f0: number, f1: number, t: number, peak: number, dec: number, lowpass?: number) {
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(f0, t);
  o.frequency.exponentialRampToValueAtTime(f1, t + dec * 0.6);
  env(g, t, 0.005, peak, dec);
  if (lowpass) {
    const lp = c.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = lowpass;
    o.connect(lp).connect(g).connect(out);
  } else o.connect(g).connect(out);
  o.start(t);
  o.stop(t + dec + 0.1);
}

type Recipe = (c: AudioContext, out: AudioNode, t: number) => void;
const SOUNDS = {
  enter: (c, o, t) => [0, 3, 5].forEach((i, k) => note(c, o, hz(i), t + k * 0.05, 0.1, 0.9)),
  tick: (c, o, t) => note(c, o, hz(5 + Math.floor(Math.random() * 5), 5), t, 0.035, 0.12),
  lock: (c, o, t) => note(c, o, hz(2, 5), t, 0.09, 0.5),
  swell: (c, o, t) => pad(c, o, t, [hz(0, 3), hz(3, 3), hz(0, 4), hz(2, 4), hz(0, 5)], 3, 0.035),
  yimesgen: (c, o, t) => { whoosh(c, o, t, 0.8, 2200, 500, 0.04); note(c, o, hz(0, 3), t + 0.25, 0.09, 1.2); },
  menuOpen: (c, o, t) => { note(c, o, hz(3), t, 0.06, 0.25); note(c, o, hz(5), t + 0.06, 0.06, 0.35); },
  menuClose: (c, o, t) => { note(c, o, hz(5), t, 0.05, 0.2); note(c, o, hz(3), t + 0.06, 0.05, 0.3); },
  copy: (c, o, t) => [0, 2, 3].forEach((i, k) => note(c, o, hz(i, 5), t + k * 0.06, 0.06, 0.4)),
  toggle: (c, o, t) => note(c, o, hz(0, 5), t, 0.06, 0.3),
  sunrise: (c, o, t) => { whoosh(c, o, t, 0.6, 300, 2600, 0.04); [0, 1, 2, 3, 4].forEach((i, k) => note(c, o, hz(i), t + 0.08 + k * 0.08, 0.05, 0.6)); },
  blinds: (c, o, t) => { for (let k = 0; k < 8; k++) note(c, o, hz(k % 2 ? 3 : 4, 5), t + k * 0.035, 0.03, 0.1); },
  paper: (c, o, t) => { for (let k = 0; k < 3; k++) whoosh(c, o, t + k * 0.07, 0.18, 4500, 1800, 0.035); },
  shadow: (c, o, t) => { whoosh(c, o, t, 0.6, 1400, 260, 0.05); note(c, o, hz(0, 3), t + 0.1, 0.08, 0.9); },
  crt: (c, o, t) => {
    tone(c, o, "sine", 90, 140, t, 0.08, 0.35);
    tone(c, o, "sine", 3800, 3800, t + 0.05, 0.012, 0.4);
    staticBurst(c, o, t + 0.02, 0.09, 0.03);
    note(c, o, hz(3, 5), t + 0.25, 0.04, 0.3);
  },
  iris: (c, o, t) => { note(c, o, hz(0, 5), t, 0.07, 1.2); note(c, o, hz(3, 5), t + 0.04, 0.045, 1.3); whoosh(c, o, t, 0.5, 600, 1800, 0.025); },
  dissolve: (c, o, t) => { for (let k = 0; k < 18; k++) note(c, o, hz(Math.floor(Math.random() * 10), 5), t + Math.random() * 0.5, 0.02, 0.25); },
  tear: (c, o, t) => { staticBurst(c, o, t, 0.32, 0.08); tone(c, o, "square", 220, 70, t, 0.025, 0.3, 900); },
  glitch: (c, o, t) => { staticBurst(c, o, t, 0.12, 0.06); tone(c, o, "sine", hz(3, 5), hz(3, 5) * 0.94, t, 0.04, 0.15); },
  // Home hero: flicking each glass letter of ቡሩኽ rings its own note (D, F♯, A)
  glass0: (c, o, t) => note(c, o, hz(0, 5), t, 0.08, 0.9),
  glass1: (c, o, t) => note(c, o, hz(2, 5), t, 0.08, 0.9),
  glass2: (c, o, t) => note(c, o, hz(3, 5), t, 0.08, 0.9),
} satisfies Record<string, Recipe>;

export type SoundName = keyof typeof SOUNDS;

/** Plays a named sound if the visitor has sound on and audio is unlocked. */
export function play(name: SoundName): void {
  if (!read() || !ctx || !master) return;
  const c = ctx, out = master;
  const go = () => SOUNDS[name](c, out, c.currentTime + 0.02);
  if (c.state === "running") go();
  else void c.resume().then(go); // Safari can still be waking up right after the unlocking tap
}
