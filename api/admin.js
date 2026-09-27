/**
 * Panoul de administrare – funcția de pe server (Vercel).
 *
 * Tot conținutul site-ului stă în repo: textele în src/continut/*.json, pozele în src/assets/photos/.
 * Panoul citește și scrie prin API-ul GitHub (Contents), cu `sha`, deci două salvări simultane
 * nu se suprascriu tăcut. Fiecare salvare = un commit pe `main`, iar Vercel republică site-ul singur.
 *
 * Variabile de mediu (Vercel → Settings → Environment Variables):
 *   ADMIN_PAROLA   parola cu care se intră în panou
 *   ADMIN_SECRET   un șir lung, aleator, pentru semnarea cookie-ului de sesiune
 *   GITHUB_TOKEN   token GitHub cu drept „Contents: Read and write” pe repo
 *   GITHUB_REPO    opțional, implicit emanuellovin255/cuibul-viselor
 *   GITHUB_BRANCH  opțional, implicit main
 */
import { createHmac, timingSafeEqual } from 'node:crypto';

const REPO = process.env.GITHUB_REPO || 'emanuellovin255/cuibul-viselor';
const BRANCH = process.env.GITHUB_BRANCH || 'main';
const TOKEN = process.env.GITHUB_TOKEN || '';
const PAROLA = process.env.ADMIN_PAROLA || '';
const SECRET = process.env.ADMIN_SECRET || '';

const COOKIE = 'cv_admin';
const DURATA = 60 * 60 * 12; // 12 ore

const FISIERE = ['general', 'acasa', 'camere', 'restaurant', 'facilitati', 'imprejurimi', 'recenzii', 'rezervare', 'galerie'];
const DIR_POZE = 'src/assets/photos/';
const DIR_VIDEO = 'public/video/';
const POZA_OK = /^[a-z0-9-]+(\/[a-z0-9-]+)?\/[a-z0-9-]+\.jpe?g$/;
const VIDEO_OK = /^[a-z0-9-]+\.(mp4|jpg)$/;

/* ---------- sesiune ---------- */

const semn = (s) => createHmac('sha256', SECRET).update(s).digest('hex');

function egal(a, b) {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
}

function cookies(req) {
  return Object.fromEntries(
    (req.headers.cookie || '')
      .split(';')
      .map((c) => c.trim().split('='))
      .filter(([k]) => k)
      .map(([k, ...v]) => [k, decodeURIComponent(v.join('='))]),
  );
}

function autentificat(req) {
  if (!SECRET) return false;
  const [exp, sig] = (cookies(req)[COOKIE] || '').split('.');
  if (!exp || !sig || !egal(sig, semn(exp))) return false;
  return Number(exp) > Date.now() / 1000;
}

function seteazaSesiune(res) {
  const exp = String(Math.floor(Date.now() / 1000) + DURATA);
  res.setHeader('Set-Cookie', `${COOKIE}=${exp}.${semn(exp)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${DURATA}`);
}

// Încetinește ghicirea parolei: câte o fereastră de 5 minute pe IP (pe instanța curentă).
const incercari = new Map();
function prea_multe(ip) {
  const acum = Date.now();
  const e = incercari.get(ip) || { n: 0, t: acum };
  if (acum - e.t > 5 * 60 * 1000) Object.assign(e, { n: 0, t: acum });
  e.n += 1;
  incercari.set(ip, e);
  return e.n > 8;
}

/* ---------- GitHub ---------- */

