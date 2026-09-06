"use client";

/** A shelf of leaning textbooks — deterministic pseudo-random per seed so
 * server/client render the same layout. */
export default function BookStack({
  position,
  rotationY = 0,
  colors,
  seed = 1,
  scale = 1,
}: {
  position: [number, number, number];
  rotationY?: number;
  colors: { core: string; accent: string; fade: string };
  seed?: number;
  scale?: number;
}) {
  const rand = (n: number) => {
    const x = Math.sin(seed * 71.3 + n * 13.7) * 10000;
    return x - Math.floor(x);
  };

  const count = 9;
  const shelfWidth = 1.9;
  let cursor = -shelfWidth / 2;
  const books = Array.from({ length: count }).map((_, i) => {
    const width = 0.08 + rand(i) * 0.08;
    const height = 0.5 + rand(i + 20) * 0.35;
    const lean = (rand(i + 40) - 0.5) * 0.2;
    const x = cursor + width / 2;
    cursor += width + 0.01;
    const shade = rand(i + 60);
    const color = shade > 0.6 ? colors.accent : shade > 0.3 ? colors.fade : colors.core;
    return { x, width, height, lean, color };
  });

  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {/* shelf plank */}
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <boxGeometry args={[shelfWidth + 0.1, 0.04, 0.32]} />
        <meshStandardMaterial color="#241d14" roughness={0.6} />
      </mesh>
      {/* support brackets */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * (shelfWidth / 2), -0.15, 0.12]}>
          <boxGeometry args={[0.04, 0.35, 0.04]} />
          <meshStandardMaterial color="#1a1510" roughness={0.6} />
        </mesh>
      ))}

      {books.map((b, i) => (
        <mesh
          key={i}
          position={[b.x, 0.04 + b.height / 2, 0]}
          rotation={[0, 0, b.lean]}
          castShadow
        >
          <boxGeometry args={[b.width, b.height, 0.24]} />
          <meshStandardMaterial color={b.color} roughness={0.55} metalness={0.05} />
        </mesh>
      ))}

      <pointLight position={[0, 1, 0.4]} color={colors.accent} intensity={0.7} distance={3.5} decay={2} />
    </group>
  );
}
