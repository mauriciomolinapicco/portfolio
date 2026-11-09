export const supportedLocales = ['es', 'pt', 'en'];
export const storageKey = 'mm-portfolio-language';

function isSupported(value) {
  return supportedLocales.includes(value);
}

/** @param {readonly string[]} preferences */
export function browserLocale(preferences = []) {
  for (const preference of preferences) {
    if (typeof preference !== 'string') continue;
    const candidate = preference.toLowerCase().split('-')[0];
    if (isSupported(candidate)) return candidate;
  }
  return 'es';
}

/** @param {readonly string[]} preferences @param {{getItem(key: string): string | null} | null} [storage] */
export function chooseInitialLocale(preferences = [], storage) {
  try {
    const availableStorage = storage === undefined ? globalThis.localStorage : storage;
    const saved = availableStorage?.getItem(storageKey);
    if (isSupported(saved)) return saved;
  } catch {
    // Browser privacy settings can make storage unavailable.
  }
  return browserLocale(preferences);
}

/** @param {string} locale @param {{setItem(key: string, value: string): void} | null} [storage] */
export function persistLocale(locale, storage) {
  if (!isSupported(locale)) return false;
  try {
    const availableStorage = storage === undefined ? globalThis.localStorage : storage;
    if (!availableStorage) return false;
    availableStorage.setItem(storageKey, locale);
    return true;
  } catch {
    return false;
  }
}
