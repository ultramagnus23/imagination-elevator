import { UniverseConfig } from "./types";

export const UNIVERSES: Record<string, UniverseConfig> = {
  "universe-1": {
    id: "universe-1",
    order: 1,
    label: "Music Only",
    doorLabel: "Universe 1",
    colors: {
      core: "#4b3aa4",
      accent: "#9b8de0",
      fade: "#8a8a92",
    },
    particleTheme: "music",
    milestones: [
      {
        age: "Age 5",
        title: "First Piano Lesson",
        location: "Child's bedroom, a small upright piano",
        description:
          "Small hands find a C-major scale for the first time. Nothing sounds right yet, and none of it needs to.",
      },
      {
        age: "Age 8",
        title: "First Recital",
        location: "A recital stage, one spotlight",
        description:
          "Nervous, focused, and all the way through the piece without stopping. The applause feels enormous.",
      },
      {
        age: "Age 10",
        title: "Daily Practice",
        location: "A practice room papered in sheet music",
        description:
          "Eight hours a day. The clock spins fast when the hands are moving faster than the mind can follow.",
      },
      {
        age: "Age 13",
        title: "First National Competition",
        location: "A competition hall, full house",
        description: "Perfect technique. A win that took a decade to look effortless.",
      },
      {
        age: "Age 18",
        title: "National Ranking",
        location: "A concert hall, hundreds watching",
        description: "A flawless performance, and a name that starts to travel ahead of the person carrying it.",
      },
      {
        age: "Age 20 — Present",
        title: "Excellence. But No Creation.",
        location: "A studio, alone with an instrument",
        description:
          "Playing other people's compositions, beautifully, again. The technique is complete. Nothing new has been made in years.",
        cue: "The notes drifting around the room have gone grey, and they are fading.",
      },
    ],
    closingLine: "X = MUSIC. You zoomed in. You mastered. But you never zoomed out.",
  },
  "universe-2": {
    id: "universe-2",
    order: 2,
    label: "Economics Only",
    doorLabel: "Universe 2",
    colors: {
      core: "#d8ab52",
      accent: "#e8ddc4",
      fade: "#8a8578",
    },
    particleTheme: "economics",
    milestones: [
      {
        age: "Age 12",
        title: "Discovery of Economics",
        location: "The library, a textbook left open too long",
        description: "Eyes wide, the kind of wonder that usually gets spent on something else at twelve.",
      },
      {
        age: "Age 14",
        title: "Understanding Compound Interest",
        location: "A classroom, a whiteboard full of curves",
        description: "A number doubles, then doubles again. Something about the shape of growth clicks into place.",
        cue: "1 → 2 → 4 → 8 → 16 → 32 — the curve keeps bending upward.",
      },
      {
        age: "Age 15",
        title: "Writing Academic Papers",
        location: "A research room, papers everywhere",
        description: "Typing fast, chasing a dataset that keeps almost making sense.",
      },
      {
        age: "Age 17",
        title: "Academic Recognition",
        location: "A university hall, a room full of professors",
        description: "Explaining a system to people who built their careers on smaller versions of it.",
      },
      {
        age: "Age 19",
        title: "Scholarships and Brilliance",
        location: "A scholarship ceremony, formal applause",
        description: "Recognition, handshake, photograph. Sterile, correct, and a little hollow.",
      },
      {
        age: "Age 20 — Present",
        title: "Perfect Essays. Perfect Logic. No Life.",
        location: "A desk, a cursor blinking at the end of a flawless paragraph",
        description:
          "The argument is airtight. Every citation lands. Nothing on the page needed a person to write it.",
        cue: "The words on the screen have gone stark black and white — correct, and nothing else.",
      },
    ],
    closingLine: "Y = ECONOMICS. You zoomed in. You understood. But you never zoomed out.",
  },
  "universe-3": {
    id: "universe-3",
    order: 3,
    label: "Music + Economics",
    doorLabel: "Universe 3",
    colors: {
      core: "#e7e4f5",
      accent: "#cfa6e0",
      fade: "#b9b3d9",
    },
    particleTheme: "merged",
    milestones: [
      {
        age: "Ages 5–12",
        title: "Two Passions Developing",
        location: "A child's room — a piano on one side, a shelf of textbooks on the other",
        description: "Piano, then the book, then the piano again. Neither one crowds the other out.",
      },
      {
        age: "Age 13",
        title: "Both Passions Growing",
        location: "One room, doing double duty as studio and study",
        description: "Hours of both, back to back, switching without ceremony.",
      },
      {
        age: "Age 15",
        title: "The Discovery",
        location: "The practice room, mid-phrase",
        description:
          "Hands stop on the keys. Each note is building on the last, the same way each practice session compounds on the one before it.",
        cue: "Each note builds on the last. Each practice builds exponentially. Music is compound interest. I am compound interest.",
      },
      {
        age: "Ages 16–18",
        title: "Creating Something New",
        location: "A space that is half studio, half desk",
        description: "Original composition, structured on a growth curve. The sheet music and the spreadsheet start to look like the same object.",
      },
      {
        age: "Age 19",
        title: "The Intersection",
        location: "A presentation hall",
        description: "A composition and an economic analysis, side by side, and one explanation for both.",
      },
      {
        age: "Age 20 — Present",
        title: "X + Y = Something That Doesn't Exist Anywhere Else",
        location: "A creative studio — piano visible, papers visible, both equally at home",
        description:
          "An essay on the screen carries musical notation, mathematical notation, and plain language, all doing the same job at once.",
      },
    ],
    closingLine:
      "X + Y = DISCOVERY. You refused to choose. You zoomed in on both. You zoomed out and saw the connection. You created something unprecedented.",
  },
};

export const UNIVERSE_LIST: UniverseConfig[] = [
  UNIVERSES["universe-1"],
  UNIVERSES["universe-2"],
  UNIVERSES["universe-3"],
];
