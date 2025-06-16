const API_BASE = (import.meta.env.VITE_API_URL || '/api') + '/events'

export async function getEvents(token) {
  const res = await fetch(API_BASE, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || '⚠️ Error al cargar eventos ⚠️')
  }
  return res.json()
}

export async function joinEvent(id, token) {
  const res = await fetch(`${API_BASE}/${id}/join`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` }
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || '⚠️ Error al inscribirse. ⚠️')
  return data
}

export async function leaveEvent(id, token) {
  const res = await fetch(`${API_BASE}/${id}/leave`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` }
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || '⚠️ Error al desinscribirse. ⚠️')
  return data
}

export async function deleteEvent(id, token) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || '⚠️ No puedes eliminar. ⚠️')
  return data
}
