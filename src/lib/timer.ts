export type TimerDuration = number;

export interface TimerState {
  duration: TimerDuration | null;
  remaining: number | null;
  active: boolean;
}

let timeoutId: ReturnType<typeof setTimeout> | null = null;
let intervalId: ReturnType<typeof setInterval> | null = null;
let onComplete: (() => void) | null = null;
let currentDuration: TimerDuration | null = null;

export function startTimer(
  durationMinutes: TimerDuration,
  callback: () => void
): void {
  stopTimer();
  currentDuration = durationMinutes;
  onComplete = callback;

  timeoutId = setTimeout(() => {
    callback();
    stopTimer();
  }, durationMinutes * 60 * 1000);
}

export function stopTimer(): void {
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  currentDuration = null;
  onComplete = null;
}

export function getTimerState(): TimerState {
  return {
    duration: currentDuration,
    remaining: null,
    active: timeoutId !== null,
  };
}

export const timerOptions: { label: string; value: number | null }[] = [
  { label: "Off", value: null },
  { label: "15 min", value: 15 },
  { label: "30 min", value: 30 },
  { label: "45 min", value: 45 },
  { label: "60 min", value: 60 },
  { label: "90 min", value: 90 },
  { label: "120 min", value: 120 },
];
