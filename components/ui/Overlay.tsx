"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useElevatorStore } from "@/lib/store";
import { UNIVERSES } from "@/lib/universes";
import MilestoneText from "./MilestoneText";
import { UniverseId, UNIVERSE_ORDER, isLightScene } from "@/lib/types";

function SoundToggle({ onLight = false }: { onLight?: boolean }) {
  const soundOn = useElevatorStore((s) => s.soundOn);
  const toggleSound = useElevatorStore((s) => s.toggleSound);
  return (
    <button
      onClick={toggleSound}
      aria-label={soundOn ? "Mute sound" : "Unmute sound"}
      className={`pointer-events-auto rounded-full border px-3 py-1.5 font-sans text-[11px] tracking-hud transition-colors ${
        onLight
          ? "border-ink/20 text-ink/60 hover:border-ink/50 hover:text-ink"
          : "border-mist/20 text-mist/60 hover:border-mist/50 hover:text-mist"
      }`}
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
  const onLight = isLightScene(id);
  const ink = onLight ? "text-ink" : "text-mist";

  return (
    <>
      {/* Top bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-6">
        <button
          onClick={exitToHallway}
          className={`pointer-events-auto font-sans text-xs tracking-hud transition-colors ${
            onLight ? "text-ink/60 hover:text-ink" : "text-mist/60 hover:text-mist"
          }`}
        >
          ← HALLWAY
        </button>
        <div className="flex items-center gap-3">
          <p className={`font-sans text-xs tracking-hud ${onLight ? "text-ink/45" : "text-mist/45"}`}>
            {config.doorLabel.toUpperCase()} · {config.label.toUpperCase()}
          </p>
          <SoundToggle onLight={onLight} />
        </div>
      </div>

      {/* Scroll-to-advance hint, shown only on the first milestone */}
      {!showingClosing && milestoneIndex === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className={`pointer-events-none absolute inset-x-0 bottom-6 text-center font-sans text-xs tracking-hud ${
            onLight ? "text-ink/40" : "text-mist/40"
          }`}
        >
          SCROLL TO WALK THE TIMELINE
        </motion.p>
      )}

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
            <p className={`max-w-xl font-display text-2xl font-medium leading-relaxed tracking-tight sm:text-4xl ${ink}`}>
              {config.closingLine}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={exitToHallway}
                className={`pointer-events-auto rounded-full border px-6 py-2.5 font-sans text-xs tracking-hud transition-colors ${
                  onLight ? "border-ink/25 text-ink hover:border-ink/60" : "border-mist/25 text-mist hover:border-mist/60"
                }`}
              >
                RETURN TO HALLWAY
              </button>
              {nextUniverse && (
                <button
                  onClick={() => enterDoor(nextUniverse)}
                  className={`pointer-events-auto rounded-full border px-6 py-2.5 font-sans text-xs tracking-hud transition-colors ${
                    onLight ? "text-ink hover:border-ink/60" : "text-mist hover:border-mist/60"
                  }`}
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
            className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-6"
          >
            {/* Legibility scrim behind the centered text — permitted where
                legibility needs it, per the design system's own rule. */}
            <div
              className="pointer-events-none absolute inset-x-0 top-1/2 h-[70vh] -translate-y-1/2"
              style={{
                background: onLight
                  ? "radial-gradient(60% 60% at 50% 50%, oklch(93% 0.015 250 / 0.55), transparent 72%)"
                  : "radial-gradient(60% 60% at 50% 50%, oklch(9% 0.015 260 / 0.55), transparent 72%)",
              }}
            />

            <MilestoneText
              milestone={milestone}
              index={milestoneIndex}
              accent={config.colors.accent}
              onLight={onLight}
            />

            <div className="relative flex items-center gap-6">
              <button
                onClick={prev}
                disabled={milestoneIndex === 0}
                className={`pointer-events-auto font-sans text-xs tracking-hud transition-colors disabled:opacity-25 ${
                  onLight ? "text-ink/60 hover:text-ink disabled:hover:text-ink/60" : "text-mist/60 hover:text-mist disabled:hover:text-mist/60"
                }`}
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
                          : onLight
                            ? "oklch(17% 0.02 275 / 0.2)"
                            : "oklch(82% 0.01 260 / 0.25)",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className={`pointer-events-auto font-sans text-xs tracking-hud transition-colors ${
                  onLight ? "text-ink/60 hover:text-ink" : "text-mist/60 hover:text-mist"
                }`}
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
      <p className="max-w-2xl font-display text-2xl font-medium leading-relaxed tracking-tight text-ink sm:text-4xl">
        {UNIVERSES["universe-3"].closingLine}
      </p>
      <p className="mt-4 max-w-md font-sans text-xs leading-relaxed text-ink/50">
        Grey and beautiful, cold and correct, or glowing and alive — the
        brightest room in the building was always the one with both doors
        open.
      </p>
      <div className="mt-8 flex gap-4">
        <button
          onClick={exitToHallway}
          className="pointer-events-auto rounded-full border border-ink/25 px-6 py-2.5 font-sans text-xs tracking-hud text-ink transition-colors hover:border-ink/60"
        >
          BACK TO HALLWAY
        </button>
        <button
          onClick={restart}
          className="pointer-events-auto rounded-full border border-ink/25 px-6 py-2.5 font-sans text-xs tracking-hud text-ink transition-colors hover:border-ink/60"
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
