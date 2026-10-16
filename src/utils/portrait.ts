import { readJson, storage } from './storage';
import { imageUrl } from './urls';
import { record } from './projectValidation';

export interface Portrait { url: string; monochrome: boolean }
const KEY = 'evgeny_portrait_v1';

export function readPortrait(defaultUrl: string): Portrait {
  const saved = readJson(KEY);
  if (record(saved) && imageUrl(saved.url) && typeof saved.monochrome === 'boolean') {
    return { url: saved.url, monochrome: saved.monochrome };
  }
  const legacyUrl = storage.get('evgeny_custom_avatar');
  const legacyMono = storage.get('evgeny_custom_avatar_mono');
  return { url: imageUrl(legacyUrl) ? legacyUrl : defaultUrl, monochrome: legacyMono !== 'false' };
}

// A single write keeps the image and its filter consistent. Legacy keys remain readable.
export function savePortrait(portrait: Portrait): boolean {
  return storage.set(KEY, JSON.stringify(portrait));
}
