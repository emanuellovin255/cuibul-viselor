# Panoul de administrare

Adresa: **https://cuibulviselor.ro/admin**

Gazda intră cu o parolă și schimbă tot ce e pe site: textele tuturor paginilor, prețurile,
camerele (adaugă / șterge / reordonează), preparatele, facilitățile, recenziile, întrebările
frecvente, oferta de sub titlu, pozele și videoul din hero. Fiecare salvare este un commit pe
`main`, iar Vercel republică site-ul singur în 1–2 minute.

## Activare (o singură dată)

Panoul are nevoie de trei variabile în Vercel. Până nu sunt puse, ecranul de intrare spune ce lipsește.

### 1. Tokenul GitHub

1. GitHub → **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**
2. Nume: `cuibul-viselor-panou`, expirare: cât doriți (ex. 1 an)
3. **Repository access → Only select repositories →** `emanuellovin255/cuibul-viselor`
4. **Permissions → Repository permissions → Contents: Read and write**
5. Generate token și copiați-l (apare o singură dată)

### 2. Variabilele în Vercel

Vercel → proiectul `cuibul-viselor` → **Settings → Environment Variables**, pentru *Production*:

| Nume | Valoare |
|---|---|
| `ADMIN_PAROLA` | parola pe care o dați gazdei |
| `ADMIN_SECRET` | un șir lung și aleator (ex. rezultatul comenzii `openssl rand -hex 32`) |
| `GITHUB_TOKEN` | tokenul de la pasul 1 |

Opționale: `GITHUB_REPO` (implicit `emanuellovin255/cuibul-viselor`), `GITHUB_BRANCH` (implicit `main`).

### 3. Redeploy

Vercel → **Deployments → ⋯ → Redeploy**, ca variabilele să intre în funcție.

## Cum e construit

- **Conținutul** stă în `src/continut/*.json` (câte un fișier pe pagină). Paginile Astro îl citesc la build.
- **Pozele** stau în `src/assets/photos/<folder>/`, numerotate `01.jpg`, `02.jpg`… Ordinea pe site e dată de nume;
  prima poză dintr-un folder de cameră e coperta. Panoul le micșorează la 2000 px înainte de încărcare.
- **Videoul** din hero stă în `public/video/`. Prin panou se pot încărca videouri de până la 3 MB
  (limita funcțiilor Vercel); unul mai mare se pune direct în repo.
- **Funcția** `api/admin.js` (Vercel) verifică parola, semnează cookie-ul de sesiune (12 ore, HMAC)
  și scrie în repo prin API-ul GitHub, cu `sha` — două salvări simultane nu se suprascriu tăcut.
- **Formularele** din panou se generează singure din JSON: un câmp nou adăugat într-un fișier apare automat.
- Titlurile folosesc `*steluțe*` pentru partea scrisă cursiv și colorat, ex. `Cuibul *Viselor*`.
- O poză ștearsă care mai era folosită undeva nu strică site-ul: se folosește prima poză din același folder.

Panoul funcționează doar pe varianta de pe Vercel (GitHub Pages nu are funcții de server).
