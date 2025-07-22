const BASE_URL = import.meta.env.VITE_API_URL || '/api'

async function apiRequest(
  endpoint,
  { method = 'GET', body = null, headers = {} } = {}
) {
  const token = localStorage.getItem('token')
  const init = {
    method,
    headers: {
      ...(body instanceof FormData
        ? {}
        : { 'Content-Type': 'application/json' }),
      ...headers
    }
  }

  if (token) {
    init.headers.Authorization = `Bearer ${token}`
  }
  if (body != null) {
    init.body = body instanceof FormData ? body : JSON.stringify(body)
  }

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`

  let res
  try {
    res = await fetch(`${BASE_URL}${cleanEndpoint}`, init)
  } catch (error) {
    throw new Error('No se pudo conectar con el servidor. Inténtalo más tarde.')
  }

  if (res.status === 204) {
    return {}
  }

  const text = await res.text()
  let data
  try {
    data = JSON.parse(text)
  } catch {
    throw new Error(`Respuesta no JSON: ${text.slice(0, 200)}`)
  }

  if (!res.ok) {
    throw new Error(data.message || res.statusText)
  }
  return data
}

export function loginUser(email, password) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: { email, password }
  })
}

export function registerUser(payload) {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: payload
  })
}

export function getAllEvents() {
  return apiRequest('/events')
}

export function getEventById(id) {
  return apiRequest(`/events/${id}`)
}

export function createEvent(formData) {
  return apiRequest('/events', { method: 'POST', body: formData })
}

export function updateEvent(id, payload) {
  return apiRequest(`/events/${id}`, { method: 'PUT', body: payload })
}

export function joinEvent(id) {
  return apiRequest(`/events/${id}/join`, { method: 'POST' })
}

export function leaveEvent(id) {
  return apiRequest(`/events/${id}/leave`, { method: 'POST' })
}

export function deleteEvent(id) {
  return apiRequest(`/events/${id}`, { method: 'DELETE' })
}

export function getUserEvents() {
  return apiRequest('/users/me/events')
}

export function updateUser(data) {
  return apiRequest('/users/me', { method: 'PUT', body: data })
}

export function deleteUser() {
  return apiRequest('/users/me', { method: 'DELETE' })
}

export { apiRequest }
