/** Configurația publică Supabase, citită din variabilele de build. */
export const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL ?? '';
export const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY ?? '';

/** Endpoint-ul Edge Function care salvează cererea și trimite emailul. */
export const rezervareEndpoint = supabaseUrl ? `${supabaseUrl}/functions/v1/rezervare` : '';

export const hasSupabase = Boolean(supabaseUrl && supabaseAnonKey);
