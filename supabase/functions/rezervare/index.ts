// Edge Function: primește cererile din formularul de pe site,
// le salvează în tabelul `rezervari` și trimite un email la pensiune.
//
// Secrete necesare (supabase secrets set ...):
//   RESEND_API_KEY   – cheia API Resend (fără ea, cererea se salvează, dar nu pleacă emailul)
//   MAIL_TO          – destinatarul (implicit cuibulviselor@yahoo.com)
//   MAIL_FROM        – expeditorul verificat în Resend

import { createClient } from 'jsr:@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

const MAIL_TO = Deno.env.get('MAIL_TO') ?? 'cuibulviselor@yahoo.com';
const MAIL_FROM = Deno.env.get('MAIL_FROM') ?? 'Site Cuibul Viselor <onboarding@resend.dev>';
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

const admin = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  { auth: { persistSession: false } },
);

// ---------- utilitare ----------

const txt = (v: unknown, max: number): string | null => {
  if (typeof v !== 'string') return null;
  const s = v.trim().replace(/\s+/g, ' ');
  return s ? s.slice(0, max) : null;
};

const isDate = (v: unknown): v is string => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v);

const num = (v: unknown, min: number, max: number, fallback: number): number => {
  const n = Number(v);
  return Number.isFinite(n) ? Math.min(max, Math.max(min, Math.trunc(n))) : fallback;
};

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const roDate = (iso: string) => {
  const [y, m, d] = iso.split('-');
  return `${d}.${m}.${y}`;
};

const json = (body: unknown, status: number, origin: string | null) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
  });

// ---------- email ----------

interface Cerere {
  id: string;
  tip: string;
  nume: string;
  telefon: string;
  email: string | null;
  sosire: string | null;
  plecare: string | null;
  nopti: number | null;
  adulti: number;
  copii: number;
  camera_nume: string | null;
  mesaj: string | null;
}

function buildEmail(r: Cerere) {
  const perioada = r.sosire && r.plecare
    ? `${roDate(r.sosire)} – ${roDate(r.plecare)} (${r.nopti} ${r.nopti === 1 ? 'noapte' : 'nopți'})`
    : '—';

  const randuri: [string, string][] = [
    ['Perioadă', perioada],
    ['Adulți', String(r.adulti)],
    ['Copii', String(r.copii)],
    ['Cameră', r.camera_nume ?? 'Oricare / nu contează'],
    ['Nume', r.nume],
    ['Telefon', r.telefon],
    ['Email', r.email ?? '—'],
  ];

  const subject = r.tip === 'rezervare' && r.sosire && r.plecare
    ? `Cerere rezervare ${roDate(r.sosire)} – ${roDate(r.plecare)} · ${r.nume}`
    : `Mesaj de pe site · ${r.nume}`;

  const text = [
    'Cerere nouă de pe site-ul Pensiunii Cuibul Viselor.',
    '',
    ...randuri.map(([k, v]) => `${k}: ${v}`),
    '',
    r.mesaj ? `Mesaj:\n${r.mesaj}` : 'Fără mesaj.',
    '',
    `ID cerere: ${r.id}`,
  ].join('\n');

  const html = `<!doctype html><html lang="ro"><body style="margin:0;padding:24px;background:#f6f1e7;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#17221c">
  <table role="presentation" style="max-width:600px;margin:0 auto;background:#fcfaf5;border-radius:16px;overflow:hidden;border:1px solid #ece4d4">
    <tr><td style="background:#17221c;padding:24px 28px">
      <p style="margin:0;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#c9a66b">Pensiunea Cuibul Viselor</p>
      <h1 style="margin:8px 0 0;font-size:22px;font-weight:600;color:#fcfaf5">${r.tip === 'rezervare' ? 'Cerere nouă de rezervare' : 'Mesaj nou de pe site'}</h1>
    </td></tr>
    <tr><td style="padding:24px 28px">
      <table role="presentation" style="width:100%;border-collapse:collapse;font-size:15px">
        ${randuri.map(([k, v]) => `<tr>
          <td style="padding:9px 0;border-bottom:1px solid #ece4d4;color:#5d6b62;width:38%">${esc(k)}</td>
          <td style="padding:9px 0;border-bottom:1px solid #ece4d4;font-weight:600">${esc(v)}</td>
        </tr>`).join('')}
      </table>
      ${r.mesaj ? `<div style="margin-top:20px;padding:16px;background:#f6f1e7;border-radius:10px">
        <p style="margin:0 0 6px;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#7a5a2b">Mesaj</p>
        <p style="margin:0;white-space:pre-wrap;line-height:1.6">${esc(r.mesaj)}</p>
      </div>` : ''}
      <p style="margin:24px 0 0;font-size:13px">
        <a href="tel:${esc(r.telefon.replace(/\s/g, ''))}" style="color:#7a5a2b;font-weight:600">Sună clientul</a>
        ${r.email ? ` &nbsp;·&nbsp; <a href="mailto:${esc(r.email)}" style="color:#7a5a2b;font-weight:600">Răspunde pe email</a>` : ''}
      </p>
    </td></tr>
    <tr><td style="padding:14px 28px;background:#f6f1e7;font-size:11px;color:#5d6b62">
      Trimis automat de formularul de pe site · ID ${esc(r.id)}
    </td></tr>
  </table></body></html>`;

  return { subject, text, html };
}

