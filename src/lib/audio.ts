import { Howl } from "howler";
import type { Sound } from "../types/sound";

interface AudioState {
  playing: boolean;
  volume: number;
  instance: Howl | null;
  fadeTimer: ReturnType<typeof setTimeout> | null;
}

class AudioManager {
  private sounds: Map<string, AudioState> = new Map();

  getState(id: string): { playing: boolean; volume: number } {
    const state = this.sounds.get(id);
    if (state) {
      return { playing: state.playing, volume: state.volume };
    }
    return { playing: false, volume: 50 };
  }

  private getOrCreate(sound: Sound): Howl {
    const existing = this.sounds.get(sound.id);
    if (existing?.instance) {
      return existing.instance;
    }
    const howl = new Howl({
      src: [sound.audio],
      loop: true,
      volume: 0,
      preload: true,
      onloaderror: () => {
        console.error(`Failed to load audio: ${sound.audio}`);
      },
      onplayerror: (_id: number, err: unknown) => {
        console.error(`Failed to play: ${sound.audio}`, err);
      },
    });
    this.sounds.set(sound.id, {
      playing: false,
      volume: 50,
      instance: howl,
      fadeTimer: null,
    });
    return howl;
  }

  play(sound: Sound, volume: number): void {
    const howl = this.getOrCreate(sound);
    const state = this.sounds.get(sound.id)!;

    if (state.fadeTimer) {
      clearTimeout(state.fadeTimer);
      state.fadeTimer = null;
    }

    const targetVolume = Math.max(0, Math.min(1, volume / 100));
    howl.play();
    howl.fade(0, targetVolume, 1500);
    state.playing = true;
    state.volume = volume;
  }

  stop(id: string): void {
    const state = this.sounds.get(id);
    if (!state?.instance) return;

    const howl = state.instance;
    const currentVolume = howl.volume();
    howl.fade(currentVolume, 0, 1500);
    state.playing = false;

    if (state.fadeTimer) {
      clearTimeout(state.fadeTimer);
    }

    state.fadeTimer = setTimeout(() => {
      howl.stop();
      state.fadeTimer = null;
    }, 1500);
  }

  setVolume(id: string, volume: number): void {
    const state = this.sounds.get(id);
    if (state) {
      state.volume = volume;
      if (state.instance?.playing()) {
        const targetVolume = Math.max(0, Math.min(1, volume / 100));
        state.instance.volume(targetVolume);
      }
    }
  }

  stopAll(): void {
    this.sounds.forEach((_, id) => {
      this.stop(id);
    });
  }

  cleanup(): void {
    this.sounds.forEach((state) => {
      if (state.fadeTimer) {
        clearTimeout(state.fadeTimer);
      }
      state.instance?.unload();
    });
    this.sounds.clear();
  }
}

export const audioManager = new AudioManager();
