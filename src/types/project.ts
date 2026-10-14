export interface Project {
  id: string;
  number: string; // e.g. "01", "02"
  title: string;
  category: string;
  description: string;
  longDescription?: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  stars?: number;
  forks?: number;
  updatedAt?: string;
  featured: boolean;
  language?: string;
  mockupType: 'freechat' | 'vkapibara' | 'everus' | 'focuslock' | 'generic';
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
  topics?: string[];
}
