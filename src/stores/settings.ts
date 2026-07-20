import { writable } from "svelte/store";

export type Theme = "light" | "dark";

const STORAGE_KEY = "ambient-settings";

interface PersistedSettings {
  theme: Theme;
  timerDuration: number | null;
  windowWidth: number;
}

function getSystemTheme(): Theme {
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
}

function loadSettings(): PersistedSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // ignore
  }
  return {
    theme: "light",
    timerDuration: null,
    windowWidth: typeof window !== "undefined" ? window.innerWidth : 1024,
  };
}

function saveSettings(
  current: PersistedSettings,
  update: Partial<PersistedSettings>
): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...update }));
  } catch {
    // ignore
  }
}

const initial = loadSettings();

export const theme = writable<Theme>(initial.theme);
export const timerDuration = writable<number | null>(initial.timerDuration);

theme.subscribe((value) => {
  const current = loadSettings();
  saveSettings(current, { theme: value });
  document.documentElement.classList.toggle("dark", value === "dark");
});

timerDuration.subscribe((value) => {
  const current = loadSettings();
  saveSettings(current, { timerDuration: value });
});

document.documentElement.classList.toggle("dark", initial.theme === "dark");
