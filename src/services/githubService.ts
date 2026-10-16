import type { GitHubRepo, Project } from '../types/project';
import { ALL_LOCAL_PROJECTS } from '../data/featuredProjects';
import { readJson, storage } from '../utils/storage';
import { isProjectList, record } from '../utils/projectValidation';
import { httpUrl } from '../utils/urls';
import { withDeadline } from '../utils/request';

const CACHE_TTL = 30 * 60 * 1000;
const OWNER = 'moii-dev';
interface Snapshot { username: string; updatedAt: number; repos: Project[] }
const lastGood = new Map<string, Snapshot>();
export interface GitHubResult {
  repos: Project[];
  fromCache: boolean;
  source: 'live' | 'cache' | 'local';
  lastUpdated?: number;
  error?: string;
  warning?: string;
}
interface Options { signal?: AbortSignal; timeoutMs?: number; maxPages?: number }

export function repositoryIdentity(url: string): string {
  try {
    const parsed = new URL(url);
    const parts = parsed.pathname.split('/').filter(Boolean);
    return parsed.hostname === 'github.com' && parts.length === 2 ? `${parts[0]}/${parts[1]}`.toLowerCase() : '';
  } catch { return ''; }
}

function localProjects(username: string): Project[] { return username === OWNER ? ALL_LOCAL_PROJECTS : []; }
function numberProjects(projects: Project[]): Project[] {
  return projects.map((project, index) => ({ ...project, number: String(index + 1).padStart(2, '0') }));
}

export function mergeGitHubProjects(repos: GitHubRepo[], username: string, previous: Project[] = []): Project[] {
  const merged = new Map<string, Project>();
  const identity = (project: Project) => repositoryIdentity(project.githubUrl) || `local:${project.id}`;
  for (const project of [...localProjects(username), ...previous]) {
    const key = identity(project);
    const curated = merged.get(key);
    merged.set(key, curated ? {
      ...curated, stars: project.stars ?? curated.stars, forks: project.forks ?? curated.forks,
      updatedAt: project.updatedAt ?? curated.updatedAt, demoUrl: httpUrl(project.demoUrl) || curated.demoUrl,
    } : project);
  }
  for (const repo of repos) {
    if (repo.fork || repo.name.toLowerCase() === username) continue;
    const key = repositoryIdentity(repo.html_url);
    if (!key || key.split('/')[0] !== username) continue;
    const local = merged.get(key);
    const demo = httpUrl(repo.homepage) || local?.demoUrl;
    const demoUrl = demo && repositoryIdentity(demo) !== key ? demo : undefined;
    const tags = [...new Set([repo.language, ...(repo.topics || []).slice(0, 3)].filter((tag): tag is string => Boolean(tag)))];
    const project: Project = local ? {
      ...local, stars: repo.stargazers_count, forks: repo.forks_count,
      updatedAt: repo.updated_at.split('T')[0], language: repo.language || local.language, demoUrl,
    } : {
      id: repo.name.toLowerCase(), number: '', title: repo.name,
      category: repo.language ? `${repo.language} Project` : 'Software / Tool',
      description: repo.description || 'Open source software and engineering project.',
      tags: tags.length ? tags : ['Open Source', 'Software'], githubUrl: repo.html_url,
      demoUrl, stars: repo.stargazers_count, forks: repo.forks_count,
      updatedAt: repo.updated_at.split('T')[0], featured: false, language: repo.language || undefined,
      cover: { variant: 'editorial', backgroundTheme: 'silver', badgeText: repo.language || 'Open Source', caption: repo.description || 'GitHub Repository' },
    };
    merged.set(key, project);
  }
  return numberProjects([...merged.values()]);
}

