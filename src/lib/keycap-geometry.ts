import * as THREE from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";

type KeycapShape = {
  width?: number;
  depth?: number;
  height?: number;
  radius?: number;
  segments?: number;
  topScale?: number;
  dishDepth?: number;
};

const DEFAULTS = {
  width: 1,
  depth: 1,
  height: 0.62,
  // small radius + straight taper reads as molded keycap plastic; larger values go soft and pillowy
  radius: 0.04,
  segments: 64,
  topScale: 0.8,
  dishDepth: 0.085,
};

// rounded-square norm: 1 along the top face's edges, so the dish follows the square
// out to the corners instead of carving a circle into it
const DISH_SQUARENESS = 4;

// the dish height the cap top and the legend decal share; the squared falloff
// meets the rim with zero slope, so there's no crease line around the dish
function dishAt(x: number, z: number, footprint: number, dishDepth: number) {
  const p = DISH_SQUARENESS;
  const r = Math.min(Math.pow(Math.abs(x) ** p + Math.abs(z) ** p, 1 / p) / footprint, 1);
  return dishDepth * (1 - r * r) ** 2;
}

// a subdivided box with its own corner rounding: three's RoundedBoxGeometry
// collapses each flat face to a single quad, which leaves no vertices to carve
// the dish into.
export function buildKeycapGeometry(shape: KeycapShape = {}): THREE.BufferGeometry {
  const { width, depth, height, radius, segments, topScale, dishDepth } = { ...DEFAULTS, ...shape };
  const box = new THREE.BoxGeometry(width, height, depth, segments, Math.round(segments / 2), segments);
  box.deleteAttribute("normal");
  box.deleteAttribute("uv");
  const geo = mergeVertices(box);

  const pos = geo.attributes.position;
  const inner = new THREE.Vector3(width / 2 - radius, height / 2 - radius, depth / 2 - radius);
  const halfH = height / 2;
  const footprint = Math.max(width, depth) * 0.5 * topScale;
  const v = new THREE.Vector3();
  const c = new THREE.Vector3();

  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    c.copy(v).clamp(inner.clone().negate(), inner);
    const offset = v.clone().sub(c);
    if (offset.lengthSq() > 0) v.copy(c).add(offset.setLength(radius));

    const t = THREE.MathUtils.clamp((v.y + halfH) / height, 0, 1);
    const taper = THREE.MathUtils.lerp(1, topScale, t);
    v.x *= taper;
    v.z *= taper;

    if (t > 0.78) v.y -= dishAt(v.x, v.z, footprint, dishDepth) * ((t - 0.78) / 0.22);

    pos.setXYZ(i, v.x, v.y, v.z);
  }

  geo.computeVertexNormals();
  return geo;
}

// a legend decal bent to the same dish curve, just above the surface, so it
// reads as printed on the cap rather than floating
export function buildLegendGeometry(size = 0.56 /* keep in sync with LEGEND_PLANE */, shape: KeycapShape = {}): THREE.BufferGeometry {
  const { width, depth, height, topScale, dishDepth } = { ...DEFAULTS, ...shape };
  const geo = new THREE.PlaneGeometry(size, size, 16, 16);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  const footprint = Math.max(width, depth) * 0.5 * topScale;
  for (let i = 0; i < pos.count; i++) {
    pos.setY(i, height / 2 - dishAt(pos.getX(i), pos.getZ(i), footprint, dishDepth) + 0.004);
  }
  geo.computeVertexNormals();
  return geo;
}
