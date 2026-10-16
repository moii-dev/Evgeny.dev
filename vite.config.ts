import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const site = env.VITE_SITE_URL ? new URL(env.VITE_SITE_URL) : null;
  if (site && (!['https:', 'http:'].includes(site.protocol) || site.username || site.password || site.search || site.hash)) throw new Error('VITE_SITE_URL must be a public HTTP(S) site URL.');
  const base = env.VITE_BASE_PATH || (site ? `${site.pathname.replace(/\/$/, '')}/` : '/');
  let resolvedBase = base;
  return {
    base,
    plugins: [react(), tailwindcss(), {
      name: 'portfolio-social-metadata',
      configResolved(config) { resolvedBase = config.base; },
      transformIndexHtml() {
        const image = site ? new URL('assets/social-preview.png', `${site.href.replace(/\/$/, '')}/`).href : `${resolvedBase}assets/social-preview.png`;
        return [
          { tag: 'meta', attrs: { property: 'og:image', content: image } },
          { tag: 'meta', attrs: { property: 'og:image:type', content: 'image/png' } },
          { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
          { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
          { tag: 'meta', attrs: { property: 'og:image:alt', content: 'Evgeny.dev — Building Digital Experiences' } },
          { tag: 'meta', attrs: { name: 'twitter:image', content: image } },
          { tag: 'meta', attrs: { name: 'twitter:image:alt', content: 'Evgeny.dev developer portfolio' } },
          ...(site ? [{ tag: 'meta', attrs: { property: 'og:url', content: site.href } }, { tag: 'link', attrs: { rel: 'canonical', href: site.href } }] : []),
        ];
      },
    }],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname || '.', '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
