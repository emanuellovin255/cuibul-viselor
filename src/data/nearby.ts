import { imprejurimi as i } from '../lib/continut';

/** Distanțe aproximative față de pensiune. */
export const nearby = i.distante.map((d) => ({ name: d.loc, km: d.km }));

export const excursions = i.excursii.filter(Boolean);

export const timeline = i.istorie.momente.map((m) => ({ year: m.an, title: m.titlu, text: m.text }));

export const resortFacts = i.cifre.map((c) => ({ value: c.valoare, label: c.text }));
