export function listContainer() {
  return `
    <section class="event-section">
      <h2>Eventos disponibles</h2>
      <div id="toggle-create-wrapper"></div>
      <div id="event-form-container"></div>
      <div id="events-alert" class="alert-container"></div>
      <div id="events-list"></div>
    </section>
  `
}

export function toggleCreateTemplate(isAllowed) {
  if (!isAllowed) return ''
  return `
    <div class="checkbox-wrapper-25">
      <label>
        <input type="checkbox" id="toggle-create-event" />
        <span>Crear nuevo evento</span>
      </label>
    </div>
  `
}

export function cardInnerTemplate(eventObj, user, isAdmin, isOrganizer) {
  const attendeesCount = Array.isArray(eventObj.attendees)
    ? eventObj.attendees.length
    : 0
  const capacity = parseInt(eventObj.capacity, 10) || 0
  const availableSlots = Math.max(capacity - attendeesCount, 0)
  const joined =
    Array.isArray(eventObj.attendees) && eventObj.attendees.includes(user.id)
  const dateStr = new Date(eventObj.date).toLocaleDateString()
  const location = eventObj.location || 'Sin ubicación'

  const infoHtml =
    isOrganizer || isAdmin
      ? `<p class="back-attendees">Inscritos: ${attendeesCount}/${capacity}</p>`
      : ''

  let actionButtons = ''
  if (isAdmin) {
    actionButtons =
      `<button class="btn btn-edit"   data-action="edit">Editar</button>` +
      `<button class="btn btn-delete" data-action="delete">Eliminar</button>`
  } else if (isOrganizer && eventObj.organizer === user.id) {
    actionButtons =
      `<button class="btn btn-edit"   data-action="edit">Editar</button>` +
      `<button class="btn btn-delete" data-action="delete">Eliminar</button>`
  } else if (joined) {
    actionButtons = `<button class="btn btn-leave" data-action="leave">Desinscribirse</button>`
  } else if (attendeesCount < capacity) {
    actionButtons = `<button class="btn btn-join" data-action="join">Unirse</button>`
  } else {
    actionButtons = `<button class="btn btn-full" disabled>Completo</button>`
  }

  return `
    <div class="card event-card" data-event-id="${eventObj._id}">
      <div class="card-inner">
        <div class="card-front">
          <img src="${eventObj.imageUrl}" alt="${eventObj.title}" class="front-image"/>
          <div class="front-text">
            <p class="front-title">${eventObj.title}</p>
            <p class="front-date">${dateStr}</p>
            <p class="front-location">${location}</p>
          </div>
        </div>
        <div class="card-back">
          <div class="back-description">${eventObj.description}</div>
          ${infoHtml}
          <div class="back-buttons">${actionButtons}</div>
        </div>
      </div>
    </div>
  `
}
