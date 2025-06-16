import { escapeHtml, formatDateForInput } from '../utils/helpers.js'
import { showAlert, clearAlert } from '../components/Alert.js'
import { showLoader, hideLoader } from '../utils/loader.js'

const BASE_URL = import.meta.env.VITE_API_URL || '/api'

export function renderEditEventForm(containerEl, eventData, token, onSuccess) {
  containerEl.innerHTML = `
    <div class="edit-form-wrapper visible">
      <h3>Editar evento</h3>
      <form id="edit-event-form" enctype="multipart/form-data">
        <input type="text" id="edit-title" placeholder="Título" value="${escapeHtml(
          eventData.title
        )}" required />
        <input type="date" id="edit-date" value="${formatDateForInput(
          eventData.date
        )}" required />
        <input type="text" id="edit-location" placeholder="Ubicación" value="${escapeHtml(
          eventData.location
        )}" required />
        <textarea id="edit-description" placeholder="Descripción" required>${escapeHtml(
          eventData.description
        )}</textarea>
        <input type="file" id="edit-image" accept="image/*" />
        <input type="number" id="edit-capacity" placeholder="Capacidad" value="${
          eventData.capacity || 0
        }" />
        <div class="form-buttons">
          <button type="submit" class="submit-btn">Guardar cambios</button>
          <button type="button" class="cancel-btn" id="cancel-edit-btn">Cancelar</button>
        </div>
      </form>
      <div id="edit-message" class="alert-container"></div>
    </div>
  `

  const form = document.getElementById('edit-event-form')
  const messageDiv = document.getElementById('edit-message')
  const btnCancel = document.getElementById('cancel-edit-btn')

  btnCancel.addEventListener('click', () => {
    clearAlert(messageDiv)
    containerEl.innerHTML = ''
    onSuccess()
  })

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const title = document.getElementById('edit-title').value.trim()
    const date = document.getElementById('edit-date').value
    const location = document.getElementById('edit-location').value.trim()
    const description = document.getElementById('edit-description').value.trim()
    const capacity = parseInt(
      document.getElementById('edit-capacity').value,
      10
    )
    const imageInput = document.getElementById('edit-image')

    const formData = new FormData()
    formData.append('title', title)
    formData.append('date', date)
    formData.append('location', location)
    formData.append('description', description)
    formData.append('capacity', capacity)
    if (imageInput.files.length > 0) {
      formData.append('image', imageInput.files[0])
    }

    try {
      showLoader(form)
      const response = await fetch(
        `${BASE_URL}/events/${eventData._id}`,
        {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}` },
          body: formData
        }
      )
      const rawText = await response.text()
      console.log('[EDIT EVENT] raw response:', rawText)
      let data
      try {
        data = JSON.parse(rawText)
      } catch (jsonErr) {
        console.error('[EDIT EVENT] respuesta no es JSON:', jsonErr)
        throw new Error('Respuesta inesperada del servidor')
      }

      hideLoader(form)
      if (!response.ok) {
        console.error('[EDIT EVENT] status:', response.status)
        throw new Error(data.message || 'Error al actualizar evento')
      }

      showAlert(messageDiv, 'success', 'Evento actualizado correctamente')
      setTimeout(() => {
        clearAlert(messageDiv)
        containerEl.innerHTML = ''
        onSuccess()
      }, 1500)
    } catch (err) {
      hideLoader(form)
      showAlert(messageDiv, 'error', err.message)
      setTimeout(() => clearAlert(messageDiv), 2500)
    }
  })
}
