import { cardInnerTemplate } from './templates.js'
import { attachCardListeners } from './eventHandlers.js'

export function createEventCard(eventObj, token, user, refreshList) {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = cardInnerTemplate(
    eventObj,
    user,
    user.role === 'admin',
    user.role === 'organizer'
  )
  const cardEl = wrapper.firstElementChild
  cardEl.dataset.event = JSON.stringify(eventObj)

  attachCardListeners(cardEl, token, user, refreshList)
  return cardEl
}
