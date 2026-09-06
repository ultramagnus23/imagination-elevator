import type { ReactNode } from "react";

/** One of the three 8-second phases inside a scene's zoom cycle. */
export interface ZoomPhase {
  /** Short caption shown as the center-aligned overlay while this phase is active. */
  caption: string;
}

export interface FloorTwoScene {
  id: string;
  index: number;
  /** Person's name, shown as a small kicker above the scene title. */
  person: string;
  /** One-line framing of what this scene is about. */
  kicker: string;
  phases: [ZoomPhase, ZoomPhase, ZoomPhase];
  /** The capstone line shown over the portrait beat at the end of the scene. */
  finalCaption: string;
  palette: {
    /** Deep background base for this scene. */
    bg: string;
    /** Secondary background tone (for gradients). */
    bgAlt: string;
    /** Primary accent — text, glows, line art. */
    accent: string;
    /** Softer accent for secondary art elements. */
    accentSoft: string;
  };
  /** Renders the three crossfading art layers + capstone monogram for this scene. */
  art: (progress: import("framer-motion").MotionValue<number>) => ReactNode;
}
