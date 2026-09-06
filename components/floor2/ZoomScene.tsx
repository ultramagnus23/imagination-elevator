"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { FloorTwoScene } from "@/lib/floor2/types";
import { P1_END, P2_END, P3_END } from "@/lib/floor2/constants";

export default function ZoomScene({
  scene,
  isLast,
}: {
  scene: FloorTwoScene;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // The "camera" — one continuous scale value driving the zoom in → out → in.
  const scale = useTransform(
    scrollYProgress,
    [0, P1_END, P2_END, P3_END, 1],
    [1.3, 2.6, 0.55, 1.55, 1.55]
  );

  const capstoneOpacity = useTransform(
    scrollYProgress,
    [P3_END - 0.03, P3_END + 0.03, 1],
    [0, 1, 1]
  );

  const captionAOpacity = useTransform(scrollYProgress, [0.02, 0.08, P1_END - 0.08, P1_END - 0.02], [0, 1, 1, 0]);
  const captionBOpacity = useTransform(scrollYProgress, [P1_END, P1_END + 0.06, P2_END - 0.08, P2_END - 0.02], [0, 1, 1, 0]);
  const captionCOpacity = useTransform(scrollYProgress, [P2_END, P2_END + 0.06, P3_END - 0.1, P3_END - 0.04], [0, 1, 1, 0]);

  // A soft "brightening" wash for the zoom-out beat ("Lighting: expands, brightens").
  const washOpacity = useTransform(scrollYProgress, [P1_END, (P1_END + P2_END) / 2, P2_END], [0, 0.55, 0]);
  const washScale = useTransform(scrollYProgress, [P1_END, P2_END], [0.6, 2.2]);

  const [phase1, phase2, phase3] = scene.phases;

  return (
    <section
      ref={ref}
      id={scene.id}
      aria-label={`${scene.person} — ${scene.kicker}`}
      style={{ height: isLast ? "460vh" : "420vh", position: "relative" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100dvh",
          width: "100%",
          overflow: "hidden",
          background: `radial-gradient(120% 100% at 50% 40%, ${scene.palette.bgAlt}, ${scene.palette.bg} 70%)`,
        }}
      >
        {/* brightening wash for the zoom-out phase */}
        <motion.div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            opacity: washOpacity,
            pointerEvents: "none",
          }}
        >
          <motion.div
            style={{
              width: "140vmax",
              height: "140vmax",
              borderRadius: "9999px",
              scale: washScale,
              background: `radial-gradient(circle, ${scene.palette.accentSoft} 0%, transparent 62%)`,
            }}
          />
        </motion.div>

        {/* the camera stage */}
        <motion.div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            scale,
          }}
        >
          <div style={{ position: "relative", width: "min(70vh, 70vw)", height: "min(70vh, 70vw)" }}>
            {scene.art(scrollYProgress)}
          </div>
        </motion.div>

        {/* phase captions */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            padding: "0 6vw",
            pointerEvents: "none",
          }}
        >
          <motion.p
            className="font-display text-center text-[clamp(1.6rem,4.4vw,3.2rem)] font-medium leading-tight"
            style={{ opacity: captionAOpacity, color: scene.palette.accent, position: "absolute" }}
          >
            {phase1.caption}
          </motion.p>
          <motion.p
            className="font-display text-center text-[clamp(1.6rem,4.4vw,3.2rem)] font-medium leading-tight"
            style={{ opacity: captionBOpacity, color: scene.palette.accent, position: "absolute" }}
          >
            {phase2.caption}
          </motion.p>
          <motion.p
            className="font-display text-center text-[clamp(1.4rem,3.6vw,2.6rem)] font-medium leading-tight"
            style={{ opacity: captionCOpacity, color: scene.palette.accent, position: "absolute", maxWidth: "26ch" }}
          >
            {phase3.caption}
          </motion.p>
        </div>

        {/* capstone: portrait monogram + final line */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.25rem",
            opacity: capstoneOpacity,
            background: scene.palette.bg,
          }}
        >
          <div
            style={{
              width: "clamp(88px, 14vw, 132px)",
              height: "clamp(88px, 14vw, 132px)",
              borderRadius: "9999px",
              border: `1px solid ${scene.palette.accent}`,
              display: "grid",
              placeItems: "center",
              boxShadow: `0 0 60px -12px ${scene.palette.accentSoft}`,
            }}
          >
            <span
              className="font-display"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: scene.palette.accent }}
            >
              {scene.person
                .split(" ")
                .map((w) => w[0])
                .join("")}
            </span>
          </div>
          <p className="font-sans text-sm tracking-hud" style={{ color: scene.palette.accent, opacity: 0.7 }}>
            {scene.person.toUpperCase()}
          </p>
          <p
            className="font-display text-center text-[clamp(1.4rem,3vw,2rem)] italic"
            style={{ color: scene.palette.accent, maxWidth: "22ch" }}
          >
            &ldquo;{scene.finalCaption}&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
