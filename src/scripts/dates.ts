const pad = (n: number) => String(n).padStart(2, '0');

export const toISO = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export function addDays(iso: string, days: number): string {
  const [y, m, d] = iso.split('-').map(Number);
  return toISO(new Date(y, m - 1, d + days));
}

/** Leagă câmpurile de sosire/plecare: minime corecte și plecare după sosire. */
export function wireDates(scope: ParentNode) {
  const inEl = scope.querySelector<HTMLInputElement>('[data-date-in]');
  const outEl = scope.querySelector<HTMLInputElement>('[data-date-out]');
  if (!inEl || !outEl) return;

  const today = toISO(new Date());
  inEl.min = today;
  outEl.min = addDays(today, 1);

  const sync = () => {
    if (!inEl.value) return;
    const minOut = addDays(inEl.value, 1);
    outEl.min = minOut;
    if (!outEl.value || outEl.value < minOut) outEl.value = minOut;
  };
  inEl.addEventListener('change', sync);
  sync();
}
