"use client";

import { useMotionValue } from "framer-motion";
import type { FloorTwoScene } from "@/lib/floor2/types";

// Fixed progress values sitting comfortably inside each phase window, used to
// render one representative frame per phase for the no-motion fallback.
const PHASE_SAMPLE = [0.16, 0.47, 0.73] as const;

/** Non-animated stand-in for prefers-reduced-motion: one static frame per phase, no scroll-scrub. */
export default function StaticScene({ scene }: { scene: FloorTwoScene }) {
  return (
    <section
      aria-label={`${scene.person} — ${scene.kicker}`}
      style={{ background: scene.palette.bg, padding: "5rem 6vw" }}
    >
      <h2
        className="text-center font-display text-[clamp(1.6rem,4vw,2.4rem)] font-medium"
        style={{ color: scene.palette.accent }}
      >
        {scene.person}
      </h2>
      <p
        className="mx-auto mt-2 max-w-md text-center font-sans text-sm leading-relaxed"
        style={{ color: scene.palette.accent, opacity: 0.65 }}
      >
        {scene.kicker}
      </p>

      <div
        style={{
          marginTop: "2rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.5rem",
          maxWidth: 1000,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {scene.phases.map((phase, i) => (
          <StaticPanel key={i} scene={scene} caption={phase.caption} sample={PHASE_SAMPLE[i]} />
        ))}
      </div>

      <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
        <p className="font-display text-[clamp(1.2rem,2.6vw,1.6rem)] italic" style={{ color: scene.palette.accent }}>
          &ldquo;{scene.finalCaption}&rdquo;
        </p>
      </div>
    </section>
  );
}

function StaticPanel({
  scene,
  caption,
  sample,
}: {
  scene: FloorTwoScene;
  caption: string;
  sample: number;
}) {
  const progress = useMotionValue(sample);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <div
        style={{
          aspectRatio: "1 / 1",
          borderRadius: 12,
          overflow: "hidden",
          background: scene.palette.bgAlt,
          padding: "1.5rem",
        }}
      >
        {scene.art(progress)}
      </div>
      <p className="text-center font-sans text-sm leading-relaxed" style={{ color: scene.palette.accent, opacity: 0.85 }}>
        {caption}
      </p>
    </div>
  );
}
