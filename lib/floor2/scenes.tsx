import type { FloorTwoScene } from "./types";
import {
  DellArt,
  MarsArt,
  EdisonArt,
  HullArt,
  HazanaviciusArt,
} from "@/components/floor2/SceneArt";

export const FLOOR_TWO_SCENES: FloorTwoScene[] = [
  {
    id: "dell",
    index: 1,
    person: "Michael Dell",
    kicker: "Zoomed in on the component, out to the whole industry, back in on the customer.",
    phases: [
      { caption: "Michael Dell zoomed IN." },
      { caption: "He zoomed OUT." },
      { caption: "He zoomed IN again: custom computers, sold direct by mail order." },
    ],
    finalCaption: "Direct-sale model",
    palette: {
      bg: "oklch(16% 0.03 250)",
      bgAlt: "oklch(24% 0.05 245)",
      accent: "oklch(88% 0.08 220)",
      accentSoft: "oklch(55% 0.13 220 / 0.45)",
    },
    art: (progress) => <DellArt progress={progress} accent="oklch(88% 0.08 220)" accentSoft="oklch(55% 0.13 220 / 0.45)" />,
  },
  {
    id: "mars",
    index: 2,
    person: "Forrest Mars",
    kicker: "Zoomed in on a candy, out across an ocean, back in on a new home for it.",
    phases: [
      { caption: "Forrest Mars zoomed IN." },
      { caption: "He zoomed OUT geographically." },
      { caption: "He zoomed IN again: M&M's, made and sold in America." },
    ],
    finalCaption: "Transplanted to a new location",
    palette: {
      bg: "oklch(19% 0.04 45)",
      bgAlt: "oklch(28% 0.07 50)",
      accent: "oklch(82% 0.13 60)",
      accentSoft: "oklch(60% 0.16 35 / 0.5)",
    },
    art: (progress) => <MarsArt progress={progress} accent="oklch(82% 0.13 60)" accentSoft="oklch(60% 0.16 35 / 0.5)" />,
  },
  {
    id: "edison",
    index: 3,
    person: "Thomas Edison",
    kicker: "Zoomed in on a filament, out to a whole grid, back in on one lit home.",
    phases: [
      { caption: "Edison zoomed IN." },
      { caption: "He zoomed OUT to the entire system." },
      { caption: "He zoomed IN again: affordable lighting for every home." },
    ],
    finalCaption: "Power distribution system",
    palette: {
      bg: "oklch(14% 0.02 45)",
      bgAlt: "oklch(21% 0.06 55)",
      accent: "oklch(83% 0.16 65)",
      accentSoft: "oklch(65% 0.19 45 / 0.5)",
    },
    art: (progress) => <EdisonArt progress={progress} accent="oklch(83% 0.16 65)" accentSoft="oklch(65% 0.19 45 / 0.5)" />,
  },
  {
    id: "hull",
    index: 4,
    person: "Chuck Hull",
    kicker: "Zoomed in on curing resin, out to an unrelated machine, back in on a printed object.",
    phases: [
      { caption: "Chuck Hull zoomed IN." },
      { caption: "He zoomed OUT to an unrelated field." },
      { caption: "He zoomed IN again: 3D printing, one layer at a time." },
    ],
    finalCaption: "Adapted inkjet to a new purpose",
    palette: {
      bg: "oklch(16% 0.03 300)",
      bgAlt: "oklch(24% 0.07 290)",
      accent: "oklch(82% 0.12 300)",
      accentSoft: "oklch(58% 0.15 260 / 0.5)",
    },
    art: (progress) => <HullArt progress={progress} accent="oklch(82% 0.12 300)" accentSoft="oklch(58% 0.15 260 / 0.5)" />,
  },
  {
    id: "hazanavicius",
    index: 5,
    person: "Michel Hazanavicius",
    kicker: "Zoomed in on modern cinema, out through a century of film, back in on silence.",
    phases: [
      { caption: "Hazanavicius zoomed IN on modern cinema." },
      { caption: "He zoomed OUT in time." },
      { caption: "He zoomed IN again: a silent film for a modern audience." },
    ],
    finalCaption: "Revival through subtraction",
    palette: {
      bg: "oklch(10% 0 0)",
      bgAlt: "oklch(22% 0 0)",
      accent: "oklch(94% 0 0)",
      accentSoft: "oklch(55% 0 0 / 0.4)",
    },
    art: (progress) => <HazanaviciusArt progress={progress} accent="oklch(94% 0 0)" accentSoft="oklch(55% 0 0 / 0.4)" />,
  },
];
