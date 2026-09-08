"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Milestone } from "@/lib/types";

export default function MilestoneText({
  milestone,
  index,
  accent,
}: {
  milestone: Milestone;
  index: number;
  accent: string;
}) {
  return (
    <div className="pointer-events-none max-w-xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="font-sans text-xs tracking-hud"
            style={{ color: accent }}
          >
            {milestone.age.toUpperCase()}
          </p>
          <h2 className="mt-2 font-display text-2xl font-medium text-mist sm:text-3xl">
            {milestone.title}
          </h2>
          <p className="mt-1 font-sans text-xs italic text-mist/50">
            {milestone.location}
          </p>
          <p className="mt-3 font-sans text-sm leading-relaxed text-mist/80">
            {milestone.description}
          </p>
          {milestone.cue && (
            <p
              className="mt-3 border-t border-mist/10 pt-3 font-sans text-xs leading-relaxed text-mist/55"
            >
              {milestone.cue}
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
