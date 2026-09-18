// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://emanuellovin255.github.io',
  base: '/cuibul-viselor',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
