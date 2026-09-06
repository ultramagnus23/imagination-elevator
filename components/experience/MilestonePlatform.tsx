"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ParticleTheme } from "@/lib/types";
import ParticleField from "./ParticleField";

export default function MilestonePlatform({
  z,
  active,
  colors,
  particleTheme,
  muted = false,
  moment = false,
  seed,
}: {
  z: number;
  active: boolean;
  colors: { core: string; accent: string; fade: string };
  particleTheme: ParticleTheme;
  muted?: boolean;
  moment?: boolean;
  seed: number;
}) {
  const ringRef = useRef<THREE.Mesh>(null);
  const avatarRef = useRef<THREE.Mesh>(null);
  const momentRingRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ringRef.current) ringRef.current.rotation.z = t * 0.15;
    if (avatarRef.current) {
      avatarRef.current.position.y = 1.7 + Math.sin(t * 1.4 + seed) * 0.12;
      avatarRef.current.rotation.y = t * 0.3;
    }
    if (momentRingRef.current) {
      momentRingRef.current.rotation.z = -t * 0.4;
      const s = 1 + Math.sin(t * 2) * 0.08;
      momentRingRef.current.scale.set(s, s, s);
    }
  });

  const platformColor = muted ? colors.fade : colors.core;
  const accentColor = muted ? colors.fade : colors.accent;
  const intensity = active ? 1.4 : 0.45;

  return (
    <group position={[0, 0, z]}>
      <pointLight
        position={[0, 3, 0]}
        color={accentColor}
        intensity={intensity * 6}
        distance={12}
        decay={2}
      />

      <mesh position={[0, -0.08, 0]} receiveShadow>
        <cylinderGeometry args={[3, 3.2, 0.16, 48]} />
        <meshStandardMaterial
          color={platformColor}
          emissive={platformColor}
          emissiveIntensity={0.25}
          roughness={0.45}
          metalness={0.25}
        />
      </mesh>

      <mesh ref={ringRef} position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.05, 3.25, 64]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.55} side={THREE.DoubleSide} />
      </mesh>

      <mesh ref={avatarRef} position={[0, 1.7, 0]}>
        <icosahedronGeometry args={[0.32, 1]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={0.9}
          roughness={0.2}
        />
      </mesh>

      {moment && (
        <mesh ref={momentRingRef} position={[0, 1.7, 0]}>
          <torusGeometry args={[0.9, 0.02, 8, 64]} />
          <meshBasicMaterial color={colors.accent} transparent opacity={0.6} />
        </mesh>
      )}

      <ParticleField
        theme={particleTheme}
        color={colors.accent}
        mutedColor={colors.fade}
        muted={muted}
        seed={seed}
      />
    </group>
  );
}
