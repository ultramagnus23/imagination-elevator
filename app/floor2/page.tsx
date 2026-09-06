import type { Metadata } from "next";
import FloorTwoExperience from "@/components/floor2/FloorTwoExperience";

export const metadata: Metadata = {
  title: "Floor 2 — The Zoom Effect",
  description:
    "Five inventors, one repeating move: zoom in, zoom out to see the whole system, zoom back in with the answer. A scroll-driven creativity framework.",
};

export default function Floor2Page() {
  return <FloorTwoExperience />;
}
