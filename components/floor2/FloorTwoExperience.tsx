"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FLOOR_TWO_SCENES } from "@/lib/floor2/scenes";
import ZoomScene from "./ZoomScene";
import StaticScene from "./StaticScene";
import EndCard from "./EndCard";
import { useReducedMotion } from "@/lib/floor2/useReducedMotion";

export default function FloorTwoExperience() {
  const reduced = useReducedMotion();

  return (
    <main style={{ background: "oklch(9% 0.015 260)" }}>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 30,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.25rem clamp(1rem, 4vw, 2.5rem)",
          pointerEvents: "none",
          background: "linear-gradient(to bottom, oklch(9% 0.015 260 / 0.85), transparent)",
        }}
      >
        <Link
          href="/"
          className="font-sans text-xs tracking-hud text-mist/60 transition-colors hover:text-mist"
          style={{ pointerEvents: "auto" }}
        >
          ← THE IMAGINATION ELEVATOR
        </Link>
        <span className="font-sans text-xs tracking-hud text-mist/40">FLOOR 2 · THE ZOOM EFFECT</span>
      </header>

      {/* Hero */}
      <section
        style={{
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 6vw",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(2.2rem,7vw,5rem)] font-medium leading-[1.05] text-mist"
        >
          The Zoom Effect
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-xl font-sans text-sm leading-relaxed text-mist/65 sm:text-base"
        >
          Five inventors who solved a problem by zooming into a tiny detail, zooming out to
          see the whole system around it, then zooming back in — somewhere new — with the
          answer. {reduced ? "Read each scene below." : "Scroll to fly through each one."}
        </motion.p>
        {!reduced && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-14 font-sans text-xs tracking-hud text-mist/40"
          >
            SCROLL ↓
          </motion.div>
        )}
      </section>

      {reduced
        ? FLOOR_TWO_SCENES.map((scene) => <StaticScene key={scene.id} scene={scene} />)
        : FLOOR_TWO_SCENES.map((scene, i) => (
            <ZoomScene key={scene.id} scene={scene} isLast={i === FLOOR_TWO_SCENES.length - 1} />
          ))}

      <EndCard />
    </main>
  );
}
