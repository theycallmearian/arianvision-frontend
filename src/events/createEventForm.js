import { showLoader, hideLoader } from '../utils/loader.js'
import { showAlert, clearAlert } from '../components/Alert.js'

export function renderCreateEventForm(container, onSuccess) {
  container.innerHTML = `
    <div class="event-form-wrapper visible">
      <h3>Crear nuevo evento</h3>
      <form id="create-event-form" enctype="multipart/form-data">
        <input type="text" id="title" placeholder="Título" required />
        <input type="date" id="date" required />
        <input type="text" id="location" placeholder="Ubicación" required />
        <textarea id="description" placeholder="Descripción" required></textarea>
        <input type="file" id="image" accept="image/*" required />
        <input type="number" id="capacity" placeholder="Capacidad" required />
        <div class="form-buttons">
          <button type="submit" id="btn-create-event" class="btn-submit-create">
            Crear evento
          </button>
          <button type="button" id="btn-cancel-create" class="btn-cancel-create">
            Cancelar
          </button>
        </div>
      </form>
      <div id="event-create-message" class="alert-container"></div>
    </div>
  `

  const form = document.getElementById('create-event-form')
  const messageDiv = document.getElementById('event-create-message')
  const btnCreate = document.getElementById('btn-create-event')
  const btnCancel = document.getElementById('btn-cancel-create')

  btnCancel.addEventListener('click', () => {
    clearAlert(messageDiv)
    container.innerHTML = ''
    if (typeof onSuccess === 'function') onSuccess()
  })

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const title = document.getElementById('title').value.trim()
    const date = document.getElementById('date').value
    const locationValue = document.getElementById('location').value.trim()
    const description = document.getElementById('description').value.trim()
    const capacity = parseInt(document.getElementById('capacity').value, 10)
    const imageInput = document.getElementById('image')

    const formData = new FormData()
    formData.append('title', title)
    formData.append('date', date)
    formData.append('location', locationValue)
    formData.append('description', description)
    formData.append('capacity', capacity)
    if (imageInput.files.length > 0) {
      formData.append('image', imageInput.files[0])
    }

    try {
      showLoader(form)
      btnCreate.disabled = true

      const response = await fetch('http://localhost:3000/api/events', {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: formData
      })

      const rawText = await response.text()
      console.log('[CREATE EVENT] raw response:', rawText)
      let data
      try {
        data = JSON.parse(rawText)
      } catch {
        throw new Error('⚠️ Respuesta inesperada del servidor ⚠️')
      }

      hideLoader(form)
      if (!response.ok) {
        throw new Error(data.message || '⚠️ Error al crear evento ⚠️')
      }

      showAlert(messageDiv, 'success', ' ✅ Evento creado correctamente ✅')
      setTimeout(() => {
        clearAlert(messageDiv)
        container.innerHTML = ''
        if (typeof onSuccess === 'function') onSuccess()
      }, 1500)
    } catch (err) {
      hideLoader(form)
      btnCreate.disabled = false
      showAlert(messageDiv, 'error', err.message)
      setTimeout(() => clearAlert(messageDiv), 2500)
    }
  })
}
