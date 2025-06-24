import { updateUser, deleteUser } from '../api/fetch.js'
import { apiRequest } from '../api/fetch.js' // <- Asegúrate de exportar apiRequest en fetch.js
import { isValidPassword, isValidEmail } from '../utils/validators.js'
import { confirmDialog } from '../utils/confirmDialog.js'
import { renderLanding } from './landing.js'
import { renderHeader } from '../ui/header.js'
import './scss/profileForm.scss'

export function renderProfileForm(container) {
  container.innerHTML = `
    <section class="profile-section">
      <h2 class="profile-title">Editar perfil</h2>
      <div class="profile-form-wrapper">
        <form id="profile-form" class="profile-form">
          <div class="form-group">
            <label for="name">Nombre</label>
            <input type="text" id="name" name="name" required/>
          </div>
          <div class="form-group">
            <label for="email">Correo electrónico</label>
            <input type="email" id="email" name="email" required/>
          </div>
          <div class="form-group">
            <label for="new-password">Nueva contraseña</label>
            <input type="password" id="new-password" name="newPassword"/>
          </div>
          <div class="form-group">
            <label for="confirm-password">Confirmar contraseña</label>
            <input type="password" id="confirm-password" name="confirmPassword"/>
          </div>
          <div id="profile-message" class="form-message"></div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Guardar cambios</button>
            <button type="button" id="btn-delete-account" class="btn btn-danger">Eliminar cuenta</button>
          </div>
        </form>
      </div>
    </section>
  `

  const form = document.getElementById('profile-form')
  const msg = document.getElementById('profile-message')
  const delBtn = document.getElementById('btn-delete-account')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  form.name.value = user.name
  form.email.value = user.email

  function show(type, text) {
    msg.textContent = text
    msg.className = `form-message ${type}`
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    show('', '')

    const name = form.name.value.trim()
    const email = form.email.value.trim()
    const pw = form.newPassword.value
    const pw2 = form.confirmPassword.value

    if (!isValidEmail(email)) {
      return show('error', 'Email inválido')
    }
    if (pw) {
      if (pw !== pw2) return show('error', 'Las contraseñas no coinciden')
      if (!isValidPassword(pw)) {
        return show(
          'error',
          'La contraseña debe tener más de 8 caracteres, un número y un carácter especial'
        )
      }
    }

    const payload = { name, email }
    if (pw) payload.password = pw

    try {
      await updateUser(payload)

      const freshUser = await apiRequest('/users/me', 'GET')

      localStorage.setItem('user', JSON.stringify(freshUser))
      renderHeader(document.getElementById('app'))

      show(
        'success',
        pw
          ? 'Contraseña cambiada correctamente.'
          : 'Perfil actualizado correctamente.'
      )

      form.newPassword.value = ''
      form.confirmPassword.value = ''
    } catch (err) {
      show('error', err.message || 'Error al actualizar')
    }
  })

  delBtn.addEventListener('click', async () => {
    const ok = await confirmDialog('¿Eliminar cuenta? No se puede deshacer.')
    if (!ok) return
    try {
      await deleteUser()
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      renderHeader(document.getElementById('app'))
      window.location.hash = ''
      window.location.reload()
    } catch (err) {
      show('error', err.message || 'Error al eliminar')
    }
  })
}
