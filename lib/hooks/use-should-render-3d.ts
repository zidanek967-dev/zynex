"use client";

import { useSyncExternalStore } from "react";

/**
 * Heuristic gate for expensive WebGL/3D work: off for prefers-reduced-motion,
 * Data Saver, and low-core devices. Everything else (including "don't know",
 * e.g. no navigator.hardwareConcurrency support) defaults to on.
 *
 * Reads external browser globals via useSyncExternalStore rather than
 * effect+setState, so the SSR snapshot (always "on") and the real client
 * snapshot never fight each other during hydration.
 */
function subscribe() {
  // Nothing to subscribe to — this is a point-in-time capability check, not a
  // live value. A no-op unsubscribe satisfies the useSyncExternalStore contract.
  return () => {};
}

function getSnapshot() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;
  const saveData = connection?.saveData ?? false;

  const lowCoreCount =
    typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 2;

  return !prefersReducedMotion && !saveData && !lowCoreCount;
}

function getServerSnapshot() {
  return true;
}

export function useShouldRender3D() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
