// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';

// Pe Vercel site-ul stă în rădăcina domeniului; pe GitHub Pages, în /cuibul-viselor.
const onVercel = !!process.env.VERCEL;

// Adresa publică a site-ului se schimbă din panou (Setări generale → SEO → Adresa site-ului).
const general = JSON.parse(readFileSync(new URL('./src/continut/general.json', import.meta.url), 'utf8'));
const siteUrl = (general.seo?.adresaSite || 'https://cuibulviselor.ro').replace(/\/+$/, '');

export default defineConfig({
  site: onVercel ? siteUrl : 'https://emanuellovin255.github.io',
  base: onVercel ? '/' : '/cuibul-viselor',
  integrations: [sitemap({ filter: (page) => !page.includes('/admin') })],
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
