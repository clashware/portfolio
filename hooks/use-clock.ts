import { useSyncExternalStore } from "react";

// External-store clock: avoids setState-in-effect (React Compiler safe) and
// hydration mismatches. Server renders "" (the "INITIALIZING..." fallback);
// the client picks up the live value on subscribe.
let currentTime = "";
const listeners = new Set<() => void>();
let intervalId: ReturnType<typeof setInterval> | null = null;

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  if (intervalId === null) {
    currentTime = new Date().toISOString();
    intervalId = setInterval(() => {
      currentTime = new Date().toISOString();
      for (const l of listeners) l();
    }, 100);
  }
  listener();
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };
}

const getSnapshot = (): string => currentTime;
const getServerSnapshot = (): string => "";

export function useClock(): string {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
