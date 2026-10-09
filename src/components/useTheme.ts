"use client";

import { useSyncExternalStore } from "react";
import { Theme, THEME_CHANGE_EVENT, getStoredTheme } from "@/lib/theme";

function subscribe(callback: () => void) {
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  return () => window.removeEventListener(THEME_CHANGE_EVENT, callback);
}

function getServerSnapshot(): Theme | null {
  return null;
}

export function useTheme() {
  return useSyncExternalStore(subscribe, getStoredTheme, getServerSnapshot);
}
