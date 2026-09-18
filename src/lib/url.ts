const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefixează rutele interne cu base path-ul site-ului (GitHub Pages). */
export function url(path = '/'): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}` || '/';
}

/** Compară ruta curentă cu un link din meniu. */
export function isActive(current: string, href: string): boolean {
  const strip = (p: string) => p.replace(base, '').replace(/\/$/, '') || '/';
  const c = strip(current);
  const h = strip(href);
  return h === '/' ? c === '/' : c === h || c.startsWith(`${h}/`);
}
