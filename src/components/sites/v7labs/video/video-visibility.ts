/**
 * Shared visibility manager so only the most-visible product film plays.
 * Each ProductVideo registers; IntersectionObserver ratios decide the winner.
 */

type Entry = {
  id: string;
  ratio: number;
  near: boolean;
  play: () => void;
  pause: () => void;
};

const entries = new Map<string, Entry>();
let scheduled = false;

function pickWinner(): string | null {
  let bestId: string | null = null;
  let bestRatio = 0;
  for (const [id, e] of entries) {
    if (!e.near) continue;
    if (e.ratio > bestRatio) {
      bestRatio = e.ratio;
      bestId = id;
    }
  }
  /* Require a meaningful footprint before claiming the slot */
  if (bestRatio < 0.08) return null;
  return bestId;
}

function flush() {
  scheduled = false;
  const winner = pickWinner();
  for (const [id, e] of entries) {
    if (winner && id === winner) e.play();
    else e.pause();
  }
}

function schedule() {
  if (scheduled) return;
  scheduled = true;
  queueMicrotask(flush);
}

export function registerVideoVisibility(entry: Entry) {
  entries.set(entry.id, entry);
  schedule();
  return () => {
    entries.delete(entry.id);
    schedule();
  };
}

export function updateVideoVisibility(
  id: string,
  patch: Partial<Pick<Entry, "ratio" | "near">>,
) {
  const cur = entries.get(id);
  if (!cur) return;
  entries.set(id, { ...cur, ...patch });
  schedule();
}
