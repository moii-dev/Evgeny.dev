// Storage can be unavailable even when window.localStorage exists.
export const storage = {
  get(key: string): string | null {
    try { return localStorage.getItem(key); } catch { return null; }
  },
  set(key: string, value: string): boolean {
    try { localStorage.setItem(key, value); return true; } catch { return false; }
  },
  remove(key: string): boolean {
    try { localStorage.removeItem(key); return true; } catch { return false; }
  },
};

export function readJson(key: string): unknown {
  const value = storage.get(key);
  if (value === null) return null;
  try { return JSON.parse(value) as unknown; } catch { return null; }
}
