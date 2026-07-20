import { writable } from "svelte/store";
import type { SoundState } from "../types/sound";
import { audioManager } from "../lib/audio";
import { sounds } from "../data/sounds";
import type { Sound } from "../types/sound";

const STORAGE_KEY = "ambient-audio";

interface AudioStore {
  states: Record<string, SoundState>;
}

function buildDefaultStates(): Record<string, SoundState> {
  const states: Record<string, SoundState> = {};
  for (const sound of sounds) {
    states[sound.id] = { playing: false, volume: 50 };
  }
  return states;
}

function loadAudio(): AudioStore {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && parsed.states) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }
  return { states: buildDefaultStates() };
}

function saveAudio(store: AudioStore): void {
  const toPersist: Record<string, SoundState> = {};
  for (const sound of sounds) {
    const state = store.states[sound.id];
    if (state) {
      toPersist[sound.id] = {
        playing: state.playing,
        volume: state.volume,
      };
    }
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ states: toPersist }));
  } catch {
    // ignore
  }
}

const initial = loadAudio();

for (const sound of sounds) {
  if (!initial.states[sound.id]) {
    initial.states[sound.id] = { playing: false, volume: 50 };
  }
}

function createAudioStore() {
  const store = writable<AudioStore>(initial);

  function persist(storeValue: AudioStore): void {
    saveAudio(storeValue);
  }

  return {
    subscribe: store.subscribe,

    toggle(soundId: string) {
      store.update((s) => {
        const state = s.states[soundId];
        if (!state) return s;

        const sound = sounds.find((sd: Sound) => sd.id === soundId);
        if (!sound) return s;

        state.playing = !state.playing;

        if (state.playing) {
          audioManager.play(sound, state.volume);
        } else {
          audioManager.stop(soundId);
        }

        persist(s);
        return s;
      });
    },

    setVolume(soundId: string, volume: number) {
      store.update((s) => {
        const state = s.states[soundId];
        if (!state) return s;

        state.volume = volume;
        audioManager.setVolume(soundId, volume);

        persist(s);
        return s;
      });
    },

    restore() {
      const saved = loadAudio();
      for (const sound of sounds) {
        const state = saved.states[sound.id];
        if (state?.playing) {
          audioManager.play(sound, state.volume);
        }
      }

      const merged: Record<string, SoundState> = {};
      for (const sound of sounds) {
        merged[sound.id] = saved.states[sound.id] ?? {
          playing: false,
          volume: 50,
        };
      }

      store.set({ states: merged });
    },

    stopAll() {
      audioManager.stopAll();
      store.update((s) => {
        for (const id in s.states) {
          s.states[id].playing = false;
        }
        persist(s);
        return s;
      });
    },
  };
}

export const audioStore = createAudioStore();
