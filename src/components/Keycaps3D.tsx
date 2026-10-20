"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { NameLetter } from "@/lib/name-letters";
import { buildLegendGeometry } from "@/lib/keycap-geometry";
import { createMeltMaterial } from "@/lib/keycap-melt-material";
import {
  letterPose,
  restPositions,
  pressTime,
  easeInOutCubic,
  lerp,
  LAND_DUR,
  DOCK_STAGGER,
  MELT_DELAY,
  MELT_STAGGER,
  MELT_DUR,
  SPACING,
  ROW_GAP,
} from "@/lib/keycap-letter-motion";

const PALETTE = { body: "#5a4636", legend: "#faf7f2", edge: "#e8b98e" };
const FOV = 35;
const INTRO_ELEVATION = THREE.MathUtils.degToRad(32);
const DOCK_ELEVATION = THREE.MathUtils.degToRad(72);
// how much taller a key's on-screen footprint is than its width, seen from DOCK_ELEVATION
const FOOTPRINT = Math.sin(DOCK_ELEVATION) + 0.62 * Math.cos(DOCK_ELEVATION);
// a docked cap covers most of its letter's line box, not all of it
const CAP_HEIGHT = 0.78;
const MIN_CAP_ASPECT = 0.62;
const GROUND_OPACITY = 0.35;
const SKIP_SPEED = 0.35;

export type KeycapControls = { skip: () => void };

// k: how much the legend must grow so its glyph matches the serif letter it melts into
type Dock = { x: number; z: number; s: number; sx: number; k: number };

const LEGEND_PLANE = 0.56;
// glyph em size as a fraction of the legend plane
const GLYPH_FRACTION = 0.72;

