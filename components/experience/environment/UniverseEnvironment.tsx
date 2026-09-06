"use client";

import { ParticleTheme } from "@/lib/types";
import Piano from "./Piano";
import GraphWall from "./GraphWall";
import BookStack from "./BookStack";

/** Persistent set-dressing lining the walkway — the "place" each universe
 * actually happens in, instead of an empty glowing hallway with symbols
 * floating in the air. Placed a few times along the walkway's length, one
 * side or the other, so the whole walk stays populated, not just the
 * platforms themselves. */
export default function UniverseEnvironment({
  theme,
  colors,
  walkwayLength,
}: {
  theme: ParticleTheme;
  colors: { core: string; accent: string; fade: string };
  walkwayLength: number;
}) {
  // z runs from 0 (start) to -walkwayLength (far end).
  const stops = [-4, -walkwayLength * 0.35, -walkwayLength * 0.62, -walkwayLength * 0.88];

  // Offset far enough that the pieces flank the centered milestone text
  // instead of sitting behind/inside it, and angled inward so they still
  // read clearly from the walkway's centerline.
  const SIDE = 6.4;

  if (theme === "music") {
    return (
      <>
        <Piano position={[-SIDE, 0, stops[0]]} rotationY={0.7} colors={colors} />
        <Piano position={[SIDE, 0, stops[1]]} rotationY={-0.7} colors={colors} scale={0.9} />
        <Piano position={[-SIDE, 0, stops[2]]} rotationY={0.7} colors={colors} scale={1.1} />
        <Piano position={[SIDE, 0, stops[3]]} rotationY={-0.6} colors={colors} />
      </>
    );
  }

  if (theme === "economics") {
    return (
      <>
        <BookStack position={[-SIDE, 1.1, stops[0]]} rotationY={0.7} colors={colors} seed={2} />
        <GraphWall position={[SIDE + 0.1, 0, stops[1]]} rotationY={-0.8} colors={colors} />
        <GraphWall position={[-SIDE - 0.1, 0, stops[2]]} rotationY={0.8} colors={colors} scale={1.15} />
        <BookStack position={[SIDE, 1.1, stops[3]]} rotationY={-0.7} colors={colors} seed={5} />
      </>
    );
  }

  // merged universe — both, side by side, as the milestone copy describes.
  return (
    <>
      <Piano position={[-SIDE, 0, stops[0]]} rotationY={0.7} colors={colors} />
      <BookStack position={[SIDE, 1.1, stops[0] + 1.5]} rotationY={-0.7} colors={colors} seed={3} />
      <GraphWall position={[SIDE + 0.1, 0, stops[1]]} rotationY={-0.8} colors={colors} />
      <Piano position={[-SIDE, 0, stops[2]]} rotationY={0.7} colors={colors} scale={1.05} />
      <BookStack position={[-SIDE, 1.1, stops[3]]} rotationY={0.7} colors={colors} seed={7} />
      <GraphWall position={[SIDE + 0.1, 0, stops[3] - 1.5]} rotationY={-0.8} colors={colors} scale={0.95} />
    </>
  );
}
