import { listContainer } from './templates.js'
import { getUserEvents } from '../api/fetch.js'
import { createEventCard } from './eventCard.js'
import { normalizeText } from '../utils/stringUtils.js'
import './scss/myEvents.scss'

export async function renderMyEvents(container) {
  container.innerHTML = listContainer()

  const titleEl = container.querySelector('.section-title')
  if (titleEl) titleEl.textContent = 'Mis eventos'

  const toggleWrapper = container.querySelector('#toggle-create-wrapper')
  toggleWrapper.insertAdjacentHTML(
    'afterend',
    `<input
       type="text"
       id="event-search"
       placeholder="🔍 Buscar eventos…"
       class="search-input u-mb-4"
     />`
  )

  const eventsListEl = container.querySelector('#events-list')
  const searchInput = container.querySelector('#event-search')

  let events = []
  try {
    events = await getUserEvents()
  } catch (err) {
    eventsListEl.innerHTML = `<p class="error-box">${err.message}</p>`
    return
  }

  function updateList(list) {
    eventsListEl.innerHTML = ''
    if (!list.length) {
      eventsListEl.innerHTML = `<div class="no-events-box">No estás apuntado a ningún evento.</div>`
      return
    }
    list.forEach((ev) => {
      const card = createEventCard(
        ev,
        localStorage.getItem('token'),
        JSON.parse(localStorage.getItem('user') || '{}'),
        () => {
          const eventId = ev._id || ev.id
          events = events.filter((e) => (e._id || e.id) !== eventId)
          const term = normalizeText(searchInput.value || '')
          const filtered = term
            ? events.filter(
                (e) =>
                  normalizeText(e.title).includes(term) ||
                  normalizeText(e.description).includes(term)
              )
            : events
          updateList(filtered)
        }
      )
      eventsListEl.appendChild(card)
    })
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const term = normalizeText(searchInput.value)
      const filtered = events.filter(
        (ev) =>
          normalizeText(ev.title).includes(term) ||
          normalizeText(ev.description).includes(term)
      )
      if (!term && !filtered.length) {
        updateList(events)
      } else if (!filtered.length) {
        eventsListEl.innerHTML = `<div class="no-events-box">No se ha encontrado ningún evento.</div>`
      } else {
        updateList(filtered)
      }
    })
  }

  updateList(events)
}
