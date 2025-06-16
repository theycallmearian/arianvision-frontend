export async function renderEventDetail(container, eventId) {
  try {
    showLoader(container)
    const token = localStorage.getItem('token')
    const res = await fetch(`http://localhost:3000/api/events/${eventId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message)
    container.innerHTML = `
      <h2>${data.title}</h2>
      <p>Fecha: ${new Date(data.date).toLocaleString()}</p>
      <p>Ubicación: ${data.location}</p>
      <p>Descripción: ${data.description}</p>
      <img src="${data.imageUrl}" alt="Cartel del evento" />
      <h3>Asistentes:</h3>
      <ul id="attendees-list">
        ${data.attendees.map((u) => `<li>${u.name}</li>`).join('')}
      </ul>
    `
  } catch (err) {
    showError(container, err.message)
  } finally {
    hideLoader(container)
  }
}