function makeLegendTexture(char: string, fontFamily: string) {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = PALETTE.legend;
  // weight 400 to match the hero heading it hands off to
  ctx.font = `400 ${Math.round(size * GLYPH_FRACTION)}px ${fontFamily}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(char, size / 2, size / 2);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function placeCamera(cam: THREE.PerspectiveCamera, elevation: number, d: number) {
  cam.position.set(0, Math.sin(elevation) * d, Math.cos(elevation) * d);
  cam.lookAt(0, 0, 0);
  cam.updateMatrixWorld();
}

const smooth = (a: number, b: number, x: number) => THREE.MathUtils.smoothstep(x, a, b);

export default function Keycaps3D({
  letters,
  geometry,
  pressStartBase,
  sequenceTotal,
  landTotal,
  getTargets,
  legendFont,
  controlRef,
  onPress,
  onFirstFrame,
  onMeltStart,
  onDone,
}: {
  letters: NameLetter[];
  geometry: THREE.BufferGeometry;
  pressStartBase: number;
  sequenceTotal: number;
  landTotal: number;
  getTargets: () => DOMRect[];
  legendFont: string;
  controlRef: RefObject<KeycapControls | null>;
  onPress: (x: number, y: number) => void;
  onFirstFrame: () => void;
  onMeltStart: () => void;
  onDone: () => void;
}) {
  const invalidate = useThree((s) => s.invalidate);
  const rests = useMemo(() => restPositions(letters.map((l) => l.word)), [letters]);
  const groupRefs = useRef<(THREE.Group | null)[]>([]);
  const bodyRefs = useRef<(THREE.Mesh | null)[]>([]);
  const legendRefs = useRef<(THREE.Mesh | null)[]>([]);
  const groundRef = useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.ShadowMaterial>>(null);
  const startRef = useRef<number | null>(null);
  const speedRef = useRef(1);
  const pressedRef = useRef<Set<number>>(new Set());
  const docksRef = useRef<Dock[] | null>(null);
  const fitRef = useRef({ key: "", d: 10 });
  const flagsRef = useRef({ firstFrame: false, meltStarted: false, done: false });
  const legendGeometry = useMemo(() => buildLegendGeometry(), []);

  const bodyMaterials = useMemo(() => letters.map(() => createMeltMaterial(PALETTE.body, PALETTE.edge)), [letters]);

  const legendMaterials = useMemo(
    () =>
      letters.map(
        (l) =>
          new THREE.MeshBasicMaterial({
            map: makeLegendTexture(l.char, legendFont),
            transparent: true,
            opacity: 0,
            depthWrite: false,
            // keeps the decal in front of the cap even when keys shrink to a few pixels
            polygonOffset: true,
            polygonOffsetFactor: -4,
            polygonOffsetUnits: -4,
          })
      ),
    [letters, legendFont]
  );

  useEffect(() => {
    controlRef.current = {
      skip: () => {
        const start = startRef.current;
        if (start === null) return;
        const elapsed = performance.now() - start;
        if (elapsed >= sequenceTotal) return;
        startRef.current = start - (sequenceTotal - elapsed);
        letters.forEach((_, i) => pressedRef.current.add(i));
        speedRef.current = SKIP_SPEED;
        invalidate();
      },
    };
    return () => {
      controlRef.current = null;
    };
  }, [controlRef, invalidate, letters, sequenceTotal]);

  // project each serif letter's rect through the docking camera onto the y=0 plane
  function computeDocks(width: number, height: number, canvasRect: DOMRect): Dock[] | null {
    const rects = getTargets();
    if (rects.length !== letters.length) return null;
    const dockCam = new THREE.PerspectiveCamera(FOV, width / height, 0.1, 1000);
    placeCamera(dockCam, DOCK_ELEVATION, fitRef.current.d);
    const dir = new THREE.Vector3();
    dockCam.getWorldDirection(dir);
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const ray = new THREE.Raycaster();
    const halfTan = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
    return rects.map((r) => {
      const ndc = new THREE.Vector2(
        ((r.left + r.width / 2 - canvasRect.left) / width) * 2 - 1,
        -(((r.top + r.height / 2 - canvasRect.top) / height) * 2 - 1)
      );
      ray.setFromCamera(ndc, dockCam);
      const hit = new THREE.Vector3();
      ray.ray.intersectPlane(plane, hit);
      const wpp = (2 * hit.clone().sub(dockCam.position).dot(dir) * halfTan) / height;
      const s = (r.height * CAP_HEIGHT * wpp) / FOOTPRINT;
      return {
        x: hit.x,
        z: hit.z,
        s,
        sx: Math.max((r.width * 0.94 * wpp) / s, MIN_CAP_ASPECT),
        // the heading has line-height 1, so the rect's height is its font size
        k: (r.height * wpp) / (LEGEND_PLANE * GLYPH_FRACTION * s),
      };
    });
  }

  useFrame((state) => {
    const cam = state.camera as THREE.PerspectiveCamera;
    const { width, height } = state.size;
    const now = performance.now();
    if (startRef.current === null) startRef.current = now;
    const flags = flagsRef.current;

    const key = `${width}x${height}`;
    if (fitRef.current.key !== key) {
      const longest = Math.max(...rests.map((r) => Math.abs(r.x))) * 2 + SPACING;
      const rowDepth = Math.max(...rests.map((r) => r.z)) - Math.min(...rests.map((r) => r.z)) + ROW_GAP;
      const halfTan = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
      const fitWidth = (longest * 1.35) / (2 * halfTan * (width / height));
      const fitHeight = (rowDepth * 1.6) / (2 * halfTan);
      fitRef.current = { key, d: Math.max(fitWidth, fitHeight, 7) };
      cam.fov = FOV;
      cam.updateProjectionMatrix();
      docksRef.current = null;
    }

    const elapsed = now - startRef.current;
    const speed = speedRef.current;
    const landing = elapsed >= sequenceTotal;
    if (landing && docksRef.current === null) {
      docksRef.current = computeDocks(width, height, state.gl.domElement.getBoundingClientRect());
    }
    const docks = docksRef.current;
    const landEnd = sequenceTotal + landTotal * speed;
    const landP = landing ? Math.min((elapsed - sequenceTotal) / (landTotal * speed), 1) : 0;
    const meltStart = landEnd + MELT_DELAY;
    const meltEnd = meltStart + (letters.length - 1) * MELT_STAGGER + MELT_DUR;

    placeCamera(cam, docks ? lerp(INTRO_ELEVATION, DOCK_ELEVATION, easeInOutCubic(landP)) : INTRO_ELEVATION, fitRef.current.d);
    if (groundRef.current) groundRef.current.material.opacity = GROUND_OPACITY * (1 - Math.min(landP * 3, 1));

    letters.forEach((_, i) => {
      const g = groupRefs.current[i];
      const body = bodyRefs.current[i];
      if (!g || !body) return;
      const rest = rests[i];
      const dock = docks?.[i];
      const pose = letterPose(Math.min(elapsed, sequenceTotal), i, pressStartBase, rest);
      const pi = landing
        ? Math.min(Math.max((elapsed - sequenceTotal - i * DOCK_STAGGER * speed) / (LAND_DUR * speed), 0), 1)
        : 0;

      if (dock && pi > 0) {
        const e = easeInOutCubic(pi);
        // the back row arcs over the front row so keys never pass through each other
        const arc = rest.word === 0 ? Math.sin(Math.PI * pi) * 0.9 : 0;
        g.position.set(lerp(pose.x, dock.x, e), lerp(pose.y, 0, e) + arc, lerp(pose.z, dock.z, e));
        g.rotation.set(0, lerp(pose.rotY, 0, e), 0);
        g.scale.setScalar(lerp(pose.scale, dock.s, e));
        body.scale.x = lerp(1, dock.sx, e);
      } else {
        g.position.set(pose.x, pose.y, pose.z);
        g.rotation.set(0, pose.rotY, 0);
        g.scale.setScalar(pose.scale);
        body.scale.x = 1;
      }

      // melt: the cap slumps a little and dissolves top-down while its legend fades,
      // handing the letter to the serif glyph underneath
      const mp = Math.min(Math.max((elapsed - meltStart - i * MELT_STAGGER) / MELT_DUR, 0), 1);
      bodyMaterials[i].userData.progress.value = mp;
      if (mp > 0) {
        g.scale.y *= 1 - 0.22 * smooth(0, 1, mp);
        g.position.y -= 0.12 * (dock?.s ?? 1) * smooth(0, 1, mp);
        body.castShadow = false;
      }

      const pressAt = pressTime(i, rest.word, pressStartBase);
      // the legend appears as its key bottoms out, so the name types itself out
      const typed = THREE.MathUtils.clamp((elapsed - pressAt - 60) / 140, 0, 1);
      // the printed letter grows out of the melting cap to exactly the serif glyph's size,
      // then crossfades into it
      const legend = legendRefs.current[i];
      const grow = dock && mp > 0 ? smooth(0, 0.65, mp) : 0;
      const k = dock ? lerp(1, dock.k, grow) : 1;
      legend?.scale.set(k, 1, k);
      // face the camera and sit on the docking plane, so the glyph isn't foreshortened
      // or offset from the serif letter it lands on
      legend?.rotation.set((Math.PI / 2 - DOCK_ELEVATION) * grow, 0, 0);
      legend?.position.set(0, -0.265 * grow, 0);
      // the serif letter is fully in (380+260ms of the 750ms melt) before this one fades, so there is no dip
      legendMaterials[i].opacity = typed * (1 - smooth(0.86, 1, mp));
      if (!pressedRef.current.has(i) && elapsed >= pressAt) {
        pressedRef.current.add(i);
        const world = new THREE.Vector3();
        g.getWorldPosition(world);
        world.project(cam);
        onPress((world.x * 0.5 + 0.5) * width, (1 - (world.y * 0.5 + 0.5)) * height);
      }
    });

    if (!flags.firstFrame) {
      flags.firstFrame = true;
      onFirstFrame();
    }
    if (!flags.meltStarted && elapsed >= meltStart) {
      flags.meltStarted = true;
      onMeltStart();
    }
    if (!flags.done && elapsed >= meltEnd) {
      flags.done = true;
      onDone();
      return;
    }
    state.invalidate();
  });

  return (
    <group>
      <mesh ref={groundRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.33, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <shadowMaterial opacity={GROUND_OPACITY} depthWrite={false} />
      </mesh>
      {letters.map((letter, i) => (
        <group
          key={letter.globalIndex}
          ref={(el) => {
            groupRefs.current[i] = el;
          }}
        >
          <mesh
            ref={(el) => {
              bodyRefs.current[i] = el;
            }}
            geometry={geometry}
            material={bodyMaterials[i]}
            castShadow
            receiveShadow
          />
          <mesh
            ref={(el) => {
              legendRefs.current[i] = el;
            }}
            geometry={legendGeometry}
            material={legendMaterials[i]}
          />
        </group>
      ))}
    </group>
  );
}