async function gh(cale, init = {}) {
  const res = await fetch(`https://api.github.com/repos/${REPO}${cale}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'cuibul-viselor-admin',
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
    },
  });
  const date = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(date.message || `GitHub ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return date;
}

const citeste = (cale) => gh(`/contents/${encodeURI(cale)}?ref=${BRANCH}`);

const scrie = (cale, base64, sha, mesaj) =>
  gh(`/contents/${encodeURI(cale)}`, {
    method: 'PUT',
    body: JSON.stringify({ message: mesaj, content: base64, branch: BRANCH, ...(sha ? { sha } : {}) }),
  });

const sterge = (cale, sha, mesaj) =>
  gh(`/contents/${encodeURI(cale)}`, {
    method: 'DELETE',
    body: JSON.stringify({ message: mesaj, sha, branch: BRANCH }),
  });

/* ---------- handler ---------- */

function trimite(res, cod, date) {
  res.statusCode = cod;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex');
  res.end(JSON.stringify(date));
}

export default async function handler(req, res) {
  const actiune = new URL(req.url, 'http://x').searchParams.get('actiune') || '';
  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};

  try {
    if (actiune === 'stare') {
      return trimite(res, 200, {
        configurat: Boolean(PAROLA && SECRET && TOKEN),
        lipsesc: [!PAROLA && 'ADMIN_PAROLA', !SECRET && 'ADMIN_SECRET', !TOKEN && 'GITHUB_TOKEN'].filter(Boolean),
        autentificat: autentificat(req),
        repo: REPO,
        branch: BRANCH,
      });
    }

    if (actiune === 'intra' && req.method === 'POST') {
      if (!PAROLA || !SECRET) return trimite(res, 503, { eroare: 'Panoul nu este configurat încă (lipsesc variabilele din Vercel).' });
      const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'necunoscut';
      if (prea_multe(ip)) return trimite(res, 429, { eroare: 'Prea multe încercări. Mai încercați peste 5 minute.' });
      if (!egal(body.parola || '', PAROLA)) {
        await new Promise((r) => setTimeout(r, 800));
        return trimite(res, 401, { eroare: 'Parolă greșită.' });
      }
      incercari.delete(ip);
      seteazaSesiune(res);
      return trimite(res, 200, { ok: true });
    }

    if (actiune === 'iesi') {
      res.setHeader('Set-Cookie', `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`);
      return trimite(res, 200, { ok: true });
    }

    // De aici în jos, doar cu sesiune.
    if (!autentificat(req)) return trimite(res, 401, { eroare: 'Sesiunea a expirat. Intrați din nou.' });
    if (!TOKEN) return trimite(res, 503, { eroare: 'Lipsește GITHUB_TOKEN în Vercel.' });

    if (actiune === 'citeste') {
      const fisier = String(body.fisier || new URL(req.url, 'http://x').searchParams.get('fisier') || '');
      if (!FISIERE.includes(fisier)) return trimite(res, 400, { eroare: 'Fișier necunoscut.' });
      const f = await citeste(`src/continut/${fisier}.json`);
      const text = Buffer.from(f.content, 'base64').toString('utf8');
      return trimite(res, 200, { continut: JSON.parse(text), sha: f.sha });
    }

    if (actiune === 'salveaza' && req.method === 'POST') {
      const { fisier, continut, sha } = body;
      if (!FISIERE.includes(fisier)) return trimite(res, 400, { eroare: 'Fișier necunoscut.' });
      if (!continut || typeof continut !== 'object') return trimite(res, 400, { eroare: 'Conținut invalid.' });
      const text = `${JSON.stringify(continut, null, 2)}\n`;
      const r = await scrie(`src/continut/${fisier}.json`, Buffer.from(text, 'utf8').toString('base64'), sha, `Panou: actualizează ${fisier}`);
      return trimite(res, 200, { ok: true, sha: r.content.sha });
    }

    if (actiune === 'poze') {
      const tree = await gh(`/git/trees/${BRANCH}?recursive=1`);
      const poze = tree.tree
        .filter((n) => n.type === 'blob' && n.path.startsWith(DIR_POZE) && /\.(jpe?g)$/i.test(n.path))
        .map((n) => ({ cale: n.path.slice(DIR_POZE.length), sha: n.sha, marime: n.size }));
      const video = tree.tree
        .filter((n) => n.type === 'blob' && n.path.startsWith(DIR_VIDEO))
        .map((n) => ({ cale: n.path.slice(DIR_VIDEO.length), sha: n.sha, marime: n.size }));
      return trimite(res, 200, { poze, video, raw: `https://raw.githubusercontent.com/${REPO}/${BRANCH}/` });
    }

    if (actiune === 'incarca' && req.method === 'POST') {
      const { cale, base64, sha, tip } = body;
      const video = tip === 'video';
      if (video ? !VIDEO_OK.test(cale || '') : !POZA_OK.test(cale || '')) {
        return trimite(res, 400, { eroare: 'Nume de fișier invalid (doar litere mici, cifre și cratimă).' });
      }
      if (!base64 || typeof base64 !== 'string') return trimite(res, 400, { eroare: 'Fișier gol.' });
      const dir = video ? DIR_VIDEO : DIR_POZE;
      let shaExistent = sha;
      if (!shaExistent) {
        try {
          shaExistent = (await citeste(dir + cale)).sha;
        } catch {
          shaExistent = undefined;
        }
      }
      const r = await scrie(dir + cale, base64, shaExistent, `Panou: ${shaExistent ? 'înlocuiește' : 'adaugă'} ${video ? 'video' : 'poza'} ${cale}`);
      return trimite(res, 200, { ok: true, sha: r.content.sha });
    }

    if (actiune === 'sterge' && req.method === 'POST') {
      const { cale, sha, tip } = body;
      const video = tip === 'video';
      if (video ? !VIDEO_OK.test(cale || '') : !POZA_OK.test(cale || '')) return trimite(res, 400, { eroare: 'Fișier invalid.' });
      await sterge((video ? DIR_VIDEO : DIR_POZE) + cale, sha, `Panou: șterge ${cale}`);
      return trimite(res, 200, { ok: true });
    }

    if (actiune === 'publicari') {
      const commits = await gh(`/commits?sha=${BRANCH}&per_page=8`);
      return trimite(res, 200, {
        commits: commits.map((c) => ({ mesaj: c.commit.message.split('\n')[0], data: c.commit.author.date, sha: c.sha.slice(0, 7) })),
      });
    }

    return trimite(res, 404, { eroare: 'Acțiune necunoscută.' });
  } catch (e) {
    const cod = e.status === 409 ? 409 : e.status === 422 ? 409 : 500;
    const mesaj =
      cod === 409
        ? 'Cineva a modificat fișierul între timp. Reîncărcați pagina și refaceți modificarea.'
        : `Eroare: ${e.message}`;
    return trimite(res, cod, { eroare: mesaj });
  }
}

