"use client";

import { Sparkles, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { UNIVERSE_LIST } from "@/lib/universes";
import { UniverseId } from "@/lib/types";
import Door from "./Door";

export default function Hallway({
  onEnterDoor,
}: {
  onEnterDoor: (id: UniverseId) => void;
}) {
  return (
    <>
      <color attach="background" args={["#0b0c14"]} />
      <fog attach="fog" args={["#0b0c14", 6, 26]} />
      <ambientLight intensity={0.5} color="#c9c6e8" />
      <pointLight position={[0, 3.4, -2]} intensity={2} color="#cfcaf2" distance={10} />
      <pointLight position={[0, 3.4, -9]} intensity={1.5} color="#e8e4ff" distance={14} />

      {/* Floor */}
      <mesh position={[0, 0, -8]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[9, 24]} />
        <meshStandardMaterial color="#14141d" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 3.6, -8]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[9, 24]} />
        <meshStandardMaterial color="#0e0e16" roughness={0.9} />
      </mesh>

      {/* Walls */}
      <mesh position={[-4.5, 1.8, -8]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[24, 3.6]} />
        <meshStandardMaterial color="#16161f" roughness={0.85} />
      </mesh>
      <mesh position={[4.5, 1.8, -8]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[24, 3.6]} />
        <meshStandardMaterial color="#16161f" roughness={0.85} />
      </mesh>

      <Sparkles count={80} scale={[8, 3, 20]} position={[0, 1.6, -8]} size={1.4} speed={0.25} color="#cfcaf2" opacity={0.5} />

      {UNIVERSE_LIST.map((config, i) => (
        <Door
          key={config.id}
          config={config}
          x={(i - 1) * 3.1}
          onEnter={() => onEnterDoor(config.id)}
        />
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minAzimuthAngle={-0.5}
        maxAzimuthAngle={0.5}
        minPolarAngle={Math.PI / 2 - 0.25}
        maxPolarAngle={Math.PI / 2 + 0.18}
        target={[0, 1.5, -8]}
      />
    </>
  );
}
