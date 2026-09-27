import { camere } from '../lib/continut';

export interface Room {
  slug: string;
  name: string;
  /** Numele pe scurt, pentru carduri și formulare. */
  short: string;
  price: number;
  guests: number;
  size: number;
  beds: string[];
  highlight: string;
  intro: string;
  description: string;
  views: string[];
  features: string[];
  note?: string;
  /** Folderul de poze din src/assets/photos/ */
  folder: string;
}

const slugify = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const rooms: Room[] = camere.camere
  .filter((c) => c.nume?.trim())
  .map((c) => ({
    slug: c.slug?.trim() || slugify(c.nume),
    name: c.nume,
    short: c.numeScurt || c.nume,
    price: Number(c.pret) || 0,
    guests: Number(c.persoane) || 0,
    size: Number(c.suprafata) || 0,
    beds: (c.paturi ?? []).filter(Boolean),
    highlight: c.evidentiere,
    intro: c.intro,
    description: c.descriere,
    views: (c.vedere ?? []).filter(Boolean),
    features: (c.dotari ?? []).filter(Boolean),
    note: c.nota || undefined,
    folder: c.folderPoze || `camere/${slugify(c.nume)}`,
  }));

/** Dotări prezente în toate camerele. */
export const commonAmenities = camere.dotariComune.filter(Boolean);

const prices = rooms.map((r) => r.price).filter((p) => p > 0);
export const minPrice = prices.length ? Math.min(...prices) : 0;
