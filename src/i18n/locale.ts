export type Locale = 'en' | 'ru';
export const LANGUAGE_STORAGE_KEY = 'evgeny_portfolio_language_v1';

/** First supported preference wins; unsupported preferences are skipped. */
export function resolveLocale(saved: string | null, languages: readonly string[] = [], language = ''): Locale {
  if (saved === 'en' || saved === 'ru') return saved;
  for (const preference of [...languages, language]) {
    const base = preference.toLowerCase().split(/[-_]/)[0];
    if (base === 'en' || base === 'ru') return base;
  }
  return 'en';
}
