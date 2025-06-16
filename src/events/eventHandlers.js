import { joinEvent, leaveEvent, deleteEvent } from './fetchEvents.js'
import { showAlert, clearAlert } from '../components/Alert.js'
import { renderEditEventForm } from './editEventForm.js'

function createJoinButton() {
  const btn = document.createElement('button')
  btn.className = 'btn btn-join'
  btn.textContent = 'Unirse'
  btn.dataset.action = 'join'
  return btn
}

function createLeaveButton() {
  const btn = document.createElement('button')
  btn.className = 'btn btn-leave'
  btn.textContent = 'Desinscribirse'
  btn.dataset.action = 'leave'
  return btn
}

export function attachCardListeners(cardEl, token, user, refreshList) {
  const id = cardEl.dataset.eventId
  const alertContainer = document.getElementById('events-alert')

  const btnDelete = cardEl.querySelector('[data-action="delete"]')
  if (btnDelete) {
    btnDelete.addEventListener('click', () => {
      import('../utils/confirmDialog.js').then(({ confirmDialog }) => {
        confirmDialog('¿Seguro que quieres eliminar este evento?').then(
          (ok) => {
            if (!ok) return
            deleteEvent(id, token)
              .then((data) => {
                cardEl.classList.add('fade-out-card')
                setTimeout(() => cardEl.remove(), 300)
                showAlert(
                  alertContainer,
                  'success',
                  data.message || 'Evento eliminado.'
                )
                setTimeout(() => clearAlert(alertContainer), 2500)
              })
              .catch((err) => {
                showAlert(alertContainer, 'error', err.message)
                setTimeout(() => clearAlert(alertContainer), 2500)
              })
          }
        )
      })
    })
  }

  const btnEdit = cardEl.querySelector('[data-action="edit"]')
  if (btnEdit) {
    btnEdit.addEventListener('click', () => {
      const formContainer = document.getElementById('event-form-container')
      renderEditEventForm(
        formContainer,
        JSON.parse(cardEl.dataset.event),
        token,
        () => refreshList()
      )

      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  const joinBtn = cardEl.querySelector('[data-action="join"]')
  if (joinBtn) {
    joinBtn.addEventListener('click', () => {
      if (!token) {
        const headerLoginBtn = document.getElementById('btn-login')
        if (headerLoginBtn) headerLoginBtn.click()
        return
      }
      joinEvent(id, token)
        .then(() => {
          const newLeaveBtn = createLeaveButton()
          joinBtn.replaceWith(newLeaveBtn)
          attachCardListeners(cardEl, token, user, refreshList)
          const cnt = cardEl.querySelector('.back-attendees')
          if (cnt) {
            const [cur, tot] = cnt.textContent.match(/\d+/g).map(Number)
            cnt.textContent = `Inscritos: ${cur + 1}/${tot}`
          }
          showAlert(alertContainer, 'success', 'Te has inscrito correctamente.')
          setTimeout(() => clearAlert(alertContainer), 1500)
        })
        .catch((err) => {
          showAlert(alertContainer, 'error', err.message)
          setTimeout(() => clearAlert(alertContainer), 2500)
        })
    })
  }

  const leaveBtn = cardEl.querySelector('[data-action="leave"]')
  if (leaveBtn) {
    leaveBtn.addEventListener('click', () => {
      leaveEvent(id, token)
        .then(() => {
          const newJoinBtn = createJoinButton()
          leaveBtn.replaceWith(newJoinBtn)
          attachCardListeners(cardEl, token, user, refreshList)
          const cnt = cardEl.querySelector('.back-attendees')
          if (cnt) {
            const [cur, tot] = cnt.textContent.match(/\d+/g).map(Number)
            cnt.textContent = `Inscritos: ${cur - 1}/${tot}`
          }
          showAlert(
            alertContainer,
            'success',
            'Te has desinscrito correctamente.'
          )
          setTimeout(() => clearAlert(alertContainer), 1500)
        })
        .catch((err) => {
          showAlert(alertContainer, 'error', err.message)
          setTimeout(() => clearAlert(alertContainer), 2500)
        })
    })
  }
}
