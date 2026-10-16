import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fetchGitHubRepos, mergeGitHubProjects } from '../src/services/githubService';
import type { GitHubRepo } from '../src/types/project';
import { ALL_LOCAL_PROJECTS } from '../src/data/featuredProjects';

const values = new Map<string, string>();
Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: {
  getItem: (key: string) => values.get(key) ?? null,
  setItem: (key: string, value: string) => values.set(key, value),
  removeItem: (key: string) => values.delete(key),
} });
function repo(name: string, username = 'moii-dev'): GitHubRepo {
  return { id: 1, name, full_name: `${username}/${name}`, html_url: `https://github.com/${username}/${name}`, homepage: 'https://example.com/demo',
    description: 'API description', language: 'TypeScript', stargazers_count: 99, forks_count: 21, updated_at: '2026-10-16T00:00:00Z', fork: false, topics: ['typescript'] };
}

test('invalid cache never reaches consumers and legacy cache remains an offline fallback', async () => {
  values.set('evgeny_portfolio_github_repos_v4', '[{}]');
  values.set('evgeny_portfolio_github_timestamp_v4', String(Date.now()));
  globalThis.fetch = async () => { throw new Error('offline'); };
  const invalid = await fetchGitHubRepos();
  assert.deepEqual(invalid.repos, ALL_LOCAL_PROJECTS);
  values.set('evgeny_portfolio_github_repos_v4', JSON.stringify([...ALL_LOCAL_PROJECTS, { ...ALL_LOCAL_PROJECTS[0], id: 'extra', title: 'extra', githubUrl: 'https://github.com/moii-dev/extra' }]));
  const migrated = await fetchGitHubRepos();
  assert.equal(migrated.source, 'cache');
  assert.ok(migrated.repos.some(project => project.id === 'extra'));
  assert.ok(values.has('evgeny_portfolio_github_repos_v4'));
});

test('merge updates featured statistics and keeps curated metadata and stable Gamma id', () => {
  const merged = mergeGitHubProjects([repo('FreeChat'), repo('GAMMA-PPTX-Watermark-Cleaner'), repo('New'), repo('New')], 'moii-dev');
  assert.equal(merged[0].stars, 99);
  assert.equal(merged[0].forks, 21);
  assert.equal(merged[0].longDescription, ALL_LOCAL_PROJECTS[0].longDescription);
  assert.equal(merged[0].updatedAt, '2026-10-16');
  const gamma = merged.find(project => project.id === 'gamma-cleaner');
  assert.equal(gamma?.title, 'PPTX / PDF Watermark Cleaner');
  assert.ok(gamma?.cover?.logoUrl);
  assert.equal(new Set(merged.map(project => project.id)).size, merged.length);
  assert.equal(new Set(merged.map(project => project.number)).size, merged.length);
});

test('pagination retrieves page 2 and isolates username caches', async () => {
  const calls: string[] = [];
  globalThis.fetch = async input => {
    const url = String(input); calls.push(url);
    const data = url.includes('page=2') ? [repo('last', 'pages-user')] : Array.from({ length: 100 }, (_, i) => repo(`repo-${i}`, 'pages-user'));
    return new Response(JSON.stringify(data), { status: 200 });
  };
  const paged = await fetchGitHubRepos('pages-user', true);
  assert.equal(paged.repos.length, 101);
  assert.equal(calls.length, 2);
  const cached = await fetchGitHubRepos('pages-user');
  assert.equal(cached.source, 'cache');
  assert.equal(calls.length, 2);
  globalThis.fetch = async () => new Response('[]');
  const other = await fetchGitHubRepos('another-user');
  assert.equal(other.source, 'live');
  assert.equal(other.repos.length, 0);
});

test('page cap warns and retains previous snapshot projects', async () => {
  globalThis.fetch = async () => new Response(JSON.stringify(Array.from({ length: 100 }, (_, i) => repo(`new-${i}`, 'pages-user'))));
  const capped = await fetchGitHubRepos('pages-user', true, { maxPages: 1 });
  assert.ok(capped.warning);
  assert.ok(capped.repos.some(project => project.id === 'last'));
});

test('offline, rate limits, 5xx, invalid payload and timeout preserve last good data', async () => {
  globalThis.fetch = async () => new Response(JSON.stringify([repo('Only-live', 'resilient')]));
  const live = await fetchGitHubRepos('resilient', true);
  for (const status of [403, 429, 500, 503]) {
    globalThis.fetch = async () => new Response('', { status });
    const failed = await fetchGitHubRepos('resilient', true);
    assert.deepEqual(failed.repos, live.repos);
    assert.equal(failed.source, 'cache');
    assert.ok(failed.error?.includes(String(status)));
  }
  globalThis.fetch = async () => new Response('[{}]');
  assert.deepEqual((await fetchGitHubRepos('resilient', true)).repos, live.repos);
  globalThis.fetch = () => new Promise<Response>(() => {});
  const timedOut = await fetchGitHubRepos('resilient', true, { timeoutMs: 10 });
  assert.match(timedOut.error || '', /timed out/);
  assert.deepEqual(timedOut.repos, live.repos);
});

test('unsafe homepage does not become a live link', () => {
  const data = repo('Unsafe'); data.homepage = 'javascript:alert(1)';
  const result = mergeGitHubProjects([data], 'moii-dev');
  assert.equal(result.find(project => project.id === 'unsafe')?.demoUrl, undefined);
});

test('live stars do not conflict with a stale hardcoded cover statistic', () => {
  const result = mergeGitHubProjects([repo('Yandex-AdBlocker')], 'moii-dev');
  const project = result.find(item => item.id === 'yandex-adblocker');
  assert.equal(project?.stars, 99);
  assert.doesNotMatch(project?.cover?.badgeText || '', /\d+\s+stars/i);
});
