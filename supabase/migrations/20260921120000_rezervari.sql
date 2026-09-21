-- ============================================================
--  Pensiunea Cuibul Viselor – schema pentru cererile din site
-- ============================================================

-- ---------- ENUM-uri ----------
create type public.status_rezervare as enum ('noua', 'contactat', 'confirmata', 'anulata');
create type public.tip_cerere      as enum ('rezervare', 'intrebare');

-- ---------- Tabel principal ----------
create table public.rezervari (
  id            uuid primary key default gen_random_uuid(),
  creat_la      timestamptz  not null default now(),
  actualizat_la timestamptz  not null default now(),

  tip           public.tip_cerere       not null default 'rezervare',
  status        public.status_rezervare not null default 'noua',

  -- Datele sejurului
  sosire        date,
  plecare       date,
  nopti         integer generated always as (plecare - sosire) stored,
  adulti        smallint not null default 2,
  copii         smallint not null default 0,
  camera_slug   text,
  camera_nume   text,

  -- Datele persoanei
  nume          text not null,
  telefon       text not null,
  email         text,
  mesaj         text,

  -- Trasabilitate
  sursa         text not null default 'site',
  pagina        text,
  user_agent    text,
  referrer      text,

  -- Starea notificării pe email
  email_trimis  boolean not null default false,
  email_trimis_la timestamptz,
  email_eroare  text,

  -- Note interne, completate din dashboard
  note_interne  text,

  constraint rezervari_nume_valid     check (char_length(btrim(nume)) between 2 and 120),
  constraint rezervari_telefon_valid  check (char_length(btrim(telefon)) between 6 and 40),
  constraint rezervari_mesaj_valid    check (mesaj is null or char_length(mesaj) <= 4000),
  constraint rezervari_email_valid    check (email is null or email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  constraint rezervari_adulti_valid   check (adulti between 1 and 30),
  constraint rezervari_copii_valid    check (copii between 0 and 20),
  constraint rezervari_perioada_valida check (
    (sosire is null and plecare is null) or (sosire is not null and plecare is not null and plecare > sosire)
  ),
  constraint rezervari_rezervare_are_date check (
    tip <> 'rezervare' or (sosire is not null and plecare is not null)
  )
);

comment on table  public.rezervari is 'Cereri de rezervare și mesaje trimise din formularul de pe site.';
comment on column public.rezervari.nopti  is 'Calculat automat: plecare - sosire.';
comment on column public.rezervari.sursa  is 'De unde a venit cererea: site, telefon, booking etc.';

create index rezervari_creat_la_idx on public.rezervari (creat_la desc);
create index rezervari_status_idx   on public.rezervari (status) where status = 'noua';
create index rezervari_sosire_idx   on public.rezervari (sosire);
create index rezervari_telefon_idx  on public.rezervari (telefon);

-- ---------- actualizat_la automat ----------
create or replace function public.set_actualizat_la()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.actualizat_la = now();
  return new;
end;
$$;

create trigger rezervari_set_actualizat_la
  before update on public.rezervari
  for each row execute function public.set_actualizat_la();

-- ---------- RLS: nimeni din exterior nu citește sau scrie direct ----------
-- Scrierea se face exclusiv din Edge Function-ul `rezervare`, cu service_role
-- (service_role ocolește RLS). Fără politici = acces zero pentru anon/authenticated.
alter table public.rezervari enable row level security;

revoke all on public.rezervari from anon, authenticated;

-- ---------- Vedere pentru panoul de administrare ----------
create view public.rezervari_recente
with (security_invoker = true) as
  select id, creat_la, status, tip, nume, telefon, email,
         sosire, plecare, nopti, adulti, copii, camera_nume,
         mesaj, email_trimis
  from public.rezervari
  order by creat_la desc;

comment on view public.rezervari_recente is 'Cererile recente, pentru vizualizare rapidă în dashboard.';
