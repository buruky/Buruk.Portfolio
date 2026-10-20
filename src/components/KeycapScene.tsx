"use client";

import { Component, useMemo, useState, type ReactNode, type RefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "motion/react";
import Keycaps3D, { type KeycapControls } from "@/components/Keycaps3D";
import { buildKeycapGeometry } from "@/lib/keycap-geometry";
import { splitNameIntoLetters } from "@/lib/name-letters";
import { sequenceTiming } from "@/lib/keycap-letter-motion";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

type Ripple = { id: number; x: number; y: number };

class WebGLBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function KeycapScene({
  name,
  getTargets,
  legendFont,
  controlRef,
  onFirstFrame,
  onMeltStart,
  onDone,
  onError,
}: {
  name: string;
  getTargets: () => DOMRect[];
  legendFont: string;
  controlRef: RefObject<KeycapControls | null>;
  onFirstFrame: () => void;
  onMeltStart: () => void;
  onDone: () => void;
  onError: () => void;
}) {
  const letters = useMemo(() => splitNameIntoLetters(name), [name]);
  const timing = useMemo(() => sequenceTiming(letters.map((l) => l.word)), [letters]);
  const geometry = useMemo(() => buildKeycapGeometry(), []);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20">
      <WebGLBoundary onError={onError}>
        <Canvas
          className="absolute! inset-0"
          frameloop="demand"
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
          shadows="percentage"
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        >
          <ambientLight intensity={0.45} />
          <directionalLight
            position={[3.2, 6, 4]}
            intensity={1.6}
            color="#fff3e4"
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-camera-left={-8}
            shadow-camera-right={8}
            shadow-camera-top={8}
            shadow-camera-bottom={-8}
          />
          <directionalLight position={[-4, 2.5, -2]} intensity={0.35} color="#bfd4ff" />
          <directionalLight position={[-2, 1.5, -4]} intensity={0.9} color="#e8b98e" />
          <Keycaps3D
            letters={letters}
            geometry={geometry}
            pressStartBase={timing.pressStartBase}
            sequenceTotal={timing.sequenceTotal}
            landTotal={timing.landTotal}
            getTargets={getTargets}
            legendFont={legendFont}
            controlRef={controlRef}
            onPress={(x, y) => setRipples((prev) => [...prev, { id: prev.length + Date.now(), x, y }])}
            onFirstFrame={onFirstFrame}
            onMeltStart={onMeltStart}
            onDone={onDone}
          />
        </Canvas>
      </WebGLBoundary>

      {ripples.map((r) => (
        <motion.span
          key={r.id}
          className="absolute rounded-full"
          style={{
            left: r.x,
            top: r.y,
            width: 90,
            height: 90,
            marginLeft: -45,
            marginTop: -45,
            background: "radial-gradient(circle, rgba(232,185,142,0.45) 0%, rgba(232,185,142,0) 70%)",
          }}
          initial={{ opacity: 0.6, scale: 0.3 }}
          animate={{ opacity: 0, scale: 2.6 }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          onAnimationComplete={() => setRipples((prev) => prev.filter((p) => p.id !== r.id))}
        />
      ))}
    </div>
  );
}
