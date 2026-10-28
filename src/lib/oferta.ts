/**
 * Oferta specială (src/continut/oferte.json). Fișier separat, fără celelalte JSON-uri,
 * ca să poată fi folosit și în browser: site-ul nu se reconstruiește zilnic, așa că
 * după data de final oferta trebuie ascunsă direct în pagină.
 */
import oferte from '../continut/oferte.json';

/** Oferta e activă dacă e bifată și data de final (AAAA-LL-ZZ, inclusiv) n-a trecut. */
export function ofertaActiva(azi = new Date()): boolean {
  if (!oferte.afiseaza) return false;
  const end = /^\d{4}-\d{2}-\d{2}$/.test(oferte.valabilPanaLa ?? '') ? new Date(`${oferte.valabilPanaLa}T23:59:59`) : null;
  return !end || azi <= end;
}
