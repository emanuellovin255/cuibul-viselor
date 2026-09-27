import { recenzii as r } from '../lib/continut';

export const rating = {
  score: Number(r.scor) || 0,
  label: r.calificativ,
  count: Number(r.numarEvaluari) || 0,
  source: r.sursa,
};

export const ratingCategories = r.categorii.map((c) => ({ label: c.nume, score: Number(c.scor) || 0 }));

export const reviews = r.recenzii.filter((x) => x.text?.trim()).map((x) => ({ name: x.nume, country: x.tara, text: x.text }));

export const showReviews = r.afiseaza !== false;

export const formatScore = (n: number) => n.toFixed(1).replace('.', ',');
