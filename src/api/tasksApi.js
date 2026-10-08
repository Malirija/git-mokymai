// Enter the API base URL when it is available, for example: https://api.example.com
const API_BASE_URL = 'https://testapi.io/api/Malirija/resource'

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`Task API request failed (${response.status})`)
  }

  if (response.status === 204) return null
  return response.json()
}

// GET /tasks — retrieve tasks, including their userId field.
export function getTasks() {
  return request('/tasks')
}

// POST /tasks — create a task. Adjust the payload to match your API contract.
export function createTask(task) {
  return request('/tasks', {
    method: 'POST',
    body: JSON.stringify(task),
  })
}

// PUT /tasks/:id — update a task's status.
export function updateTaskStatus(taskId, title, status, userId) {
  return request(`/tasks/${encodeURIComponent(taskId)}`, {
    method: 'PUT',
    body: JSON.stringify({ title, status, userId }),
  })
}

// DELETE /tasks/:id — delete a task by its ID.
export function deleteTask(taskId) {
  return request(`/tasks/${encodeURIComponent(taskId)}`, {
    method: 'DELETE',
  })
}
