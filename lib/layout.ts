export const MILESTONE_SPACING = 9;

/** World-space Z of the platform for a given milestone index (0-based). */
export function milestoneZ(index: number): number {
  return -index * MILESTONE_SPACING;
}
