import { useEffect, useState } from 'react';
import type { Project } from '../types/project';
import { storage } from '../utils/storage';
import { imageUrl } from '../utils/urls';

function readCover(id: string): string | null {
  const saved = storage.get(`evgeny_project_cover_${id}`);
  const value = saved === null && id === 'gamma-cleaner' ? storage.get('evgeny_project_cover_gamma-pptx-watermark-cleaner') : saved;
  return imageUrl(value) ? value : null;
}

export function useProjectCovers(projects: Project[], onPersistence: (saved: boolean) => void) {
  const [covers, setCovers] = useState<Record<string, string | null>>(() => Object.fromEntries(projects.map(project => [project.id, readCover(project.id)])));
  useEffect(() => {
    setCovers(previous => {
      const missing = projects.filter(project => !(project.id in previous));
      return missing.length ? { ...previous, ...Object.fromEntries(missing.map(project => [project.id, readCover(project.id)])) } : previous;
    });
  }, [projects]);
  const saveCover = (id: string, value: string | null) => {
    setCovers(previous => ({ ...previous, [id]: value }));
    const key = `evgeny_project_cover_${id}`;
    // A tombstone also overrides legacy alias keys without deleting the user's old data.
    onPersistence(storage.set(key, value === null ? 'null' : value));
  };
  return { covers, saveCover };
}
