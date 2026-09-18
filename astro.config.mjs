// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Pe Vercel site-ul stă în rădăcina domeniului; pe GitHub Pages, în /cuibul-viselor.
const onVercel = !!process.env.VERCEL;

export default defineConfig({
  site: onVercel ? 'https://cuibul-viselor.vercel.app' : 'https://emanuellovin255.github.io',
  base: onVercel ? '/' : '/cuibul-viselor',
  integrations: [sitemap()],
  build: {
    // CSS și JS în fișiere externe, fără blocuri inline în HTML
    inlineStylesheets: 'never',
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      assetsInlineLimit: 0,
    },
  },
});
