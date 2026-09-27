import { general as g, restaurant as r, rezervare as rz, phoneIntl } from '../lib/continut';

const phoneE164 = phoneIntl(g.telefon);
const whatsappE164 = phoneIntl(g.whatsapp);

export const site = {
  name: g.nume,
  shortName: g.numeScurt,
  alias: g.alias,
  stars: Number(g.stele) || 0,
  description: g.descriere,
  phone: g.telefon,
  phoneE164,
  phoneHref: `tel:${phoneE164}`,
  whatsapp: g.whatsapp,
  whatsappHref: `https://wa.me/${whatsappE164.slice(1)}`,
  email: g.email,
  address: {
    street: g.adresa.strada,
    city: g.adresa.oras,
    county: g.adresa.judet,
    zip: g.adresa.codPostal,
    country: g.adresa.tara,
  },
  mapsQuery: g.cautareHarta,
  languages: g.limbi,
  checkIn: g.checkIn,
  checkOut: g.checkOut,
};

export const fullAddress = `${site.address.street}, ${site.address.city}, jud. ${site.address.county}, ${site.address.zip}`;

export const mapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&z=15&output=embed`;
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`;

export const nav = g.meniu.map((m) => ({ href: m.link, label: m.eticheta }));

export const meals = r.mese.map((m) => ({ name: m.nume, text: m.text }));

/** Cum se servește masa la restaurantul pensiunii. */
export const mealNote = r.serviciu;
export const mealNoteLong = r.serviciuDetaliat;

export const bookingSteps = rz.procedura.pasi.map((p) => ({ title: p.titlu, text: p.text }));
export const bookingRules = rz.reguli;
export const policies = rz.politici.map((p) => ({ title: p.titlu, text: p.text }));
export const faq = rz.intrebari.map((f) => ({ q: f.intrebare, a: f.raspuns }));
