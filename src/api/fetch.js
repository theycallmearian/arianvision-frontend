const BASE_URL = '/api'

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
    init.headers = {
      ...init.headers,
      Authorization: `Bearer ${token}`
    }
  }

  if (body) {
    init.body = body instanceof FormData ? body : JSON.stringify(body)
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, init)
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || 'Error en la petición a la API')
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
  return apiRequest('/events', { method: 'GET' })
}

export function getEventById(id) {
  return apiRequest(`/events/${id}`, { method: 'GET' })
}

export function createEvent(formData) {
  return apiRequest('/events', {
    method: 'POST',
    body: formData
  })
}

export function updateEvent(id, payload) {
  return apiRequest(`/events/${id}`, {
    method: 'PUT',
    body: payload
  })
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
