export function httpUrl(value: unknown): string | undefined {
  if (typeof value !== 'string' || !value.trim()) return undefined;
  try {
    const url = new URL(value.trim());
    return ['http:', 'https:'].includes(url.protocol) && !url.username && !url.password ? url.href : undefined;
  } catch { return undefined; }
}

export function assetUrl(value: string): string {
  const base = import.meta.env?.BASE_URL || '/';
  return value.startsWith('/assets/') ? `${base}${value.slice(1)}` : value;
}

export function imageUrl(value: unknown): value is string {
  return typeof value === 'string' && (Boolean(httpUrl(value)) ||
    /^data:image\/(?:png|jpeg|webp|gif|avif|svg\+xml)[;,]/i.test(value) ||
    /^\/(?!\/)[^\s]*$/.test(value));
}
