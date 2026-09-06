"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { Group } from "three";
import { ParticleTheme } from "@/lib/types";

const GLYPHS: Record<ParticleTheme, string[]> = {
  music: ["♪", "♫", "♩", "♬"],
  economics: ["%", "+", "Σ", "π", "$"],
  merged: ["♪", "♫", "%", "Σ", "♩", "+"],
};

interface Particle {
  glyph: string;
  radius: number;
  angle: number;
  height: number;
  speed: number;
  scale: number;
}

function makeParticles(theme: ParticleTheme, count: number, seed: number): Particle[] {
  const glyphs = GLYPHS[theme];
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    // Cheap deterministic pseudo-random so server/client agree and re-renders are stable.
    const r = (n: number) => {
      const x = Math.sin(seed * 999 + n * 57.13) * 10000;
      return x - Math.floor(x);
    };
    particles.push({
      glyph: glyphs[i % glyphs.length],
      radius: 1.4 + r(i) * 2.2,
      angle: r(i + 10) * Math.PI * 2,
      height: 1.4 + r(i + 20) * 2.6,
      speed: 0.15 + r(i + 30) * 0.25,
      scale: 0.35 + r(i + 40) * 0.35,
    });
  }
  return particles;
}

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
  const particles = useMemo(() => makeParticles(theme, count, seed), [theme, count, seed]);
  const activeColor = muted ? mutedColor ?? "#9a9a9e" : color;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const group = groupRef.current;
    if (!group) return;
    group.children.forEach((child, i) => {
      const p = particles[i];
      if (!p) return;
      const angle = p.angle + t * p.speed;
      child.position.set(
        Math.cos(angle) * p.radius,
        p.height + Math.sin(t * p.speed * 2 + i) * 0.25,
        Math.sin(angle) * p.radius
      );
      child.rotation.y = -angle;
    });
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <Text
          key={i}
          fontSize={p.scale}
          color={activeColor}
          anchorX="center"
          anchorY="middle"
          fillOpacity={muted ? 0.5 : 0.85}
        >
          {p.glyph}
        </Text>
      ))}
    </group>
  );
}
