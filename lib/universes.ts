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
        age: "Age 3",
        title: "First Sound at the Piano",
        location: "The living room, an old upright piano",
        description:
          "No lesson yet, just a small hand pressing a key to hear what happens, then doing it again.",
      },
      {
        age: "Age 6",
        title: "First Piano Lessons",
        location: "A teacher's front room, a metronome ticking",
        description: "Scales, for real this time. Nothing sounds right yet, and none of it needs to.",
      },
      {
        age: "Age 9",
        title: "Joins the Junior Music League",
        location: "A community hall, a row of young performers",
        description: "First taste of playing alongside other serious kids, and of being taken seriously.",
      },
      {
        age: "Age 12",
        title: "Selected for the National Music League",
        location: "A national audition hall",
        description: "A callback nobody in the family expected. The technique has become undeniable.",
      },
      {
        age: "Age 15",
        title: "Solo Recital Circuit",
        location: "A concert hall, hundreds watching",
        description: "Touring small recitals, flawless each time. A name starting to travel ahead of the person carrying it.",
      },
      {
        age: "Age 17 — Present",
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
        age: "Age 6",
        title: "First Book on Economics",
        location: "A bedroom shelf, a book borrowed and never returned",
        description: "A picture-book explanation of trade and money. Eyes wide, the kind of wonder that usually gets spent on something else at six.",
      },
      {
        age: "Age 8",
        title: "A Second Book, a Bigger Question",
        location: "The library, a thicker book this time",
        description: "Prices, markets, why things cost what they cost. The questions start outrunning the answers in the book.",
      },
      {
        age: "Age 10",
        title: "Understanding Compound Interest",
        location: "A classroom, a whiteboard full of curves",
        description: "A number doubles, then doubles again. Something about the shape of growth clicks into place.",
        cue: "1 → 2 → 4 → 8 → 16 → 32 — the curve keeps bending upward.",
      },
      {
        age: "Age 12",
        title: "The Economics Olympiad",
        location: "An exam hall, a country's worth of competitors",
        description: "A medal that turns a private obsession into a credential.",
      },
      {
        age: "Age 15",
        title: "Academic Recognition",
        location: "A university hall, a room full of professors",
        description: "Explaining a system to people who built their careers on smaller versions of it.",
      },
      {
        age: "Age 17 — Present",
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
        age: "Ages 3–9",
        title: "Two Passions Developing",
        location: "A child's room — a piano on one side, a shelf of books on the other",
        description: "Piano, then a book about money, then the piano again. Neither one crowds the other out.",
      },
      {
        age: "Ages 10–12",
        title: "Both Passions Growing",
        location: "One room, doing double duty as studio and study",
        description: "The National Music League and the Economics Olympiad, the same year. Hours of both, back to back.",
      },
      {
        age: "Age 13",
        title: "The Discovery",
        location: "The practice room, mid-phrase",
        description:
          "Hands stop on the keys. Each note is building on the last, the same way each practice session compounds on the one before it.",
        cue: "Each note builds on the last. Each practice builds exponentially. Music is compound interest. I am compound interest.",
      },
      {
        age: "Ages 14–15",
        title: "Creating Something New",
        location: "A space that is half studio, half desk",
        description: "Original composition, structured on a growth curve. The sheet music and the spreadsheet start to look like the same object.",
      },
      {
        age: "Age 16",
        title: "The Intersection",
        location: "A presentation hall",
        description: "A composition and an economic analysis, side by side, and one explanation for both.",
      },
      {
        age: "Age 17 — Present",
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
