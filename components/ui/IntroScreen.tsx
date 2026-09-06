"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { start as startAudio } from "tone";
import { useElevatorStore } from "@/lib/store";

export default function IntroScreen() {
  const begin = useElevatorStore((s) => s.begin);
  const soundOn = useElevatorStore((s) => s.soundOn);
  const toggleSound = useElevatorStore((s) => s.toggleSound);

  const handleBegin = async () => {
    try {
      await startAudio();
    } catch {
      // Audio context can fail to resume on some browsers — the
      // experience still works fully without sound.
    }
    begin();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
      style={{
        background:
          "radial-gradient(circle at 50% 40%, oklch(19% 0.03 275 / 0.6), oklch(9% 0.015 260) 70%)",
      }}
    >
      <p className="mb-4 font-sans text-xs uppercase tracking-hud text-mist/60">
        A walk through three lives that could have been
      </p>
      <h1 className="max-w-2xl font-display text-4xl font-medium leading-tight tracking-tight text-mist sm:text-6xl">
        The Imagination Elevator
      </h1>
      <p className="mt-6 max-w-md font-sans text-sm leading-relaxed text-mist/70">
        Three doors. Three timelines. Walk each one from age five to now,
        then decide which life you actually want to have lived.
      </p>

      <button
        onClick={handleBegin}
        className="mt-10 rounded-full border border-mist/25 px-8 py-3 font-sans text-sm text-mist transition-colors duration-300 ease-out-expo hover:border-mist/60 hover:bg-mist/5"
      >
        Step into the elevator
      </button>

      <button
        onClick={toggleSound}
        className="mt-6 font-sans text-xs text-mist/50 underline decoration-mist/20 underline-offset-4 transition-colors hover:text-mist/80"
      >
        Sound is {soundOn ? "on" : "off"} — tap to {soundOn ? "mute" : "unmute"}
      </button>

      <p className="mt-10 font-sans text-[11px] tracking-hud text-mist/35">
        DRAG TO LOOK · SCROLL TO WALK A TIMELINE · CLICK A DOOR TO ENTER
      </p>

      <Link
        href="/floor2"
        className="mt-6 font-sans text-xs text-mist/40 underline decoration-mist/15 underline-offset-4 transition-colors hover:text-mist/70"
      >
        Floor 2: The Zoom Effect →
      </Link>
    </motion.div>
  );
}