function readSnapshot(username: string): Snapshot | undefined {
  const saved = readJson(`evgeny_portfolio_github_repos_v5_${username}`);
  let snapshot: Snapshot | undefined;
  if (record(saved) && saved.username === username && typeof saved.updatedAt === 'number' &&
    Number.isFinite(saved.updatedAt) && saved.updatedAt > 0 && saved.updatedAt <= Date.now() && isProjectList(saved.repos)) {
    snapshot = { username, updatedAt: saved.updatedAt, repos: mergeGitHubProjects([], username, saved.repos) };
  } else if (username === OWNER) {
    // Only the original owner used the v4 keys. Keep legacy data as an offline fallback.
    const legacy = readJson('evgeny_portfolio_github_repos_v4');
    const updatedAt = Number(storage.get('evgeny_portfolio_github_timestamp_v4'));
    if (isProjectList(legacy) && updatedAt > 0 && updatedAt <= Date.now()) {
      snapshot = { username, updatedAt: Math.min(updatedAt, Date.now() - CACHE_TTL), repos: mergeGitHubProjects([], username, legacy) };
    }
  }
  const memory = lastGood.get(username);
  return memory && (!snapshot || memory.updatedAt >= snapshot.updatedAt) ? memory : snapshot;
}

function isGitHubRepo(value: unknown): value is GitHubRepo {
  return record(value) && typeof value.name === 'string' && Boolean(value.name) && Boolean(httpUrl(value.html_url)) &&
    typeof value.fork === 'boolean' && typeof value.updated_at === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value.updated_at) &&
    ['stargazers_count', 'forks_count'].every(key => typeof value[key] === 'number' && Number.isFinite(value[key]) && value[key] >= 0) &&
    ['description', 'homepage', 'language'].every(key => value[key] === null || typeof value[key] === 'string') &&
    (value.topics === undefined || (Array.isArray(value.topics) && value.topics.every(topic => typeof topic === 'string')));
}

export async function fetchGitHubRepos(username = OWNER, forceRefresh = false, options: Options = {}): Promise<GitHubResult> {
  username = username.toLowerCase();
  const cached = readSnapshot(username);
  if (!forceRefresh && cached && Date.now() - cached.updatedAt < CACHE_TTL) {
    return { repos: cached.repos, fromCache: true, source: 'cache', lastUpdated: cached.updatedAt };
  }
  try {
    if (!/^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/.test(username)) throw new Error('Invalid GitHub username.');
    const { repos, truncated } = await withDeadline(async signal => {
      const repos: GitHubRepo[] = [];
      const maxPages = Math.max(1, Math.min(10, options.maxPages ?? 10));
      for (let page = 1; page <= maxPages; page++) {
        const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100&page=${page}`, {
          headers: { Accept: 'application/vnd.github+json' }, signal,
        });
        if (!response.ok) throw new Error([403, 429].includes(response.status)
          ? `GitHub rate limit or access restriction (${response.status}). Please try again later.`
          : `GitHub is unavailable (${response.status}). Please try again.`);
        const data: unknown = await response.json();
        if (!Array.isArray(data) || !data.every(isGitHubRepo)) throw new Error('GitHub returned an invalid response. Please try again.');
        repos.push(...data);
        const hasNext = /rel="next"/.test(response.headers.get('link') || '') || data.length === 100;
        if (!hasNext) return { repos, truncated: false };
      }
      return { repos, truncated: true };
    }, options.timeoutMs, options.signal);
    const projects = mergeGitHubProjects(repos, username, truncated ? cached?.repos : []);
    const snapshot: Snapshot = { username, updatedAt: Date.now(), repos: projects };
    lastGood.set(username, snapshot);
    storage.set(`evgeny_portfolio_github_repos_v5_${username}`, JSON.stringify(snapshot));
    return { repos: projects, fromCache: false, source: 'live', lastUpdated: snapshot.updatedAt,
      warning: truncated ? 'Repository page limit reached. Previously saved projects are retained.' : undefined };
  } catch (error) {
    return { repos: cached?.repos || localProjects(username), fromCache: true, source: cached ? 'cache' : 'local',
      lastUpdated: cached?.updatedAt, error: error instanceof Error ? error.message : 'GitHub could not be reached. Please try again.' };
  }
}
