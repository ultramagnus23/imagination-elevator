"use client";

import * as THREE from "three";
import { UniverseConfig } from "@/lib/types";
import { milestoneZ, MILESTONE_SPACING } from "@/lib/layout";
import MilestonePlatform from "./MilestonePlatform";
import CameraRig from "./CameraRig";

function milestoneFlags(universeId: string, index: number) {
  if (universeId === "universe-1") return { muted: index === 5, moment: false };
  if (universeId === "universe-2") return { muted: index === 5, moment: false };
  return { muted: false, moment: index === 2 };
}

export default function UniverseScene({
  config,
  milestoneIndex,
}: {
  config: UniverseConfig;
  milestoneIndex: number;
}) {
  const count = config.milestones.length;
  const walkwayLength = MILESTONE_SPACING * count + 10;
  const walkwayCenter = milestoneZ(count - 1) / 2;

  return (
    <>
      <color attach="background" args={[config.colors.core]} />
      <fog attach="fog" args={[config.colors.core, 8, 34]} />
      <ambientLight intensity={0.35} color={config.colors.accent} />
      <hemisphereLight
        color={config.colors.accent}
        groundColor={config.colors.core}
        intensity={0.4}
      />

      <mesh position={[0, -0.16, walkwayCenter]} receiveShadow>
        <boxGeometry args={[2.4, 0.06, walkwayLength]} />
        <meshStandardMaterial
          color={config.colors.core}
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {config.milestones.map((_, i) => (
        <MilestonePlatform
          key={i}
          z={milestoneZ(i)}
          active={i === milestoneIndex}
          colors={config.colors}
          particleTheme={config.particleTheme}
          seed={i + 1}
          {...milestoneFlags(config.id, i)}
        />
      ))}

      <CameraRig milestoneIndex={milestoneIndex} />
    </>
  );
}
