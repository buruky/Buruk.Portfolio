// The glass ብሩኽ's shared recipe (browser side), so every scene's glass is the same glass:
// GlassHero (Home and every WorldPage). Tweak it here, it changes everywhere.
import * as THREE from "three";

/** The glass itself: clear, thick, a warm tint, a clear coat and a faint rainbow at the edges. */
export const glassMaterial = () => new THREE.MeshPhysicalMaterial({
  color: 0xffffff, metalness: 0, roughness: 0.05, transmission: 1, thickness: 1.6, ior: 1.6,
  attenuationColor: new THREE.Color(0xffe6c4), attenuationDistance: 1.4, clearcoat: 1, clearcoatRoughness: 0.02,
  specularIntensity: 1, envMapIntensity: 1.8, iridescence: 0.35, iridescenceIOR: 1.3, iridescenceThicknessRange: [200, 600],
});

/** A letter outline from src/lib/glyphs.ts (font units, y down) as flat shapes, scaled by k, ready to extrude. */
export function shapes(d: (string | number)[], k: number) {
  const sp = new THREE.ShapePath(); let i = 0;
  const n = () => (d[i++] as number) * k;
  while (i < d.length) {
    const c = d[i++];
    if (c === "M") { const x = n(), y = n(); sp.moveTo(x, -y); }
    else if (c === "L") { const x = n(), y = n(); sp.lineTo(x, -y); }
    else if (c === "Q") { const x1 = n(), y1 = n(), x = n(), y = n(); sp.quadraticCurveTo(x1, -y1, x, -y); }
    else if (c === "C") { const x1 = n(), y1 = n(), x2 = n(), y2 = n(), x = n(), y = n(); sp.bezierCurveTo(x1, -y1, x2, -y2, x, -y); }
  }
  return sp.toShapes(false);
}

/** Easing for the 3D scenes: ease-out for arrivals, ease-in-out for moves across the screen (t in 0–1). */
export const EO = (t: number) => 1 - Math.pow(1 - t, 3);
export const EIO = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
