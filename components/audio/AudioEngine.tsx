"use client";

import { useEffect, useRef } from "react";
import {
  Reverb,
  Filter,
  PolySynth,
  FMSynth,
  Synth,
  Destination,
} from "tone";
import { useElevatorStore } from "@/lib/store";
import { UniverseId } from "@/lib/types";

const THEME_SETTINGS: Record<
  UniverseId,
  { oscillator: OscillatorType; notes: string[]; filterFreq: number }
> = {
  "universe-1": {
    oscillator: "sine",
    notes: ["C4", "E4", "G4", "B4"],
    filterFreq: 1100,
  },
  "universe-2": {
    oscillator: "square",
    notes: ["C4", "D4", "F#4", "A4"],
    filterFreq: 2400,
  },
  "universe-3": {
    oscillator: "triangle",
    notes: ["C4", "E4", "G4", "C5"],
    filterFreq: 1700,
  },
};

function isUniverse(scene: string): scene is UniverseId {
  return scene === "universe-1" || scene === "universe-2" || scene === "universe-3";
}

/** No visual output — mount once near the root of the app. */
export default function AudioEngine() {
  const scene = useElevatorStore((s) => s.scene);
  const milestoneIndex = useElevatorStore((s) => s.milestoneIndex);
  const soundOn = useElevatorStore((s) => s.soundOn);

  const padRef = useRef<any>(null);
  const filterRef = useRef<Filter | null>(null);
  const reverbRef = useRef<Reverb | null>(null);
  const pluckRef = useRef<Synth | null>(null);

  useEffect(() => {
    const reverb = new Reverb({ decay: 6, wet: 0.35 }).toDestination();
    const filter = new Filter(1200, "lowpass").connect(reverb);
    const pad = new PolySynth(FMSynth, {
      volume: -20,
      envelope: { attack: 2.5, decay: 1, sustain: 0.6, release: 4 },
    } as any).connect(filter);
    const pluck = new Synth({
      volume: -12,
      oscillator: { type: "triangle" },
      envelope: { attack: 0.01, decay: 0.3, sustain: 0, release: 0.4 },
    }).connect(filter);

    reverbRef.current = reverb;
    filterRef.current = filter;
    padRef.current = pad;
    pluckRef.current = pluck;

    return () => {
      pad.dispose();
      pluck.dispose();
      filter.dispose();
      reverb.dispose();
    };
  }, []);

  useEffect(() => {
    if (!soundOn) return;
    const pad = padRef.current;
    const filter = filterRef.current;
    if (!pad || !filter) return;

    pad.releaseAll();
    if (!isUniverse(scene)) return;

    const settings = THEME_SETTINGS[scene];
    filter.frequency.rampTo(settings.filterFreq, 2);
    pad.set({ oscillator: { type: settings.oscillator } });
    pad.triggerAttack(settings.notes, undefined, 0.35);
  }, [scene, soundOn]);

  useEffect(() => {
    if (!soundOn || !isUniverse(scene)) return;
    const pluck = pluckRef.current;
    if (!pluck) return;
    const settings = THEME_SETTINGS[scene];
    const note = settings.notes[milestoneIndex % settings.notes.length];
    pluck.triggerAttackRelease(note, "8n");
  }, [milestoneIndex, scene, soundOn]);

  useEffect(() => {
    Destination.mute = !soundOn;
  }, [soundOn]);

  return null;
}
