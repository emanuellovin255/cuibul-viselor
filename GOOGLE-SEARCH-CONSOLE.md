# Google Search Console – pașii pentru Cuibul Viselor

Site-ul e deja pregătit: are `sitemap.xml`, `robots.txt` care arată spre sitemap, titluri și
descrieri pe fiecare pagină, date structurate (LodgingBusiness) și un câmp în panou pentru codul
de verificare Google. Panoul `/admin` și `/api/` sunt excluse din indexare.

**Adresa site-ului:** https://cuibulviselor.ro
**Sitemap:** https://cuibulviselor.ro/sitemap.xml

> Dacă schimbați vreodată domeniul, schimbați întâi adresa în panou: **Setări generale → SEO și
> Google → Adresa site-ului**, salvați, apoi refaceți pașii de mai jos cu domeniul nou.

## 1. Adăugați proprietatea

1. Intrați pe https://search.google.com/search-console cu contul Google al pensiunii.
2. **Adăugați o proprietate → Prefix URL** și scrieți `https://cuibulviselor.ro/`
   (cu `https://` și cu `/` la final). Apăsați **Continuați**.

## 2. Verificați că site-ul e al dumneavoastră

1. Din metodele de verificare, alegeți **Etichetă HTML**.
2. Google arată o linie de forma `<meta name="google-site-verification" content="ABC123…" />`.
   Copiați-o toată.
3. Deschideți https://cuibulviselor.ro/admin → **Setări generale** → secțiunea
   **SEO și Google** → câmpul **Cod de verificare Google Search Console**. Lipiți linia
   (se ia singur doar codul) și apăsați **Salvează și publică**.
4. Așteptați 2 minute (până se republică site-ul), apoi în Search Console apăsați **Verificați**.

> Nu închideți fereastra Search Console între pașii 2 și 4. Codul rămâne pe site pentru totdeauna —
> dacă îl ștergeți, Google pierde verificarea.

## 3. Trimiteți sitemap-ul

1. În Search Console, meniul din stânga → **Sitemapuri**.
2. La „Adăugați un sitemap nou” scrieți `sitemap.xml` și apăsați **Trimiteți**.
3. Starea trebuie să devină **Reușit** (poate dura câteva ore). Google găsește 13 pagini:
   acasă, camere (+ 6 pagini de cameră), restaurant, facilități, împrejurimi, galerie, rezervare.

## 4. Cereți indexarea paginii principale (opțional, grăbește lucrurile)

1. Sus, în bara **Inspectați orice adresă URL**, lipiți `https://cuibulviselor.ro/`.
2. Apăsați **Solicitați indexarea**. Repetați pentru `/camere/` și `/rezervare/` dacă vreți.

## 5. Google Business Profile (recomandat)

Pe https://business.google.com, la profilul pensiunii, puneți la **Site web** adresa
`https://cuibulviselor.ro`. Așa apare site-ul și în Google Maps.

## Ce urmăriți după 1–2 săptămâni

- **Performanță**: pentru ce căutări apare site-ul și câte clicuri primește.
- **Pagini**: câte pagini sunt indexate; orice pagină „neindexată” are motivul scris lângă ea.
- De fiecare dată când adăugați o cameră nouă din panou, ea intră singură în sitemap.
