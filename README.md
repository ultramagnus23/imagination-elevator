# The Imagination Elevator — Three Universes

An interactive 3D walkthrough of three alternate timelines, built with
Next.js 14 (App Router), react-three-fiber / drei, Zustand and Tone.js.
No external 3D models, textures, or audio files — every visual and every
sound is generated in code, so the whole thing runs from `npm install`
with nothing to download separately.

## Run it

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Click "Step into the elevator", then click
a door. Arrow keys (or the on-screen Back/Next) walk you through each
timeline; Escape returns to the hallway.

`npm run build` produces a production build (verified in this
environment — see "Known build warning" below).

## How the experience is structured

- **Hallway** — three doors, one per universe. Bounded drag-to-look,
  click a door to enter.
- **Universe 1 / 2 / 3** — each is six milestone platforms strung along a
  line the camera walks down as you advance. Every milestone is data,
  not a one-off scene: `lib/universes.ts` holds all eighteen milestones'
  age, title, location, description and any special "visual cue" line
  from the brief. `components/experience/UniverseScene.tsx` lays them
  out; `MilestonePlatform.tsx` renders one.
- **Closing line** — after the sixth milestone, the "X = ..." reflection
  appears full-screen, with a way back to the hallway (or straight into
  the next door).
- **Finale** — reachable from Universe 3's closing screen: the three
  universes side by side as three orbs — grey and fading, cold and
  geometric, and the glowing one that's obviously the point.

State (which scene, which milestone, which doors are visited, sound
on/off) lives in one Zustand store: `lib/store.ts`. Nothing about the
3D scenes is imperative or one-off — swapping the content in
`universes.ts` (say, five milestones instead of six, or a fourth door)
requires no changes to the render code.

## Design system (why it looks the way it does)

This is a brand/experiential build — the design *is* the product, not a
UI serving some other task — so it was shaped with that register:

- **Scene**: a student privately replaying their own life choices, late,
  alone, deciding whether to keep specializing or combine two passions.
  That's what forces the dark theme — it's not "dark because 3D tools
  look cool," it's that the whole visual language is glow against void,
  and glow only reads as glow in the dark.
- **Color strategy**: *drenched* — each universe floods the entire scene
  in its own palette rather than accenting a neutral shell. Indigo/violet
  for music, gold/silver for economics, near-white iridescent for the
  merged universe, with the two "sterility" milestones deliberately
  desaturating toward grey.
- **Type**: two families, clearly distinct — Fraunces (serif, warm,
  humanist) carries milestone titles and the closing lines; Space
  Grotesk handles UI chrome and body copy. Both are self-hosted via
  `@fontsource` (no Google Fonts network call, no layout shift waiting
  on a CDN).
- **Absolute bans respected**: no gradient text, no side-stripe borders,
  no card grids, no glassmorphism panels — the HUD is text and thin
  rules sitting directly on the render, with a radial scrim only where
  legibility needs it.
- **Motion**: milestone text crossfades (opacity + small y-shift) on an
  expo-out ease; the camera dampens toward each new platform rather than
  cutting; nothing bounces.

## Where the 3D content is procedural, on purpose

There are no imported meshes, glTFs, or textures — every shape (the
platforms, the doors, the floating glyphs, the "avatar" orb) is built
from primitive Three.js geometry. That was a deliberate choice, not
just a build-environment constraint: it keeps the whole repo
self-contained and it matches the brief's abstract, symbolic tone
(a floating note, a percent sign, an orb of light) rather than
attempting literal photoreal scenes. If you want to raise the visual
ceiling later, the natural next step is dropping `.glb` models into
`public/models/` and swapping the primitive `<mesh>` blocks in
`MilestonePlatform.tsx` / `Door.tsx` for `useGLTF()` calls — the camera
rig, state machine, and text/audio sync don't need to change.

## Audio

`components/audio/AudioEngine.tsx` runs two Tone.js voices: a sustained
pad whose oscillator/filter shift per universe (sine, warm and dark for
music; square, brighter and colder for economics; triangle, blended,
for the merged universe) and a short pluck on every milestone change.
Nothing is pre-recorded, so there's no asset licensing to think about
and no file size cost. Browsers require a user gesture before audio can
play — that's why `Tone.start()` is called from the "Step into the
elevator" button, not on page load.

## Known build warning (harmless)

You'll see webpack warnings like `'Reverb' is not exported from 'tone'`
during `npm run build`. This is a well-known false positive: Tone.js's
ESM entry point re-exports through several layers of `export *`, which
webpack's static export-analysis can't always resolve, but the runtime
binding is correct. The build completes, type-checks cleanly, and the
app runs correctly — confirmed with `npm run build` and a dev-server
smoke test in the environment this was built in.

## Extending it

- **More/different milestones**: edit `lib/universes.ts` only.
- **A fourth door**: add an entry to `UNIVERSES`, push its id onto
  `UNIVERSE_ORDER` in `lib/types.ts`, and add a `<Door>` in
  `Hallway.tsx`.
- **Real assets**: see "Where the 3D content is procedural" above.
- **Persisting progress** (so a returning visitor resumes where they
  left off): `lib/store.ts` is a plain Zustand store — wrap it with
  `zustand/middleware`'s `persist` to back it with `localStorage`.
