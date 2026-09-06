"use client";

import * as THREE from "three";

/** A stylized upright piano — low-poly set-dressing, not a floating symbol.
 * Body + lid + a real row of keys + a music stand, so it reads as a place
 * rather than an icon. */
export default function Piano({
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
  const woodDark = "#241a2e";
  const woodMid = "#3a2a47";

  const whiteKeys = 10;
  const keyWidth = 0.11;
  const keyboardWidth = whiteKeys * keyWidth;

  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {/* body */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[keyboardWidth + 0.3, 2, 0.7]} />
        <meshStandardMaterial color={woodDark} roughness={0.5} metalness={0.15} />
      </mesh>

      {/* top panel with a slight gloss, tinted by the universe accent */}
      <mesh position={[0, 2.02, 0]} castShadow>
        <boxGeometry args={[keyboardWidth + 0.34, 0.05, 0.74]} />
        <meshStandardMaterial color={woodMid} roughness={0.3} metalness={0.35} emissive={colors.accent} emissiveIntensity={0.06} />
      </mesh>

      {/* music stand */}
      <mesh position={[0, 2.35, -0.28]} rotation={[-0.35, 0, 0]}>
        <boxGeometry args={[keyboardWidth * 0.7, 0.4, 0.03]} />
        <meshStandardMaterial color={woodMid} roughness={0.4} />
      </mesh>

      {/* keybed ledge */}
      <mesh position={[0, 1.05, 0.4]} castShadow>
        <boxGeometry args={[keyboardWidth + 0.1, 0.08, 0.3]} />
        <meshStandardMaterial color="#0f0a16" roughness={0.5} />
      </mesh>

      {/* white keys */}
      {Array.from({ length: whiteKeys }).map((_, i) => (
        <mesh
          key={`w${i}`}
          position={[-keyboardWidth / 2 + i * keyWidth + keyWidth / 2, 1.08, 0.45]}
        >
          <boxGeometry args={[keyWidth - 0.01, 0.03, 0.2]} />
          <meshStandardMaterial color="#f2efe8" roughness={0.35} />
        </mesh>
      ))}

      {/* black keys (skip the 4th/8th gaps for a believable major-scale pattern) */}
      {Array.from({ length: whiteKeys - 1 })
        .map((_, i) => i)
        .filter((i) => i % 7 !== 2 && i % 7 !== 6)
        .map((i) => (
          <mesh
            key={`b${i}`}
            position={[-keyboardWidth / 2 + (i + 1) * keyWidth, 1.13, 0.38]}
          >
            <boxGeometry args={[keyWidth * 0.55, 0.04, 0.12]} />
            <meshStandardMaterial color="#0c0912" roughness={0.3} />
          </mesh>
        ))}

      {/* legs */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * (keyboardWidth / 2 - 0.1), 0.2, 0.15]} castShadow>
          <cylinderGeometry args={[0.05, 0.06, 0.4, 8]} />
          <meshStandardMaterial color={woodDark} roughness={0.5} />
        </mesh>
      ))}

      {/* a warm pool of light so it doesn't read as a silhouette */}
      <pointLight position={[0, 1.6, 0.6]} color={colors.accent} intensity={1.2} distance={5} decay={2} />
    </group>
  );
}
