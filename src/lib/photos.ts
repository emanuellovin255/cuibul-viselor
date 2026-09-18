import type { ImageMetadata } from 'astro';

const modules = import.meta.glob<{ default: ImageMetadata }>('/src/assets/photos/**/*.jpg', {
  eager: true,
});

const ROOT = '/src/assets/photos/';

/** Toate pozele dintr-un folder (fără subfoldere), sortate după nume. */
export function photos(folder: string): ImageMetadata[] {
  const prefix = `${ROOT}${folder}/`;
  return Object.entries(modules)
    .filter(([path]) => path.startsWith(prefix) && !path.slice(prefix.length).includes('/'))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, mod]) => mod.default);
}

/** O poză anume, ex. photo('exterior/01'). */
export function photo(path: string): ImageMetadata {
  const mod = modules[`${ROOT}${path}.jpg`];
  if (!mod) throw new Error(`Poza lipsește: ${path}`);
  return mod.default;
}
