import "server-only";

/**
 * Best-effort in-memory rate limiter, keyed by IP. Resets if the server
 * process restarts and isn't shared across instances — fine for the current
 * single-instance deploy target; swap for a durable store (e.g. Upstash) if
 * this ever runs multi-instance.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 20;

const hits = new Map<string, number[]>();

export function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    hits.set(key, timestamps);
    return false;
  }

  timestamps.push(now);
  hits.set(key, timestamps);
  return true;
}
