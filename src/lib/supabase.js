import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const supabaseConfigError =
  !supabaseUrl || !supabasePublishableKey
    ? 'Supabase nustatymai neužpildyti. Įrašykite VITE_SUPABASE_URL ir VITE_SUPABASE_PUBLISHABLE_KEY į .env.local failą.'
    : ''

export const supabase = supabaseConfigError
  ? null
  : createClient(supabaseUrl, supabasePublishableKey)

export function getSupabaseClient() {
  if (!supabase) throw new Error(supabaseConfigError)
  return supabase
}
