import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * GitHub Pages serves this project from a subpath —
 * https://rama-na.github.io/beyond-bakes/ — not from a domain root. Without a
 * matching `base`, the built HTML asks for /assets/index.js, which resolves to
 * rama-na.github.io/assets/index.js, 404s, and leaves a blank page.
 *
 * Override with VITE_BASE when deploying somewhere else:
 *   VITE_BASE=/ npm run build          → custom domain / domain root
 *   VITE_BASE=/other-repo/ npm run build
 *
 * Dev stays on '/' so localhost URLs remain clean.
 */
const REPO_BASE = '/beyond-bakes/';

export default defineConfig(({ command }) => ({
  base: process.env.VITE_BASE ?? (command === 'build' ? REPO_BASE : '/'),
  plugins: [react()],
}));
