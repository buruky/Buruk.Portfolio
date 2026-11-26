/**
 * The intro gate's keepsakes, floating in the pond (GlassHero.astro).
 *
 * Each keepsake is drawn once onto a canvas, then rendered into a texture laid out over the water surface. The water
 * shader composites that texture under the ripples, so the keepsakes are bent by the water, washed by its light and
 * refracted by the glass letters, instead of sitting on top of the page like stickers. They drift, are pushed by
 * ripples, move heavily when dragged (leaving a wake), and sink when the visitor enters.
 *
 * Space: "pond units". x runs 0…A (A = the water plane's width/height), y runs 0…1 upwards. uv = (x / A, y).
 */
import * as THREE from "three";

type Def = { key: string; draw: (c: CanvasRenderingContext2D, w: number, h: number) => void; w: number; h: number; screen: [number, number]; widthPx: number; rot: number; solid?: boolean };
/** A keepsake that is a real 3D object in the main scene (GlassHero draws it); here it only floats, and leaves a shadow. */
export type Solid = { key: string; x: number; y: number; vx: number; vy: number; rot: number; w: number; h: number; sink: number; held: boolean };
type Piece = {
  def: Def; group: THREE.Group; mat: THREE.MeshBasicMaterial; shadowMat: THREE.MeshBasicMaterial;
  x: number; y: number; vx: number; vy: number; rot: number; vr: number; base: number; w: number; h: number;
  seed: number; hit: Set<number>; sink: number; lastWake: number;
};
export type PondDrop = { u: number; v: number; s: number; step0: number; id: number };
export type PondContext = { drops: PondDrop[]; simStep: number; speed: number; simW: number; simH: number; ripple: (u: number, v: number, s: number, r: number) => void };

/* ---------------- drawing helpers ---------------- */
function grain(c: CanvasRenderingContext2D, w: number, h: number, amount: number) {
  const img = c.getImageData(0, 0, w, h), d = img.data;
  for (let i = 0; i < d.length; i += 4) { if (!d[i + 3]) continue; const n = (Math.random() - 0.5) * amount; d[i] += n; d[i + 1] += n; d[i + 2] += n; }
  c.putImageData(img, 0, 0);
}
/* ---------------- a real photo print ---------------- */
/** A photo print: a thin white border, a hint of paper thickness, a soft glossy sheen and a slight curl, with the edges
 *  darkened where the water has soaked in. */
function print(photo: HTMLImageElement): Def["draw"] {
  return (c, w, h) => {
    const b = Math.round(w * 0.035);
    c.fillStyle = "#f3f1ec"; c.fillRect(0, 0, w, h);
    const pw = w - b * 2, ph = h - b * 2, k = Math.max(pw / photo.naturalWidth, ph / photo.naturalHeight);
    const iw = photo.naturalWidth * k, ih = photo.naturalHeight * k;
    c.save(); c.beginPath(); c.rect(b, b, pw, ph); c.clip(); c.drawImage(photo, b + (pw - iw) / 2, b + (ph - ih) / 2, iw, ih); c.restore();
    c.strokeStyle = "rgba(0,0,0,0.10)"; c.lineWidth = 1.5; c.strokeRect(b, b, pw, ph);
    // the paper's edge: a hairline of thickness on the bottom and right
    c.fillStyle = "rgba(0,0,0,0.18)"; c.fillRect(0, h - 2, w, 2); c.fillRect(w - 2, 0, 2, h);
    // wet edges: the paper darkens a little where the water has soaked in
    const wet = (x0: number, y0: number, x1: number, y1: number) => { const g = c.createLinearGradient(x0, y0, x1, y1); g.addColorStop(0, "rgba(40,50,45,0.22)"); g.addColorStop(1, "rgba(40,50,45,0)"); return g; };
    const e = w * 0.06;
    c.fillStyle = wet(0, 0, e, 0); c.fillRect(0, 0, e, h); c.fillStyle = wet(w, 0, w - e, 0); c.fillRect(w - e, 0, e, h);
    c.fillStyle = wet(0, 0, 0, e); c.fillRect(0, 0, w, e); c.fillStyle = wet(0, h, 0, h - e); c.fillRect(0, h - e, w, e);
    // a slight curl and a glossy sheen across the print
    const curl = c.createLinearGradient(0, 0, w, h); curl.addColorStop(0, "rgba(255,255,255,0.10)"); curl.addColorStop(0.5, "rgba(255,255,255,0)"); curl.addColorStop(1, "rgba(30,20,10,0.12)");
    c.fillStyle = curl; c.fillRect(0, 0, w, h);
    const sheen = c.createLinearGradient(w * 0.15, 0, w * 0.75, h);
    sheen.addColorStop(0.35, "rgba(255,255,255,0)"); sheen.addColorStop(0.47, "rgba(255,255,255,0.16)"); sheen.addColorStop(0.53, "rgba(255,255,255,0.05)"); sheen.addColorStop(0.62, "rgba(255,255,255,0)");
    c.fillStyle = sheen; c.fillRect(0, 0, w, h);
    grain(c, w, h, 6);
  };
}

