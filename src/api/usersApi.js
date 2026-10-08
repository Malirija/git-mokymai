// Enter the user API base URL when it is available.
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
    throw new Error(`User API request failed (${response.status})`)
  }

  if (response.status === 204) return null
  return response.json()
}

// GET /users — retrieve users so credentials can be checked.
export function getUsers() {
  return request('/users')
}

// POST /users — create a user. The API should store passwords securely.
export function createUser(user) {
  return request('/users', {
    method: 'POST',
    body: JSON.stringify(user),
  })
}
