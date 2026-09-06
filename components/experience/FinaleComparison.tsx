"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { Group } from "three";

function Orb({
  x,
  color,
  size,
  glow,
  wireframe = false,
}: {
  x: number;
  color: string;
  size: number;
  glow: number;
  wireframe?: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15;
      const pulse = 1 + Math.sin(t * 1.2 + x) * 0.03 * glow;
      meshRef.current.scale.set(pulse, pulse, pulse);
    }
  });
  return (
    <group position={[x, 1.6, 0]}>
      <pointLight color={color} intensity={glow * 5} distance={7} />
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[size, 2]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={glow}
          wireframe={wireframe}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
    </group>
  );
}

export default function FinaleComparison() {
  const groupRef = useRef<Group>(null);

  return (
    <>
      <color attach="background" args={["#e7e4f5"]} />
      <fog attach="fog" args={["#e7e4f5", 10, 30]} />
      <ambientLight intensity={0.6} />
      <hemisphereLight color="#ffffff" groundColor="#cfc9e8" intensity={0.5} />

      <group ref={groupRef}>
        <Orb x={-4} color="#8a8a92" size={0.7} glow={0.3} />
        <Orb x={0} color="#1a1a20" size={0.75} glow={0.25} wireframe />
        <Orb x={4} color="#cfa6e0" size={1} glow={1.1} />
      </group>

      <Sparkles count={60} scale={[10, 3, 4]} position={[4, 1.6, 0]} size={2} speed={0.3} color="#f3e9ff" opacity={0.7} />

      <mesh position={[0, -0.2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[9, 64]} />
        <meshStandardMaterial color="#d9d4ec" roughness={0.8} />
      </mesh>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minAzimuthAngle={-0.6}
        maxAzimuthAngle={0.6}
        minPolarAngle={Math.PI / 2 - 0.3}
        maxPolarAngle={Math.PI / 2 + 0.15}
        target={[0, 1.6, 0]}
      />
    </>
  );
}
