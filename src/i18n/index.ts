import { useSyncExternalStore } from 'react';
import { getScrollController } from '../utils/scrollController';
import en from './locales/en.json';
import ru from './locales/ru.json';
import { LANGUAGE_STORAGE_KEY, resolveLocale, type Locale } from './locale';

export type { Locale } from './locale';
export type TranslationKey = keyof typeof en;
const dictionaries: Record<Locale, Record<string, string>> = { en, ru };
let locale: Locale = 'en';
if (typeof window !== 'undefined') {
  let saved = null;
  try { saved = localStorage.getItem(LANGUAGE_STORAGE_KEY); } catch { /* Private browsing can deny storage. */ }
  locale = resolveLocale(saved, navigator.languages, navigator.language);
}
const listeners = new Set<() => void>();
const subscribe = (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; };
export const getLocale = () => locale;
export const useLocale = () => useSyncExternalStore(subscribe, getLocale, () => 'en' as Locale);

/** Unknown remote repository text is kept verbatim; curated content has dictionary entries. */
export function translate(text: string, language: Locale, params: Record<string, string | number> = {}): string {
  let value = Object.hasOwn(dictionaries[language], text) ? dictionaries[language][text] : undefined;
  // Service messages retain their original error text and numeric status in caches/state.
  // Match only known templates when a service supplies an already interpolated message.
  if (value === undefined && language !== 'en') {
    for (const key of ['GitHub rate limit or access restriction ({status}). Please try again later.', 'GitHub is unavailable ({status}). Please try again.', '{language} Project']) {
      const token = key.match(/\{(\w+)\}/)!;
      const [before, after] = key.split(token[0]);
      if (text.startsWith(before) && text.endsWith(after)) {
        const parameter = text.slice(before.length, text.length - after.length);
        value = dictionaries[language][key].replace(token[0], parameter);
        break;
      }
    }
  }
  value ??= text;
  return value.replace(/\{(\w+)\}/g, (match, key: string) => Object.hasOwn(params, key) ? String(params[key]) : match);
}
export const t = (text: string | undefined, params?: Record<string, string | number>) => translate(text ?? '', locale, params);

function applyDocumentLocale() {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = locale;
  document.title = t('Evgeny.dev — Developer Portfolio');
  for (const selector of ['meta[name="description"]', 'meta[property="og:description"]']) {
    document.querySelector(selector)?.setAttribute('content', t('Portfolio of Evgeny, an Android, UI/UX, and Web developer crafting thoughtful digital experiences and modern applications.'));
  }
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
  document.querySelector('meta[property="og:image:alt"]')?.setAttribute('content', t('Evgeny.dev — Building Digital Experiences'));
  document.querySelector('meta[name="twitter:image:alt"]')?.setAttribute('content', t('Evgeny.dev developer portfolio'));
}
applyDocumentLocale();

export function setLocale(next: Locale) {
  try { localStorage.setItem(LANGUAGE_STORAGE_KEY, next); } catch { /* Selection still works for this visit. */ }
  if (next === locale) return;
  const scroll = { left: window.scrollX, top: window.scrollY };
  locale = next;
  applyDocumentLocale();
  for (const listener of listeners) listener();
  requestAnimationFrame(() => {
    const controller = getScrollController();
    if (controller) controller.scrollTo(scroll.top, { immediate: true });
    else window.scrollTo({ ...scroll, behavior: 'instant' });
  });
}

export function formatDate(value: string | number, withTime = false) {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return String(value);
  // Preserve the original English display; Russian follows its regional conventions.
  if (locale === 'en') return withTime ? date.toLocaleString() : String(value);
  return withTime ? date.toLocaleString('ru-RU') : date.toLocaleDateString('ru-RU', { timeZone: 'UTC' });
}

const russianPlurals = new Intl.PluralRules('ru');
export function statLabel(kind: 'stars' | 'forks', count: number, language: Locale = locale) {
  return language === 'en' ? translate(kind, language) : translate(`stats.${kind}.${russianPlurals.select(count)}`, language);
}
