import { getSupabaseClient } from '../lib/supabase'

const TASK_STATUSES = ['Todo', 'In Progress', 'Done']

async function getAuthenticatedUserId() {
  const { data, error } = await getSupabaseClient().auth.getSession()
  if (error) throw error

  const userId = data.session?.user?.id
  if (!userId) throw new Error('Prisijunkite, kad galėtumėte tvarkyti užduotis.')
  return userId
}

export async function getTasks() {
  const { data, error } = await getSupabaseClient()
    .from('tasks')
    .select('id, title, status, user_id, created_at, updated_at')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function createTask(title) {
  const normalizedTitle = title.trim()
  if (!normalizedTitle) throw new Error('Įveskite užduoties pavadinimą.')

  const userId = await getAuthenticatedUserId()
  const { data, error } = await getSupabaseClient()
    .from('tasks')
    .insert({ title: normalizedTitle, user_id: userId, status: 'Todo' })
    .select('id, title, status, user_id, created_at, updated_at')
    .single()

  if (error) throw error
  return data
}

export async function updateTaskStatus(taskId, status) {
  if (!TASK_STATUSES.includes(status)) {
    throw new Error('Pasirinkta netinkama užduoties būsena.')
  }

  const { data, error } = await getSupabaseClient()
    .from('tasks')
    .update({ status })
    .eq('id', taskId)
    .select('id, title, status, user_id, created_at, updated_at')
    .maybeSingle()

  if (error) throw error
  if (!data) throw new Error('Užduotis nerasta arba neturite teisės ją keisti.')
  return data
}

export async function deleteTask(taskId) {
  const { data, error } = await getSupabaseClient()
    .from('tasks')
    .delete()
    .eq('id', taskId)
    .select('id')
    .maybeSingle()

  if (error) throw error
  if (!data) throw new Error('Užduotis nerasta arba neturite teisės ją ištrinti.')
}
