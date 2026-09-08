"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useElevatorStore } from "@/lib/store";
import { UNIVERSES } from "@/lib/universes";
import MilestoneText from "./MilestoneText";
import { UniverseId, UNIVERSE_ORDER } from "@/lib/types";

function SoundToggle() {
  const soundOn = useElevatorStore((s) => s.soundOn);
  const toggleSound = useElevatorStore((s) => s.toggleSound);
  return (
    <button
      onClick={toggleSound}
      aria-label={soundOn ? "Mute sound" : "Unmute sound"}
      className="pointer-events-auto rounded-full border border-mist/20 px-3 py-1.5 font-sans text-[11px] tracking-hud text-mist/60 transition-colors hover:border-mist/50 hover:text-mist"
    >
      {soundOn ? "SOUND ON" : "SOUND OFF"}
    </button>
  );
}

function HallwayHint() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-8 flex justify-center">
      <p className="font-sans text-xs tracking-hud text-mist/45">
        CHOOSE A DOOR
      </p>
    </div>
  );
}

function UniverseChrome({ id }: { id: UniverseId }) {
  const milestoneIndex = useElevatorStore((s) => s.milestoneIndex);
  const showingClosing = useElevatorStore((s) => s.showingClosing);
  const next = useElevatorStore((s) => s.next);
  const prev = useElevatorStore((s) => s.prev);
  const jumpTo = useElevatorStore((s) => s.jumpTo);
  const exitToHallway = useElevatorStore((s) => s.exitToHallway);
  const enterDoor = useElevatorStore((s) => s.enterDoor);
  const goFinale = useElevatorStore((s) => s.goFinale);

  const config = UNIVERSES[id];
  const milestone = config.milestones[milestoneIndex];
  const isLast = milestoneIndex === config.milestones.length - 1;
  const orderIndex = UNIVERSE_ORDER.indexOf(id);
  const nextUniverse = UNIVERSE_ORDER[orderIndex + 1];

  return (
    <>
      {/* Top bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-6">
        <button
          onClick={exitToHallway}
          className="pointer-events-auto font-sans text-xs tracking-hud text-mist/60 transition-colors hover:text-mist"
        >
          ← HALLWAY
        </button>
        <div className="flex items-center gap-3">
          <p className="font-sans text-xs tracking-hud text-mist/45">
            {config.doorLabel.toUpperCase()} · {config.label.toUpperCase()}
          </p>
          <SoundToggle />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {showingClosing ? (
          <motion.div
            key="closing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          >
            <p className="max-w-xl font-display text-xl font-medium leading-relaxed text-mist sm:text-3xl">
              {config.closingLine}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={exitToHallway}
                className="pointer-events-auto rounded-full border border-mist/25 px-6 py-2.5 font-sans text-xs tracking-hud text-mist transition-colors hover:border-mist/60"
              >
                RETURN TO HALLWAY
              </button>
              {nextUniverse && (
                <button
                  onClick={() => enterDoor(nextUniverse)}
                  className="pointer-events-auto rounded-full border border-mist/25 px-6 py-2.5 font-sans text-xs tracking-hud text-mist transition-colors hover:border-mist/60"
                  style={{ borderColor: UNIVERSES[nextUniverse].colors.accent }}
                >
                  ENTER {UNIVERSES[nextUniverse].doorLabel.toUpperCase()}
                </button>
              )}
              {id === "universe-3" && (
                <button
                  onClick={goFinale}
                  className="pointer-events-auto rounded-full px-6 py-2.5 font-sans text-xs tracking-hud text-void transition-transform duration-300 ease-out-expo hover:scale-105"
                  style={{ background: config.colors.accent }}
                >
                  SEE THE CONVERGENCE
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="milestone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-x-0 bottom-0 flex flex-col gap-6 p-6 sm:p-10"
          >
            <MilestoneText
              milestone={milestone}
              index={milestoneIndex}
              accent={config.colors.accent}
            />

            <div className="flex items-center gap-6">
              <button
                onClick={prev}
                disabled={milestoneIndex === 0}
                className="pointer-events-auto font-sans text-xs tracking-hud text-mist/60 transition-colors hover:text-mist disabled:opacity-25 disabled:hover:text-mist/60"
                aria-label="Previous milestone"
              >
                ← BACK
              </button>

              <div className="flex items-center gap-2">
                {config.milestones.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => jumpTo(i)}
                    aria-label={`Go to milestone ${i + 1}`}
                    className="pointer-events-auto h-1.5 rounded-full transition-all duration-300 ease-out-expo"
                    style={{
                      width: i === milestoneIndex ? "1.5rem" : "0.4rem",
                      background:
                        i === milestoneIndex
                          ? config.colors.accent
                          : "oklch(82% 0.01 260 / 0.25)",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="pointer-events-auto font-sans text-xs tracking-hud text-mist/60 transition-colors hover:text-mist"
                aria-label={isLast ? "Finish timeline" : "Next milestone"}
              >
                {isLast ? "REFLECT →" : "NEXT →"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function FinaleChrome() {
  const restart = useElevatorStore((s) => s.restart);
  const exitToHallway = useElevatorStore((s) => s.exitToHallway);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-end p-10 text-center">
      <p className="max-w-2xl font-display text-xl font-medium leading-relaxed text-mist sm:text-3xl">
        {UNIVERSES["universe-3"].closingLine}
      </p>
      <p className="mt-4 max-w-md font-sans text-xs leading-relaxed text-mist/50">
        Grey and beautiful, cold and correct, or glowing and alive — the
        brightest room in the building was always the one with both doors
        open.
      </p>
      <div className="mt-8 flex gap-4">
        <button
          onClick={exitToHallway}
          className="pointer-events-auto rounded-full border border-mist/25 px-6 py-2.5 font-sans text-xs tracking-hud text-mist transition-colors hover:border-mist/60"
        >
          BACK TO HALLWAY
        </button>
        <button
          onClick={restart}
          className="pointer-events-auto rounded-full border border-mist/25 px-6 py-2.5 font-sans text-xs tracking-hud text-mist transition-colors hover:border-mist/60"
        >
          RESTART
        </button>
      </div>
    </div>
  );
}

export default function Overlay() {
  const scene = useElevatorStore((s) => s.scene);

  if (scene === "intro") return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {scene === "hallway" && (
        <>
          <HallwayHint />
          <div className="pointer-events-none absolute right-6 top-6">
            <SoundToggle />
          </div>
        </>
      )}
      {(scene === "universe-1" ||
        scene === "universe-2" ||
        scene === "universe-3") && <UniverseChrome id={scene} />}
      {scene === "finale" && <FinaleChrome />}
    </div>
  );
}
