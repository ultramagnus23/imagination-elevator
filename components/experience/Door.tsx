"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import { UniverseConfig } from "@/lib/types";

export default function Door({
  config,
  x,
  onEnter,
}: {
  config: UniverseConfig;
  x: number;
  onEnter: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const frameRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const target = hovered ? 1 : 0.5;
    if (glowRef.current) {
      glowRef.current.intensity = THREE.MathUtils.damp(
        glowRef.current.intensity,
        target * 8 + Math.sin(t * 2 + x) * 0.4,
        4,
        0.02
      );
    }
    if (frameRef.current) {
      const s = THREE.MathUtils.damp(frameRef.current.scale.x, hovered ? 1.04 : 1, 6, 0.02);
      frameRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group
      position={[x, 0, -9]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        onEnter();
      }}
    >
      <pointLight ref={glowRef} position={[0, 1.6, 0.6]} color={config.colors.accent} distance={6} />

      <mesh ref={frameRef} position={[0, 1.55, 0]} castShadow>
        <boxGeometry args={[1.7, 3.1, 0.12]} />
        <meshStandardMaterial
          color="#111117"
          emissive={config.colors.core}
          emissiveIntensity={hovered ? 0.9 : 0.45}
          roughness={0.35}
          metalness={0.4}
        />
      </mesh>

      <mesh position={[0, 1.55, 0.07]}>
        <planeGeometry args={[1.4, 2.8]} />
        <meshBasicMaterial color={config.colors.accent} transparent opacity={hovered ? 0.5 : 0.28} />
      </mesh>

      <Text
        position={[0, 3.25, 0.1]}
        fontSize={0.22}
        color={config.colors.accent}
        anchorX="center"
        anchorY="middle"
      >
        {config.doorLabel}
      </Text>
      <Text
        position={[0, 2.95, 0.1]}
        fontSize={0.14}
        color="#d8d6e6"
        anchorX="center"
        anchorY="middle"
      >
        {config.label}
      </Text>

      <mesh position={[0, -0.02, 0.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.2, 1.4]} />
        <meshBasicMaterial color={config.colors.accent} transparent opacity={hovered ? 0.18 : 0.08} />
      </mesh>
    </group>
  );
}
