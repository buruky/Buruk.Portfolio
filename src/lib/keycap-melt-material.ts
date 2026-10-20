import * as THREE from "three";

// a keycap material that can dissolve away top-down in vertical drip streaks with a
// warm glowing edge; drive it with material.userData.progress.value from 0 to 1
export function createMeltMaterial(color: string, edgeColor: string) {
  const material = new THREE.MeshPhysicalMaterial({
    color,
    roughness: 0.55,
    clearcoat: 0.25,
    clearcoatRoughness: 0.4,
    metalness: 0.2,
  });
  const progress = { value: 0 };
  const edge = { value: new THREE.Color(edgeColor) };
  material.userData.progress = progress;

  material.onBeforeCompile = (shader) => {
    shader.uniforms.uMelt = progress;
    shader.uniforms.uMeltEdge = edge;

    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vMeltLocal;")
      .replace("#include <begin_vertex>", "#include <begin_vertex>\nvMeltLocal = position;");

    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
uniform float uMelt;
uniform vec3 uMeltEdge;
varying vec3 vMeltLocal;
float meltGlow = 0.0;
float meltHash(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}
float meltNoise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(meltHash(i), meltHash(i + vec3(1, 0, 0)), f.x), mix(meltHash(i + vec3(0, 1, 0)), meltHash(i + vec3(1, 1, 0)), f.x), f.y),
    mix(mix(meltHash(i + vec3(0, 0, 1)), meltHash(i + vec3(1, 0, 1)), f.x), mix(meltHash(i + vec3(0, 1, 1)), meltHash(i + vec3(1, 1, 1)), f.x), f.y),
    f.z
  );
}`
      )
      .replace(
        "#include <clipping_planes_fragment>",
        `#include <clipping_planes_fragment>
if (uMelt > 0.0) {
  // stretched noise reads as vertical drips; height makes the top go first
  float h = clamp((vMeltLocal.y + 0.31) / 0.62, 0.0, 1.0);
  float n = meltNoise(vec3(vMeltLocal.x * 7.0, vMeltLocal.y * 2.2, vMeltLocal.z * 7.0));
  float level = h * 0.65 + n * 0.35;
  float cut = 1.0 - uMelt * 1.08;
  if (level > cut) discard;
  meltGlow = smoothstep(cut - 0.07, cut, level);
}`
      )
      .replace(
        "#include <emissivemap_fragment>",
        "#include <emissivemap_fragment>\ntotalEmissiveRadiance += uMeltEdge * meltGlow * 1.8;"
      );
  };
  material.customProgramCacheKey = () => "keycap-melt";
  return material;
}
