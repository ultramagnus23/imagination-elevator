"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Milestone } from "@/lib/types";

export default function MilestoneText({
  milestone,
  index,
  accent,
  onLight = false,
}: {
  milestone: Milestone;
  index: number;
  accent: string;
  onLight?: boolean;
}) {
  const ink = onLight ? "text-ink" : "text-mist";

  return (
    <div className="pointer-events-none mx-auto max-w-2xl text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-sans text-xs tracking-hud" style={{ color: accent }}>
            {milestone.age.toUpperCase()}
          </p>
          <h2
            className={`mt-3 font-display text-[clamp(1.8rem,5vw,3.25rem)] font-medium leading-[1.1] tracking-tight ${ink}`}
          >
            {milestone.title}
          </h2>
          <p className={`mt-2 font-sans text-sm italic ${onLight ? "text-ink/50" : "text-mist/50"}`}>
            {milestone.location}
          </p>
          <p
            className={`mx-auto mt-4 max-w-lg font-sans text-base leading-relaxed ${
              onLight ? "text-ink/80" : "text-mist/80"
            }`}
          >
            {milestone.description}
          </p>
          {milestone.cue && (
            <p
              className={`mx-auto mt-4 max-w-md border-t pt-4 font-sans text-sm leading-relaxed ${
                onLight ? "border-ink/15 text-ink/60" : "border-mist/10 text-mist/55"
              }`}
            >
              {milestone.cue}
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
