import { getSupabaseClient } from '../lib/supabase'

export async function signUp({ name, email, password }) {
  const { data, error } = await getSupabaseClient().auth.signUp({
    email,
    password,
    options: { data: { name } },
  })

  if (error) throw error
  return data
}

export async function signIn({ email, password }) {
  const { data, error } = await getSupabaseClient().auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await getSupabaseClient().auth.signOut()
  if (error) throw error
}

export async function getSession() {
  const { data, error } = await getSupabaseClient().auth.getSession()
  if (error) throw error
  return data.session
}

export function onAuthStateChange(callback) {
  const { data, error } = getSupabaseClient().auth.onAuthStateChange(
    (_event, session) => callback(session),
  )

  if (error) throw error
  return data.subscription
}
