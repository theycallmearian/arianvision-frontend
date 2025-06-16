import { listContainer, toggleCreateTemplate } from './templates.js'
import { getEvents } from './fetchEvents.js'
import { createEventCard } from './eventCard.js'
import { renderCreateEventForm } from './createEventForm.js'
import { showLoader, hideLoader } from '../utils/loader.js'
import { showError, clearError } from '../utils/errorHandler.js'

export async function renderEventList(container) {
  container.innerHTML = listContainer()

  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const isOrganizer = user.role === 'organizer'
  const isAdmin = user.role === 'admin'

  const toggleWrapper = container.querySelector('#toggle-create-wrapper')
  toggleWrapper.innerHTML = toggleCreateTemplate(isOrganizer || isAdmin)

  const toggleElem = container.querySelector('#toggle-create-event')
  const formContainer = container.querySelector('#event-form-container')
  const alertContainer = container.querySelector('#events-alert')
  const eventsListEl = container.querySelector('#events-list')

  toggleWrapper.insertAdjacentHTML(
    'afterend',
    `
    <input
      type="text"
      id="event-search"
      placeholder="🔍 Buscar eventos…"
      class="u-mb-4"
    />
  `
  )

  if (toggleElem) {
    toggleElem.addEventListener('change', () => {
      if (toggleElem.checked) {
        eventsListEl.classList.add('fade-out')
        setTimeout(() => {
          eventsListEl.style.display = 'none'
          formContainer.classList.add('visible')
          renderCreateEventForm(formContainer, () => {
            toggleElem.checked = false
            renderEventList(container)
          })
        }, 300)
      } else {
        formContainer.classList.remove('visible')
        setTimeout(() => {
          formContainer.innerHTML = ''
          renderEventList(container)
        }, 300)
      }
    })
  }

  showLoader(eventsListEl)
  try {
    const events = await getEvents(token)
    hideLoader(eventsListEl)

    if (!events.length) {
      eventsListEl.innerHTML = '<p>No hay eventos disponibles.</p>'
      return
    }

    const allEvents = events.slice()
    const refresh = () => renderEventList(container)

    eventsListEl.innerHTML = ''
    allEvents.forEach((ev) => {
      const card = createEventCard(ev, token, user, refresh)
      eventsListEl.appendChild(card)
    })

    const searchInput = container.querySelector('#event-search')
    searchInput.addEventListener('input', () => {
      const term = searchInput.value.toLowerCase()
      const filtered = allEvents.filter(
        (ev) =>
          ev.title.toLowerCase().includes(term) ||
          ev.description.toLowerCase().includes(term)
      )
      eventsListEl.innerHTML = ''
      filtered.forEach((ev) => {
        const card = createEventCard(ev, token, user, refresh)
        eventsListEl.appendChild(card)
      })
    })
  } catch (err) {
    hideLoader(eventsListEl)
    showError(alertContainer, err.message)
    setTimeout(() => clearError(alertContainer), 2500)
  }
}
