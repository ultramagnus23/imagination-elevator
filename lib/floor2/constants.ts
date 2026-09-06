// Phase boundaries as fractions of a scene's total scroll length, matching
// the brief's 3s / 2s / 3s split of each 8-second scene (0.375 / 0.625),
// pulled in slightly to leave room for crossfades, plus a final capstone beat.
// Shared between ZoomScene (captions/camera) and the per-scene art layers so
// everything crossfades in lockstep.
export const P1_END = 0.34;
export const P2_END = 0.6;
export const P3_END = 0.86;
