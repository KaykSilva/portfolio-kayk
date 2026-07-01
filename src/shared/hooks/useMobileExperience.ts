"use client";

import { useSyncExternalStore } from "react";

const MOBILE_QUERY = "(max-width: 760px), (pointer: coarse)";

function subscribe(callback: () => void) {
  const mediaQuery = window.matchMedia(MOBILE_QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(MOBILE_QUERY).matches;
}

export function useMobileExperience() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
