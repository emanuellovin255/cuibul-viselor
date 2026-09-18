# Pensiunea Cuibul Viselor – La Johnny

Site-ul Pensiunii Cuibul Viselor din Băile Herculane, pe malul Cernei.

**Live:** https://emanuellovin255.github.io/cuibul-viselor/

## Tehnologii

- [Astro](https://astro.build) – site static, rapid, cu imagini optimizate automat (WebP, srcset)
- Tailwind CSS v4
- GSAP + ScrollTrigger + SplitText (animații la scroll), Lenis (smooth scroll)
- PhotoSwipe (galerie foto cu lightbox)
- Fonturi self-hosted: Fraunces și Manrope

## Comenzi

```bash
npm install          # instalează dependențele
npm run dev          # server local pe http://localhost:4321/cuibul-viselor
npm run build        # generează site-ul în dist/
npm run preview      # previzualizează build-ul
npm run deploy       # construiește și publică site-ul pe GitHub Pages (ramura gh-pages)
npm run fetch-images # re-descarcă pozele originale în src/assets/photos/_raw
```

## Structură

```
src/
  data/          # conținutul site-ului: contact, camere, tarife, facilități, recenzii, împrejurimi
  assets/photos/ # pozele, pe categorii (camere/<cameră>, exterior, gradina, rau, restaurant, imprejurimi…)
  components/    # componente reutilizabile (Header, Footer, RoomCard, Gallery…)
  layouts/       # layout-ul de bază (SEO, meta, JSON-LD)
  pages/         # paginile site-ului
  scripts/       # animații și logica formularelor
  styles/        # design system (culori, tipografie, componente CSS)
```

### Actualizarea conținutului

- **Tarife, camere, dotări:** `src/data/rooms.ts`
- **Telefon, email, adresă, prețuri masă, politici, întrebări frecvente:** `src/data/site.ts`
- **Facilități:** `src/data/facilities.ts`
- **Recenzii:** `src/data/reviews.ts`
- **Poze:** puneți fișierele `.jpg` în folderul potrivit din `src/assets/photos/`. Ordinea este dată de numele fișierului (`01.jpg`, `02.jpg`…), iar prima poză dintr-un folder de cameră devine coperta camerei.

## Deploy

Site-ul se publică pe GitHub Pages din ramura `gh-pages`. După orice modificare:

```bash
npm run deploy
```

Pentru un domeniu propriu (ex. `cuibulviselor.ro`), în `astro.config.mjs` setați `site: 'https://www.cuibulviselor.ro'`, ștergeți `base` și adăugați fișierul `public/CNAME`.

## Surse de conținut

Texte, tarife și fotografii preluate de pe site-ul vechi al pensiunii (cuibulviselor.ro) și de pe pagina pensiunii de pe Booking.com.
