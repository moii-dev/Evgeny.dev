import { test } from 'node:test';
import assert from 'node:assert/strict';
import { storage, readJson } from '../src/utils/storage';
import { readPortrait, savePortrait } from '../src/utils/portrait';
import { isProjectList } from '../src/utils/projectValidation';
import { ALL_LOCAL_PROJECTS } from '../src/data/featuredProjects';

test('storage denial and quota never escape; portrait falls back', () => {
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, get() { throw new Error('SecurityError'); } });
  assert.equal(storage.get('x'), null);
  assert.equal(storage.set('x', 'y'), false);
  assert.equal(storage.remove('x'), false);
  assert.deepEqual(readPortrait('/assets/default.png'), { url: '/assets/default.png', monochrome: true });
});

test('portrait preserves legacy settings and uses an atomic new record', () => {
  const values = new Map<string, string>([['evgeny_custom_avatar', 'https://example.com/photo.png'], ['evgeny_custom_avatar_mono', 'false']]);
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
    removeItem: (key: string) => values.delete(key),
  } });
  assert.equal(readPortrait('/default.png').monochrome, false);
  const portrait = { url: '/default.png', monochrome: true };
  assert.equal(savePortrait(portrait), true);
  assert.deepEqual(readPortrait('/other.png'), portrait);
  assert.equal(values.get('evgeny_custom_avatar'), 'https://example.com/photo.png');
  values.set('bad', '{');
  assert.equal(readJson('bad'), null);
});

test('runtime validation rejects structurally corrupt caches', () => {
  assert.equal(isProjectList([{}]), false);
  assert.equal(isProjectList({}), false);
  assert.equal(isProjectList([{ ...ALL_LOCAL_PROJECTS[0], tags: null }]), false);
  assert.equal(isProjectList([{ ...ALL_LOCAL_PROJECTS[0], githubUrl: 'javascript:alert(1)' }]), false);
  assert.equal(isProjectList(ALL_LOCAL_PROJECTS), true);
});
