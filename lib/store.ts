import { create } from "zustand";
import { SceneId, UniverseId } from "./types";
import { UNIVERSES } from "./universes";

interface ElevatorState {
  scene: SceneId;
  activeUniverse: UniverseId | null;
  milestoneIndex: number;
  /** True once a universe's closing line has been shown. */
  showingClosing: boolean;
  visited: Record<UniverseId, boolean>;
  soundOn: boolean;

  begin: () => void;
  enterDoor: (id: UniverseId) => void;
  next: () => void;
  prev: () => void;
  jumpTo: (index: number) => void;
  exitToHallway: () => void;
  goFinale: () => void;
  restart: () => void;
  toggleSound: () => void;
}

export const useElevatorStore = create<ElevatorState>((set, get) => ({
  scene: "intro",
  activeUniverse: null,
  milestoneIndex: 0,
  showingClosing: false,
  visited: { "universe-1": false, "universe-2": false, "universe-3": false },
  soundOn: true,

  begin: () => set({ scene: "hallway" }),

  enterDoor: (id) =>
    set({
      scene: id,
      activeUniverse: id,
      milestoneIndex: 0,
      showingClosing: false,
    }),

  next: () => {
    const { activeUniverse, milestoneIndex, showingClosing } = get();
    if (!activeUniverse) return;
    const total = UNIVERSES[activeUniverse].milestones.length;
    if (showingClosing) return;
    if (milestoneIndex >= total - 1) {
      set((state) => ({
        showingClosing: true,
        visited: { ...state.visited, [activeUniverse]: true },
      }));
      return;
    }
    set({ milestoneIndex: milestoneIndex + 1 });
  },

  prev: () => {
    const { milestoneIndex, showingClosing } = get();
    if (showingClosing) {
      set({ showingClosing: false });
      return;
    }
    if (milestoneIndex === 0) return;
    set({ milestoneIndex: milestoneIndex - 1 });
  },

  jumpTo: (index) => set({ milestoneIndex: index, showingClosing: false }),

  exitToHallway: () =>
    set({ scene: "hallway", activeUniverse: null, showingClosing: false }),

  goFinale: () => set({ scene: "finale" }),

  restart: () =>
    set({
      scene: "intro",
      activeUniverse: null,
      milestoneIndex: 0,
      showingClosing: false,
      visited: { "universe-1": false, "universe-2": false, "universe-3": false },
    }),

  toggleSound: () => set((state) => ({ soundOn: !state.soundOn })),
}));
