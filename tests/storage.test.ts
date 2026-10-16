import { test } from 'node:test';
import assert from 'node:assert/strict';
import { storage, readJson } from '../src/utils/storage';
import { isProjectList } from '../src/utils/projectValidation';
import { ALL_LOCAL_PROJECTS } from '../src/data/featuredProjects';

test('storage denial and quota never escape', () => {
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, get() { throw new Error('SecurityError'); } });
  assert.equal(storage.get('x'), null);
  assert.equal(storage.set('x', 'y'), false);
  assert.equal(storage.remove('x'), false);
  assert.equal(readJson('bad'), null);
});

test('runtime validation rejects structurally corrupt caches', () => {
  assert.equal(isProjectList([{}]), false);
  assert.equal(isProjectList({}), false);
  assert.equal(isProjectList([{ ...ALL_LOCAL_PROJECTS[0], tags: null }]), false);
  assert.equal(isProjectList([{ ...ALL_LOCAL_PROJECTS[0], githubUrl: 'javascript:alert(1)' }]), false);
  assert.equal(isProjectList(ALL_LOCAL_PROJECTS), true);
});
