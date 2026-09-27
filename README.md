# Pensiunea Cuibul Viselor – La Johnny

Site-ul Pensiunii Cuibul Viselor din Băile Herculane, pe malul Cernei.

**Live:** https://cuibulviselor.ro

## Tehnologii

- [Astro](https://astro.build) – site static, rapid, cu imagini optimizate automat (WebP, srcset)
- Tailwind CSS v4
- GSAP + ScrollTrigger + SplitText (animații la scroll), Lenis (smooth scroll)
- PhotoSwipe (galerie foto cu lightbox)
- Fonturi self-hosted: Fraunces și Manrope
- [Supabase](https://supabase.com) – baza de date pentru cererile de rezervare + Edge Function care trimite emailul

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
  continut/      # conținutul editabil din panou (JSON, câte un fișier pe pagină)
  data/          # adaptoare care transformă conținutul pentru pagini
  assets/photos/ # pozele, pe categorii (camere/<cameră>, exterior, gradina, rau, restaurant, imprejurimi…)
  components/    # componente reutilizabile (Header, Footer, RoomCard, Gallery…)
  layouts/       # layout-ul de bază (SEO, meta, JSON-LD)
  pages/         # paginile site-ului
  scripts/       # animații și logica formularelor
  styles/        # design system (culori, tipografie, componente CSS)
api/
  admin.js       # funcția Vercel a panoului /admin (parolă + commit prin API-ul GitHub)
public/
  admin/         # interfața panoului
  video/         # videoul din hero
supabase/
  migrations/    # schema bazei de date (SQL)
  functions/     # Edge Functions (rezervare)
```

### Actualizarea conținutului

Totul se editează din panoul de la **`/admin`** (parolă, fiecare salvare = un commit, Vercel republică singur).
Activarea panoului și cum e construit: [`ADMIN.md`](ADMIN.md). Pașii pentru Google: [`GOOGLE-SEARCH-CONSOLE.md`](GOOGLE-SEARCH-CONSOLE.md).

De mână, conținutul stă în:

- **Texte, prețuri, camere, preparate, facilități, recenzii, întrebări:** `src/continut/*.json` (câte un fișier pe pagină)
- **Poze:** `src/assets/photos/<folder>/01.jpg, 02.jpg…` – ordinea e dată de nume; prima poză a unei camere e coperta
- **Videoul din hero:** `public/video/cuibul-viselor.mp4` (calea se schimbă în `src/continut/acasa.json` → `hero.video`)
- **Videoul de prezentare (după Camere):** `public/video/prezentare.mp4`, originalul cu sonor, neretușat (se schimbă în `acasa.json` → `film`)

Titlurile folosesc `*steluțe*` pentru partea scrisă cursiv, ex. `Cuibul *Viselor*`.

Rezervările se fac doar pe WhatsApp sau pe email (formularul de pe `/rezervare` are câte un buton pentru fiecare).

## Formularul de contact și baza de date

Cererile trimise din formularul de pe `/rezervare` ajung într-o bază de date Supabase și, de acolo,
pe email la **cuibulviselor@yahoo.com**.

```
Formular (browser)
      │  POST, cu cheia publică anon
      ▼
Edge Function „rezervare”  ──►  tabelul public.rezervari   (salvare, cu service_role)
      │
      └──►  Resend API      ──►  cuibulviselor@yahoo.com    (notificare pe email)
```

**Proiectul Supabase:** `cuibul-viselor` (ref `cehodvfczjliyueltast`, regiunea Frankfurt)
· [Dashboard](https://supabase.com/dashboard/project/cehodvfczjliyueltast)
· [Cererile primite](https://supabase.com/dashboard/project/cehodvfczjliyueltast/editor)

### De ce trece totul prin Edge Function

Tabelul `rezervari` are RLS activ și **nicio politică**, iar rolurile `anon` și `authenticated` nu au
niciun drept pe el. Cheia publică din browser nu poate deci nici să citească, nici să scrie direct în
tabel — scrie doar Edge Function-ul, cu cheia de service care rămâne pe server. În plus, funcția
validează datele, are o capcană pentru roboți (câmpul ascuns `website`) și refuză două trimiteri de
la același număr de telefon în mai puțin de un minut.

### Variabile de mediu

Pentru build (fișierul `.env`, după modelul din `.env.example`):

```
PUBLIC_SUPABASE_URL=https://cehodvfczjliyueltast.supabase.co
PUBLIC_SUPABASE_ANON_KEY=<cheia anon>
```

Aceleași două variabile trebuie adăugate și în Vercel: *Project Settings → Environment Variables*.
Fără ele, formularul nu se blochează: revine automat la varianta veche, care deschide aplicația de
email a vizitatorului.

### Trimiterea emailurilor (Resend)

Emailul pleacă doar dacă există secretul `RESEND_API_KEY`. Fără el, cererea **tot se salvează** în
baza de date, iar coloana `email_eroare` spune de ce nu a plecat notificarea.

Pași de configurare:

1. Cont gratuit pe [resend.com](https://resend.com) (3000 de emailuri pe lună).
2. La *Domains*, adăugați și verificați un domeniu propriu (ex. `cuibulviselor.ro`). **Este
   obligatoriu**: domeniul de test al Resend poate trimite numai către adresa cu care v-ați
   înregistrat, deci nu și către Yahoo.
3. La *API Keys*, creați o cheie și rulați:

```bash
supabase secrets set RESEND_API_KEY=re_xxxxxxxx --project-ref cehodvfczjliyueltast
supabase secrets set MAIL_FROM="Cuibul Viselor <rezervari@cuibulviselor.ro>" --project-ref cehodvfczjliyueltast
```

Destinatarul este deja setat (`MAIL_TO=cuibulviselor@yahoo.com`); îl schimbați la fel, cu
`supabase secrets set MAIL_TO=...`.

### Modificarea bazei de date sau a funcției

```bash
supabase db push --linked                 # aplică migrările noi din supabase/migrations/
supabase functions deploy rezervare       # publică Edge Function-ul
supabase functions logs rezervare         # vede erorile în timp real
```

Dacă site-ul se mută pe alt domeniu, adăugați-l în lista `ALLOWED` din
`supabase/functions/_shared/cors.ts` și redeployați funcția — altfel browserul blochează
trimiterile de pe noul domeniu.

### Tabelul `rezervari`

| Coloană | Ce conține |
| --- | --- |
| `creat_la` | data și ora cererii |
| `status` | `noua` → `contactat` → `confirmata` / `anulata`, modificabil din dashboard |
| `sosire`, `plecare`, `nopti` | perioada sejurului (`nopti` se calculează automat) |
| `adulti`, `copii`, `camera_nume` | detaliile cerute în formular |
| `nume`, `telefon`, `email`, `mesaj` | datele de contact |
| `email_trimis`, `email_eroare` | dacă notificarea a plecat și, dacă nu, de ce |
| `note_interne` | spațiu pentru însemnările recepției |

Vederea `rezervari_recente` arată aceleași date, ordonate de la cea mai nouă cerere.

## Deploy

Site-ul se publică pe GitHub Pages din ramura `gh-pages`. După orice modificare:

```bash
npm run deploy
```

Pentru un domeniu propriu (ex. `cuibulviselor.ro`), în `astro.config.mjs` setați `site: 'https://www.cuibulviselor.ro'`, ștergeți `base` și adăugați fișierul `public/CNAME`. Nu uitați să adăugați noul domeniu și în lista `ALLOWED` din `supabase/functions/_shared/cors.ts`.

Oriunde publicați site-ul, cele două variabile `PUBLIC_SUPABASE_*` trebuie să existe la momentul build-ului, altfel formularul revine la trimiterea prin clientul de email al vizitatorului.

## Surse de conținut

Texte, tarife și fotografii preluate de pe site-ul vechi al pensiunii (cuibulviselor.ro) și de pe pagina pensiunii de pe Booking.com.
