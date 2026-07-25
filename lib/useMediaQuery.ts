"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribes to a media query without tearing during hydration.
 *
 * Returns `false` on the server and for the first client render, so it must
 * only gate things that are invisible in markup — animation props, event
 * wiring, lazily-created work. Gating layout on it would shift the page after
 * hydration.
 */
// `getSnapshot` runs on every render, and matchMedia() both allocates and can
// force the engine to bring style up to date to answer. One list per query,
// created once, keeps the read to a plain property access.
const lists = new Map<string, MediaQueryList>();

function listFor(query: string): MediaQueryList {
  let list = lists.get(query);
  if (!list) {
    list = window.matchMedia(query);
    lists.set(query, list);
  }
  return list;
}

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = listFor(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => listFor(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
