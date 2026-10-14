import { GitHubRepo, Project } from '../types/project';
import { ALL_LOCAL_PROJECTS, FEATURED_PROJECTS } from '../data/featuredProjects';

const CACHE_KEY = 'evgeny_portfolio_github_repos_v1';
const CACHE_TIMESTAMP_KEY = 'evgeny_portfolio_github_timestamp_v1';
const CACHE_TTL = 1000 * 60 * 30; // 30 minutes

export interface GitHubStats {
  repoCount: number;
  totalStars: number;
  techCount: number;
  lastUpdated: string;
}

export async function fetchGitHubRepos(username = 'moii-dev', forceRefresh = false): Promise<{
  repos: Project[];
  fromCache: boolean;
  error?: string;
}> {
  if (!forceRefresh) {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
      if (cached && timestamp && Date.now() - parseInt(timestamp, 10) < CACHE_TTL) {
        const parsed: Project[] = JSON.parse(cached);
        return { repos: parsed, fromCache: true };
      }
    } catch {
      // Ignore localStorage errors
    }
  }

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!res.ok) {
      throw new Error(`GitHub API returned status ${res.status}`);
    }

    const data: GitHubRepo[] = await res.json();

    // Filter out forks and profile repository
    const filtered = data.filter((repo) => !repo.fork && repo.name !== username);

    // Map and enrich with local metadata
    const mapped: Project[] = filtered.map((repo, idx) => {
      const localMatch = ALL_LOCAL_PROJECTS.find(
        (p) => p.title.toLowerCase() === repo.name.toLowerCase() || p.id.toLowerCase() === repo.name.toLowerCase()
      );

      const numStr = (idx + 1).toString().padStart(2, '0');

      if (localMatch) {
        return {
          ...localMatch,
          stars: repo.stargazers_count ?? localMatch.stars,
          forks: repo.forks_count,
          githubUrl: repo.html_url,
          demoUrl: repo.homepage || localMatch.demoUrl,
          updatedAt: repo.updated_at.split('T')[0],
        };
      }

      // Infer tags from language
      const inferredTags: string[] = [];
      if (repo.language) inferredTags.push(repo.language);
      if (repo.topics && Array.isArray(repo.topics)) {
        inferredTags.push(...repo.topics.slice(0, 3));
      }

      return {
        id: repo.name.toLowerCase(),
        number: numStr,
        title: repo.name,
        category: repo.language ? `${repo.language} Project` : 'Software / Tool',
        description: repo.description || 'Open source software and engineering project by Evgeny.',
        tags: inferredTags.length > 0 ? inferredTags : ['Open Source', 'Software'],
        githubUrl: repo.html_url,
        demoUrl: repo.homepage || undefined,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.updated_at.split('T')[0],
        featured: false,
        language: repo.language || undefined,
        mockupType: 'generic',
      };
    });

    // Make sure all featured projects (including custom ones like Вкапибара and EverUs) are preserved
    const finalProjects: Project[] = [...FEATURED_PROJECTS];
    for (const p of mapped) {
      if (!finalProjects.some((fp) => fp.id.toLowerCase() === p.id.toLowerCase() || fp.title.toLowerCase() === p.title.toLowerCase())) {
        finalProjects.push(p);
      }
    }

    // Cache locally
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(finalProjects));
      localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
    } catch {
      // Ignore
    }

    return { repos: finalProjects, fromCache: false };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return {
      repos: ALL_LOCAL_PROJECTS,
      fromCache: true,
      error: errorMsg,
    };
  }
}
