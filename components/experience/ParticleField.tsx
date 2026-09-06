"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, InstancedMesh, Object3D } from "three";
import { ParticleTheme } from "@/lib/types";

interface Mote {
  radius: number;
  angle: number;
  height: number;
  speed: number;
  scale: number;
}

function makeMotes(count: number, seed: number): Mote[] {
  const motes: Mote[] = [];
  for (let i = 0; i < count; i++) {
    // Cheap deterministic pseudo-random so server/client agree and re-renders are stable.
    const r = (n: number) => {
      const x = Math.sin(seed * 999 + n * 57.13) * 10000;
      return x - Math.floor(x);
    };
    motes.push({
      radius: 1.4 + r(i) * 2.2,
      angle: r(i + 10) * Math.PI * 2,
      height: 1.4 + r(i + 20) * 2.6,
      speed: 0.15 + r(i + 30) * 0.25,
      scale: 0.02 + r(i + 40) * 0.025,
    });
  }
  return motes;
}

/** Ambient drifting light motes — ties a milestone's air together without
 * standing in for content. The theme's actual meaning now lives in real
 * environment geometry (piano, graph wall, books), not in floating glyphs. */
export default function ParticleField({
  theme,
  color,
  mutedColor,
  muted = false,
  count = 14,
  seed = 1,
}: {
  theme: ParticleTheme;
  color: string;
  mutedColor?: string;
  muted?: boolean;
  count?: number;
  seed?: number;
}) {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const motes = useMemo(() => makeMotes(count, seed), [count, seed]);
  const activeColor = muted ? mutedColor ?? "#9a9a9e" : color;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const mesh = meshRef.current;
    if (!mesh) return;
    motes.forEach((p, i) => {
      const angle = p.angle + t * p.speed;
      dummy.position.set(
        Math.cos(angle) * p.radius,
        p.height + Math.sin(t * p.speed * 2 + i) * 0.25,
        Math.sin(angle) * p.radius
      );
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  // theme reserved for future per-universe mote variation (density, drift character)
  void theme;

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, motes.length]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial
          color={activeColor}
          emissive={activeColor}
          emissiveIntensity={1.4}
          transparent
          opacity={muted ? 0.35 : 0.7}
        />
      </instancedMesh>
    </group>
  );
}
