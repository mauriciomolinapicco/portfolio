const STAGGER_MS = 70;
const MAX_DELAY_MS = 700;

/**
 * Split a sentence into words with a running index used for staggered animation.
 * @param {string} text
 * @param {number} [start]
 * @returns {{word: string, index: number}[]}
 */
export function splitWords(text, start = 0) {
  return text.split(/\s+/).filter(Boolean).map((word, offset) => ({ word, index: start + offset }));
}

/**
 * Delay for the nth revealed item, capped so long lists never lag.
 * @param {number} index
 */
export function revealDelay(index) {
  return `${Math.min(index * STAGGER_MS, MAX_DELAY_MS)}ms`;
}