async function sendEmail(r: Cerere): Promise<{ ok: boolean; error?: string }> {
  if (!RESEND_API_KEY) return { ok: false, error: 'RESEND_API_KEY nu este configurat' };

  const { subject, text, html } = buildEmail(r);
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: MAIL_FROM,
        to: [MAIL_TO],
        subject,
        text,
        html,
        ...(r.email ? { reply_to: r.email } : {}),
      }),
    });
    if (!res.ok) return { ok: false, error: `Resend ${res.status}: ${(await res.text()).slice(0, 300)}` };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e).slice(0, 300) };
  }
}

// ---------- handler ----------

Deno.serve(async (req) => {
  const origin = req.headers.get('origin');

  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders(origin) });
  if (req.method !== 'POST') return json({ error: 'Metodă nepermisă.' }, 405, origin);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Cerere invalidă.' }, 400, origin);
  }

  // Capcană pentru roboți: câmp ascuns care trebuie să rămână gol.
  if (txt(body.website, 200)) return json({ ok: true }, 200, origin);

  const nume = txt(body.nume, 120);
  const telefon = txt(body.telefon, 40);
  const email = txt(body.email, 200);
  const mesaj = typeof body.mesaj === 'string' ? body.mesaj.trim().slice(0, 4000) || null : null;
  const tip = body.tip === 'intrebare' ? 'intrebare' : 'rezervare';

  const sosire = isDate(body.sosire) ? body.sosire : null;
  const plecare = isDate(body.plecare) ? body.plecare : null;

  const erori: string[] = [];
  if (!nume || nume.length < 2) erori.push('numele');
  if (!telefon || telefon.replace(/\D/g, '').length < 6) erori.push('telefonul');
  if (tip === 'rezervare') {
    if (!sosire || !plecare) erori.push('datele sejurului');
    else if (plecare <= sosire) erori.push('o dată de plecare după cea de sosire');
  }
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) erori.push('un email valid');

  if (erori.length) {
    return json({ error: `Vă rugăm să completați ${erori.join(', ')}.` }, 422, origin);
  }

  // Protecție anti-spam: aceeași persoană nu poate trimite de două ori în 60 de secunde.
  const { count } = await admin
    .from('rezervari')
    .select('id', { count: 'exact', head: true })
    .eq('telefon', telefon!)
    .gte('creat_la', new Date(Date.now() - 60_000).toISOString());

  if ((count ?? 0) > 0) {
    return json({ ok: true, duplicat: true, mesaj: 'Am primit deja cererea dumneavoastră.' }, 200, origin);
  }

  const { data, error } = await admin
    .from('rezervari')
    .insert({
      tip,
      nume,
      telefon,
      email,
      mesaj,
      sosire,
      plecare,
      adulti: num(body.adulti, 1, 30, 2),
      copii: num(body.copii, 0, 20, 0),
      camera_slug: txt(body.camera_slug, 80),
      camera_nume: txt(body.camera_nume, 160),
      pagina: txt(body.pagina, 300),
      referrer: txt(req.headers.get('referer'), 300),
      user_agent: txt(req.headers.get('user-agent'), 400),
    })
    .select('id, tip, nume, telefon, email, sosire, plecare, nopti, adulti, copii, camera_nume, mesaj')
    .single();

  if (error) {
    console.error('Insert eșuat:', error);
    return json({ error: 'Nu am putut salva cererea. Vă rugăm să ne sunați.' }, 500, origin);
  }

  const mail = await sendEmail(data as Cerere);

  await admin
    .from('rezervari')
    .update({
      email_trimis: mail.ok,
      email_trimis_la: mail.ok ? new Date().toISOString() : null,
      email_eroare: mail.ok ? null : mail.error,
    })
    .eq('id', data!.id);

  if (!mail.ok) console.error('Email netrimis:', mail.error);

  // Cererea e salvată în orice caz – clientul primește confirmare chiar dacă emailul a eșuat.
  return json({ ok: true, id: data!.id, email_trimis: mail.ok }, 200, origin);
});
