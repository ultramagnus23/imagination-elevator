"use client";

import { Line } from "@react-three/drei";

/** A rising line-graph mounted on a wall panel, plus a small bar cluster at
 * its base — "compound interest" made literal, embedded in the environment
 * rather than floating UI. */
export default function GraphWall({
  position,
  rotationY = 0,
  colors,
  scale = 1,
}: {
  position: [number, number, number];
  rotationY?: number;
  colors: { core: string; accent: string; fade: string };
  scale?: number;
}) {
  // An exponential-ish curve, matching the "1 → 2 → 4 → 8 → 16 → 32" cue.
  const curvePoints: [number, number, number][] = [];
  const N = 24;
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    curvePoints.push([t * 2.2 - 1.1, Math.pow(t, 2.1) * 1.7 - 0.1, 0.06]);
  }

  const bars = [0.25, 0.4, 0.55, 0.8, 1.05, 1.4];

  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {/* wall panel */}
      <mesh position={[0, 1, 0]} receiveShadow>
        <boxGeometry args={[2.6, 2, 0.08]} />
        <meshStandardMaterial color="#241d14" roughness={0.6} />
      </mesh>

      {/* axis lines */}
      <Line points={[[-1.1, 0.05, 0.07], [1.1, 0.05, 0.07]]} color={colors.fade} lineWidth={1.5} />
      <Line points={[[-1.1, 0.05, 0.07], [-1.1, 1.85, 0.07]]} color={colors.fade} lineWidth={1.5} />

      {/* the growth curve, glowing against the dark panel */}
      <Line points={curvePoints.map(([x, y, z]) => [x, y + 1, z] as [number, number, number])} color={colors.accent} lineWidth={3} />

      {/* a few marker points along the curve */}
      {[0.3, 0.55, 0.8].map((t, i) => {
        const y = Math.pow(t, 2.1) * 1.7 + 0.9;
        const x = t * 2.2 - 1.1;
        return (
          <mesh key={i} position={[x, y, 0.09]}>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshStandardMaterial color={colors.accent} emissive={colors.accent} emissiveIntensity={1.2} />
          </mesh>
        );
      })}

      {/* rising bar chart at the base */}
      <group position={[0, -0.02, 0.35]}>
        {bars.map((h, i) => (
          <mesh key={i} position={[-1 + i * 0.4, h / 2, 0]} castShadow>
            <boxGeometry args={[0.28, h, 0.28]} />
            <meshStandardMaterial
              color={colors.core}
              emissive={colors.accent}
              emissiveIntensity={0.2}
              roughness={0.4}
              metalness={0.2}
            />
          </mesh>
        ))}
      </group>

      <pointLight position={[0, 1.6, 0.8]} color={colors.accent} intensity={1} distance={5} decay={2} />
    </group>
  );
}