/* ---------------- the pond ---------------- */
export type KeepsakeVariant = "me" | "prints";
/** `photos`: image URLs by name (me, portrait, place). "me" floats one print of Buruk; "prints" floats three. */
export function createKeepsakes(photos: Record<string, string>, variant: KeepsakeVariant, reduce: boolean) {
  const PLAN: { key: string; screen: [number, number]; widthPx: number; rot: number }[] = variant === "me"
    ? [{ key: "me", screen: [0.14, 0.66], widthPx: 290, rot: -0.08 }]
    : [
      { key: "me", screen: [0.13, 0.63], widthPx: 250, rot: -0.1 },
      { key: "portrait", screen: [0.89, 0.3], widthPx: 190, rot: 0.08 },
      { key: "place", screen: [0.82, 0.8], widthPx: 300, rot: -0.05 },
    ];
  const DEFS: Def[] = [];
  const scene = new THREE.Scene();
  const cam = new THREE.OrthographicCamera(0, 1.6, 1, 0, -10, 10);
  let rt = new THREE.WebGLRenderTarget(2048, 1280, { depthBuffer: false });
  let A = 1.6, placed = false, visible = true, leaving = false, leaveT = 0, time = 0;
  const box = { x0: 0, x1: 1.6, y0: 0, y1: 1 }; // the part of the pond that's on screen
  let grabbed: Piece | null = null, gx = 0, gy = 0, ox = 0, oy = 0;
  const pieces: Piece[] = [];

  function texture(def: Def) {
    const cv = document.createElement("canvas"); cv.width = def.w; cv.height = def.h;
    def.draw(cv.getContext("2d")!, def.w, def.h);
    // its soft shadow on the water: the silhouette, shrunk and blown back up (a blur that works everywhere)
    const pad = Math.round(def.w * 0.12), sw = def.w + pad * 2, sh = def.h + pad * 2;
    const tiny = document.createElement("canvas"); tiny.width = Math.max(8, Math.round(sw / 10)); tiny.height = Math.max(8, Math.round(sh / 10));
    const t = tiny.getContext("2d")!; t.drawImage(cv, pad / 10, pad / 10, def.w / 10, def.h / 10); t.globalCompositeOperation = "source-in"; t.fillStyle = "#000"; t.fillRect(0, 0, tiny.width, tiny.height);
    const shadow = document.createElement("canvas"); shadow.width = sw; shadow.height = sh; const s = shadow.getContext("2d")!; s.imageSmoothingQuality = "high"; s.drawImage(tiny, 0, 0, sw, sh);
    const map = new THREE.CanvasTexture(cv); map.colorSpace = THREE.SRGBColorSpace; map.anisotropy = 8;
    const smap = new THREE.CanvasTexture(shadow);
    return { map, smap, padK: sw / def.w };
  }

  const ready = (async () => {
    const imgs = await Promise.all(PLAN.map(async (pl) => { const im = new Image(); im.src = photos[pl.key] ?? ""; await im.decode().catch(() => undefined); return im; }));
    PLAN.forEach((pl, i) => {
      const im = imgs[i]; if (!im.naturalWidth) return;
      const W0 = 600, b = W0 * 0.035, H0 = Math.round(((W0 - b * 2) * im.naturalHeight) / im.naturalWidth + b * 2);
      DEFS.push({ key: pl.key, draw: print(im), w: W0, h: H0, screen: pl.screen, widthPx: pl.widthPx, rot: pl.rot });
    });
    DEFS.forEach((def, i) => {
      const { map, smap, padK } = texture(def);
      const mat = new THREE.MeshBasicMaterial({ map, transparent: true, toneMapped: false });
      const shadowMat = new THREE.MeshBasicMaterial({ map: smap, transparent: true, opacity: 0.45, toneMapped: false, color: 0x000000 });
      void padK;
      const group = new THREE.Group();
      const shadow = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), shadowMat);
      shadow.name = "shadow";
      const body = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat); body.name = "body"; body.visible = !def.solid;
      group.add(shadow, body); scene.add(group); group.renderOrder = i;
      pieces.push({ def, group, mat, shadowMat, x: 0, y: 0, vx: 0, vy: 0, rot: def.rot, vr: 0, base: def.rot, w: 0, h: 0, seed: Math.random() * 100, hit: new Set(), sink: 0, lastWake: 0 });
    });
  })();

  /** Place (or re-size) every keepsake from its spot on screen. `toPond` maps a screen point to pond units; pxToPond converts a length. */
  function layout(aspect: number, toPond: (sx: number, sy: number) => { x: number; y: number } | null, pxToPond: number, narrow: boolean) {
    const tl = toPond(0, 0), br = toPond(1, 1);
    if (tl && br) { box.x0 = Math.min(tl.x, br.x); box.x1 = Math.max(tl.x, br.x); box.y0 = Math.min(tl.y, br.y); box.y1 = Math.max(tl.y, br.y); }
    if (Math.abs(aspect - A) > 1e-4 || !rt) {
      A = aspect; cam.right = A; cam.updateProjectionMatrix();
      rt.setSize(2048, Math.max(256, Math.round(2048 / A)));
    }
    pieces.forEach((p) => {
      const wpx = p.def.widthPx * (narrow ? 0.62 : 1);
      p.w = wpx * pxToPond; p.h = p.w * (p.def.h / p.def.w);
      if (!placed) { const at = toPond(p.def.screen[0], p.def.screen[1]); if (at) { p.x = at.x; p.y = at.y; } }
      p.group.children.forEach((m) => { if (m.name === "body") m.scale.set(p.w, p.h, 1); else m.scale.set(p.w * 1.24, p.h + p.w * 0.24, 1); });
    });
    if (pieces.length) placed = true;
  }

  function pick(u: number, v: number) {
    const px = u * A, py = v;
    for (let i = pieces.length - 1; i >= 0; i--) {
      const p = pieces[i]; const dx = px - p.x, dy = py - p.y, c = Math.cos(-p.rot), s = Math.sin(-p.rot);
      const lx = dx * c - dy * s, ly = dx * s + dy * c;
      if (Math.abs(lx) <= p.w / 2 && Math.abs(ly) <= p.h / 2) return p;
    }
    return null;
  }

  return {
    ready,
    get target() { return rt; },
    get visible() { return visible; },
    layout,
    /** Grab whatever is under this point of the water. Returns true if something was picked up. */
    grab(u: number, v: number) {
      if (leaving) return false;
      const p = pick(u, v); if (!p) return false;
      grabbed = p; gx = u * A; gy = v; ox = p.x - gx; oy = p.y - gy; p.vx = p.vy = 0;
      pieces.splice(pieces.indexOf(p), 1); pieces.push(p); pieces.forEach((q, i) => (q.group.renderOrder = i)); // to the top
      return true;
    },
    hover(u: number, v: number) { return !leaving && !!pick(u, v); },
    get aspect() { return A; },
    /** Where the 3D keepsakes are this frame, in pond units. */
    solids(): Solid[] {
      return pieces.filter((p) => p.def.solid).map((p) => ({ key: p.def.key, x: p.x, y: p.y, vx: p.vx, vy: p.vy, rot: p.rot, w: p.w, h: p.h, sink: p.sink, held: p === grabbed }));
    },
    move(u: number, v: number) { if (grabbed) { gx = u * A; gy = v; } },
    release() { if (grabbed && reduce) { grabbed.vx = grabbed.vy = 0; } grabbed = null; },
    get holding() { return !!grabbed; },
    /** Sink: the visitor entered. */
    leave() { leaving = true; grabbed = null; },
    update(dt: number, pond: PondContext) {
      if (!visible) return;
      time += dt;
      if (leaving) { leaveT += dt; if (leaveT > 1.6) visible = false; }
      for (const p of pieces) {
        if (p === grabbed) {
          // dragged through water: it follows the hand with a heavy lag, and its velocity is remembered for the throw
          const hw0 = p.w * 0.45, hh0 = p.h * 0.45;
          const tx = Math.min(box.x1 - hw0, Math.max(box.x0 + hw0, gx + ox)), ty = Math.min(box.y1 - hh0, Math.max(box.y0 + hh0, gy + oy)), k = Math.min(1, dt * 9);
          const nx = p.x + (tx - p.x) * k, ny = p.y + (ty - p.y) * k;
          p.vx = (nx - p.x) / Math.max(dt, 1e-3); p.vy = (ny - p.y) / Math.max(dt, 1e-3); p.x = nx; p.y = ny;
        } else {
          // a slow current, and water drag
          if (!reduce && !leaving) { p.vx += Math.sin(time * 0.21 + p.seed) * 0.004 * dt; p.vy += Math.cos(time * 0.17 + p.seed * 1.3) * 0.004 * dt; }
          const drag = Math.pow(0.32, dt); p.vx *= drag; p.vy *= drag;
          p.x += p.vx * dt; p.y += p.vy * dt;
          // the screen's edges: it bounces off softly and never leaves the screen
          const hw = p.w * 0.45, hh = p.h * 0.45;
          if (p.x < box.x0 + hw) { p.x = box.x0 + hw; p.vx = Math.abs(p.vx) * 0.45; p.vr += p.vy * 0.8; }
          else if (p.x > box.x1 - hw) { p.x = box.x1 - hw; p.vx = -Math.abs(p.vx) * 0.45; p.vr -= p.vy * 0.8; }
          if (p.y < box.y0 + hh) { p.y = box.y0 + hh; p.vy = Math.abs(p.vy) * 0.45; p.vr -= p.vx * 0.8; }
          else if (p.y > box.y1 - hh) { p.y = box.y1 - hh; p.vy = -Math.abs(p.vy) * 0.45; p.vr += p.vx * 0.8; }
        }
        // ripples reaching a keepsake nudge it away from where they started
        for (const d of pond.drops) {
          if (p.hit.has(d.id)) continue;
          const du = (p.x / A - d.u) * pond.simW, dv = (p.y - d.v) * pond.simH, dist = Math.hypot(du, dv);
          if ((pond.simStep - d.step0) * pond.speed >= dist) {
            p.hit.add(d.id);
            if (p !== grabbed && dist > 1) { const f = (d.s * 0.05) / (1 + dist / 60); p.vx += (du / dist) * f * A; p.vy += (dv / dist) * f; p.vr += (Math.random() - 0.5) * f * 4; }
          }
        }
        // it turns a little as it moves (dragged by a corner), and settles back slowly
        p.vr += ((p.base + Math.max(-0.35, Math.min(0.35, p.vx * 1.6)) - p.rot) * 2.2 - p.vr * 1.8) * dt;
        p.rot += p.vr * dt;
        // a wake behind anything moving
        const sp = Math.hypot(p.vx, p.vy);
        if (!reduce && sp > 0.03 && time - p.lastWake > 0.05) { p.lastWake = time; pond.ripple(p.x / A - (p.vx / sp) * (p.w / A) * 0.5, p.y - (p.vy / sp) * p.h * 0.5, Math.min(0.35, sp * 0.9), 0.006); }
        // sinking: it goes darker and greener, a little smaller, and fades into the water
        const sink = leaving ? Math.min(1, leaveT / 1.4) : 0;
        p.sink = sink;
        const bob = reduce ? 1 : 1 + Math.sin(time * 1.3 + p.seed) * 0.006;
        p.group.position.set(p.x, p.y - sink * 0.02, 0);
        p.group.rotation.z = p.rot;
        p.group.scale.setScalar(bob * (1 - sink * 0.1) * (p === grabbed ? 1.04 : 1));
        const lift = p === grabbed ? 1 : 0;
        p.mat.opacity = 1 - sink; p.mat.color.setRGB(1 - sink * 0.55, 1 - sink * 0.35, 1 - sink * 0.4);
        p.shadowMat.opacity = (0.42 + lift * 0.12) * (1 - sink);
        const sh = p.group.children.find((m) => m.name === "shadow"); if (sh) sh.position.set(p.w * (0.05 + lift * 0.04), -p.h * (0.06 + lift * 0.05), 0);
      }
    },
    render(renderer: THREE.WebGLRenderer) {
      if (!visible) return;
      const prev = renderer.getRenderTarget(), prevClear = renderer.getClearAlpha();
      renderer.setRenderTarget(rt); renderer.setClearColor(0x000000, 0); renderer.clear(); renderer.render(scene, cam);
      renderer.setRenderTarget(prev); renderer.setClearAlpha(prevClear);
    },
    dispose() {
      pieces.forEach((p) => { p.group.children.forEach((m) => (m as THREE.Mesh).geometry.dispose()); p.mat.map?.dispose(); p.mat.dispose(); p.shadowMat.map?.dispose(); p.shadowMat.dispose(); });
      rt.dispose();
    },
  };
}
export type Keepsakes = ReturnType<typeof createKeepsakes>;
