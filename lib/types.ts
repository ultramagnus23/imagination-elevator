export type SceneId =
  | "intro"
  | "hallway"
  | "universe-1"
  | "universe-2"
  | "universe-3"
  | "finale";

export type UniverseId = "universe-1" | "universe-2" | "universe-3";

export type ParticleTheme = "music" | "economics" | "merged";

export interface Milestone {
  age: string;
  title: string;
  location: string;
  description: string;
  /** Short line shown as a secondary "visual cue" caption, when present. */
  cue?: string;
  /** Set on the last milestone of a universe — the reflective closing line. */
  reflection?: string;
}

export interface UniverseConfig {
  id: UniverseId;
  order: number;
  label: string;
  doorLabel: string;
  /** Three.js hex colors — the render-side pair to the CSS oklch tokens. */
  colors: {
    core: string;
    accent: string;
    fade: string;
  };
  particleTheme: ParticleTheme;
  milestones: Milestone[];
  /** The closing "X = ..." line, shown full-screen after the last milestone. */
  closingLine: string;
}

export const UNIVERSE_ORDER: UniverseId[] = [
  "universe-1",
  "universe-2",
  "universe-3",
];

/** universe-3 and the finale render on a near-white background — everywhere
 * else is glow-on-void. Chrome text/borders switch from `mist` to `ink`
 * here so they stay readable instead of light-on-light. */
export function isLightScene(scene: SceneId): boolean {
  return scene === "universe-3" || scene === "finale";
}
