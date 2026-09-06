"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FLOOR_TWO_SCENES } from "@/lib/floor2/scenes";

export default function EndCard() {
  return (
    <section
      aria-label="The Zoom Cycle — summary"
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2.5rem",
        padding: "9rem 6vw 6rem",
        background: "oklch(9% 0.015 260)",
        textAlign: "center",
      }}
    >
      <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", justifyContent: "center", maxWidth: 640 }}>
        {FLOOR_TWO_SCENES.map((scene, i) => (
          <motion.div
            key={scene.id}
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear", delay: i * -3 }}
            style={{
              width: "clamp(56px, 9vw, 84px)",
              height: "clamp(56px, 9vw, 84px)",
              borderRadius: "9999px",
              border: `1px solid ${scene.palette.accent}`,
              display: "grid",
              placeItems: "center",
              background: scene.palette.bg,
            }}
          >
            <span
              className="font-display"
              style={{
                fontSize: "clamp(0.95rem, 1.8vw, 1.4rem)",
                color: scene.palette.accent,
                transform: "rotate(0deg)",
              }}
            >
              {scene.person
                .split(" ")
                .map((w) => w[0])
                .join("")}
            </span>
          </motion.div>
        ))}
      </div>

      <div>
        <h2 className="font-display text-[clamp(1.8rem,5vw,3.5rem)] font-medium text-mist">
          THE ZOOM CYCLE
        </h2>
        <p className="mt-2 font-display text-[clamp(1.4rem,3.4vw,2.2rem)] italic text-mist/80">
          In → Out → In
        </p>
        <p className="mx-auto mt-6 max-w-md font-sans text-sm leading-relaxed text-mist/60">
          Five inventors, one repeating move: zoom into a tiny detail, zoom out to see the
          whole system it belongs to, then zoom back in — somewhere new — with the answer.
        </p>
      </div>

      <Link
        href="/"
        className="rounded-full border border-mist/25 px-6 py-2.5 font-sans text-sm text-mist transition-colors duration-300 hover:border-mist/60 hover:bg-mist/5"
      >
        ← Back to the elevator
      </Link>
    </section>
  );
}
