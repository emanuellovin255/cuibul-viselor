import type { ImageMetadata } from 'astro';

const modules = import.meta.glob<{ default: ImageMetadata }>('/src/assets/photos/**/*.{jpg,jpeg,JPG,JPEG}', {
  eager: true,
});

const ROOT = '/src/assets/photos/';
const all = Object.entries(modules).sort(([a], [b]) => a.localeCompare(b));

/** Toate pozele dintr-un folder (fără subfoldere), sortate după nume. */
export function photos(folder: string): ImageMetadata[] {
  const prefix = `${ROOT}${folder.replace(/^\/|\/$/g, '')}/`;
  return all
    .filter(([path]) => path.startsWith(prefix) && !path.slice(prefix.length).includes('/'))
    .map(([, mod]) => mod.default);
}

/**
 * O poză anume, ex. photo('exterior/02'). Dacă a fost ștearsă din panou, site-ul nu cade:
 * se folosește prima poză din același folder, apoi prima poză din site.
 */
export function photo(path: string | undefined): ImageMetadata {
  const clean = (path ?? '').replace(/^\//, '').replace(/\.(jpe?g|JPE?G)$/, '');
  const exact = ['jpg', 'jpeg', 'JPG', 'JPEG'].map((ext) => modules[`${ROOT}${clean}.${ext}`]).find(Boolean);
  if (exact) return exact.default;
  const folder = clean.includes('/') ? clean.slice(0, clean.lastIndexOf('/')) : clean;
  return photos(folder)[0] ?? modules[`${ROOT}exterior/02.jpg`]?.default ?? all[0][1].default;
}

/** Prima poză dintr-un folder, cu aceeași plasă de siguranță. */
export const cover = (folder: string) => photos(folder)[0] ?? photo(folder);
