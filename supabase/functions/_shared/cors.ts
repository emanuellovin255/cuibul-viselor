/** Originile de pe care formularul are voie să trimită cereri. */
const ALLOWED = [
  'https://cuibul-viselor.vercel.app',
  'https://emanuellovin255.github.io',
  'http://localhost:4321',
  'http://127.0.0.1:4321',
];

export function corsHeaders(origin: string | null): Record<string, string> {
  const allowed = origin && ALLOWED.includes(origin) ? origin : ALLOWED[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}
