import type { Project } from '../types/project';
import { httpUrl, imageUrl } from './urls';

export function record(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isProject(value: unknown): value is Project {
  if (!record(value)) return false;
  if (!['id', 'number', 'title', 'category', 'description'].every(key => typeof value[key] === 'string')) return false;
  if (!value.id || !value.title || !httpUrl(value.githubUrl) || typeof value.featured !== 'boolean') return false;
  if (!Array.isArray(value.tags) || !value.tags.every(tag => typeof tag === 'string')) return false;
  if (!['language', 'longDescription', 'updatedAt', 'repoName'].every(key => value[key] === undefined || typeof value[key] === 'string')) return false;
  if (value.demoUrl !== undefined && !httpUrl(value.demoUrl)) return false;
  if (!['stars', 'forks'].every(key => value[key] === undefined || (typeof value[key] === 'number' && Number.isFinite(value[key]) && value[key] >= 0))) return false;
  if (value.cover !== undefined) {
    const cover = value.cover;
    if (!record(cover) || !['single', 'split', 'browser', 'editorial', 'placeholder'].includes(String(cover.variant))) return false;
    if (!['primaryImage', 'secondaryImage', 'logoUrl'].every(key => cover[key] === undefined || imageUrl(cover[key]))) return false;
    if (!['caption', 'badgeText', 'altText', 'browserUrl', 'fallbackNotice'].every(key => cover[key] === undefined || typeof cover[key] === 'string')) return false;
    if (cover.backgroundTheme !== undefined && !['silver', 'gray', 'warm-gray', 'slate', 'neutral'].includes(String(cover.backgroundTheme))) return false;
    if (cover.objectFit !== undefined && !['contain', 'cover'].includes(String(cover.objectFit))) return false;
    if (cover.requiredScreenshots !== undefined && (!Array.isArray(cover.requiredScreenshots) || !cover.requiredScreenshots.every(item => typeof item === 'string'))) return false;
  }
  return true;
}

export function isProjectList(value: unknown): value is Project[] {
  return Array.isArray(value) && value.every(isProject);
}
