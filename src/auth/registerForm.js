import { registerUser } from '../api/fetch.js'
import { renderLoginForm } from './loginForm.js'
import './scss/loginForm.scss'

export function renderRegisterForm(container) {
  container.innerHTML = `
    <div class="login-fullscreen">
      <div class="container">
        <div class="login-box">
          <h4>Registro</h4>
          <form id="register-form">
            <div class="input-box">
              <input type="text" id="name" required />
              <label for="name">Nombre</label>
            </div>
            <div class="input-box">
              <input type="email" id="email" required />
              <label for="email">Email</label>
            </div>
            <div class="input-box">
              <input type="password" id="password" required />
              <label for="password">Contraseña</label>
            </div>
            <div class="input-box">
              <input type="password" id="confirm-password" required />
              <label for="confirm-password">Confirmar contraseña</label>
            </div>
            <button class="btn login-fx" type="submit">Registrarse</button>
            <div class="signup-link">
              <a href="#" id="switch-to-login">Inicia sesión</a>
            </div>
          </form>
        </div>
        ${Array.from(
          { length: 50 },
          (_, i) => `<span style="--i:${i};"></span>`
        ).join('')}
      </div>
      <div id="register-message" class="error-box"></div>
    </div>
  `

  const form = document.getElementById('register-form')
  const messageDiv = document.getElementById('register-message')
  const switchLink = document.getElementById('switch-to-login')

  switchLink.addEventListener('click', (e) => {
    e.preventDefault()
    container.innerHTML = ''
    renderLoginForm(container)
  })

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    messageDiv.textContent = ''

    const name = form.name.value.trim()
    const email = form.email.value.trim()
    const password = form.password.value
    const confirmPassword = form['confirm-password'].value

    if (password !== confirmPassword) {
      messageDiv.textContent = '⚠️ Las contraseñas no coinciden.'
      return
    }

    try {
      const { user, token } = await registerUser({
        name,
        email,
        password,
        role: 'user'
      })
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      window.location.reload()
    } catch (err) {
      messageDiv.textContent = err.message || '❌ Error al registrarse'
    }
  })
}
