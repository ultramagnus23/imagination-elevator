"use client";

import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useElevatorStore } from "@/lib/store";
import { UNIVERSES } from "@/lib/universes";
import Hallway from "./Hallway";
import UniverseScene from "./UniverseScene";
import FinaleComparison from "./FinaleComparison";
import Overlay from "@/components/ui/Overlay";
import IntroScreen from "@/components/ui/IntroScreen";
import AudioEngine from "@/components/audio/AudioEngine";

function KeyboardNav() {
  const scene = useElevatorStore((s) => s.scene);
  const next = useElevatorStore((s) => s.next);
  const prev = useElevatorStore((s) => s.prev);
  const exitToHallway = useElevatorStore((s) => s.exitToHallway);

  useEffect(() => {
    const isUniverse =
      scene === "universe-1" || scene === "universe-2" || scene === "universe-3";

    function onKeyDown(e: KeyboardEvent) {
      if (!isUniverse && scene !== "finale") return;
      if (e.key === "Escape") {
        exitToHallway();
        return;
      }
      if (!isUniverse) return;
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [scene, next, prev, exitToHallway]);

  return null;
}

export default function Experience() {
  const scene = useElevatorStore((s) => s.scene);
  const milestoneIndex = useElevatorStore((s) => s.milestoneIndex);
  const enterDoor = useElevatorStore((s) => s.enterDoor);

  const isUniverseScene =
    scene === "universe-1" || scene === "universe-2" || scene === "universe-3";

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 1.6, 2], fov: 55, near: 0.1, far: 60 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          {(scene === "intro" || scene === "hallway") && (
            <Hallway onEnterDoor={enterDoor} />
          )}
          {isUniverseScene && (
            <UniverseScene config={UNIVERSES[scene]} milestoneIndex={milestoneIndex} />
          )}
          {scene === "finale" && <FinaleComparison />}
        </Suspense>
      </Canvas>

      {scene === "intro" && <IntroScreen />}
      <Overlay />
      <KeyboardNav />
      <AudioEngine />
    </div>
  );
}
