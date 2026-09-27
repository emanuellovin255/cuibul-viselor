/**
 * Tot conținutul editabil al site-ului stă în src/continut/*.json.
 * Fișierele se modifică din panoul de la /admin (fiecare salvare = un commit),
 * iar site-ul se reconstruiește singur pe Vercel.
 */
import general from '../continut/general.json';
import acasa from '../continut/acasa.json';
import camere from '../continut/camere.json';
import restaurant from '../continut/restaurant.json';
import facilitati from '../continut/facilitati.json';
import imprejurimi from '../continut/imprejurimi.json';
import recenzii from '../continut/recenzii.json';
import rezervare from '../continut/rezervare.json';
import galerie from '../continut/galerie.json';

export { general, acasa, camere, restaurant, facilitati, imprejurimi, recenzii, rezervare, galerie };

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Titlurile folosesc *steluțe* pentru partea scrisă cursiv, ex. „Cuibul *Viselor*”.
 * Întoarce HTML sigur (textul e escapat), de folosit cu set:html.
 */
export function em(text: string | undefined, cls = ''): string {
  const klass = ['italic-serif', cls].filter(Boolean).join(' ');
  return escape(text ?? '').replace(/\*([^*]+)\*/g, `<em class="${klass}">$1</em>`);
}

/** Același text, fără steluțe (pentru alt, title, meta). */
export const plain = (text: string | undefined) => (text ?? '').replace(/\*/g, '');

/** 0756 06 33 77 → +40756063377 */
export function phoneIntl(phone: string): string {
  let d = phone.replace(/\D/g, '');
  if (d.startsWith('00')) d = d.slice(2);
  if (d.startsWith('0')) d = `40${d.slice(1)}`;
  return `+${d}`;
}
