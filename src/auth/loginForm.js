import { loginUser } from '../api/fetch.js'
import { renderRegisterForm } from './registerForm.js'
import './scss/loginForm.scss'

export function renderLoginForm(container) {
  const spans = Array.from(
    { length: 50 },
    (_, i) => `<span style="--i:${i};"></span>`
  ).join('')

  container.innerHTML = `
    <div class="login-fullscreen">
      <div class="container">
        <div class="login-box">
          <h4>Login</h4>
          <form id="login-form">
            <div class="input-box">
              <input type="email" id="email" required />
              <label for="email">Email</label>
            </div>
            <div class="input-box">
              <input type="password" id="password" required />
              <label for="password">Password</label>
            </div>
            <button class="btn login-fx" type="submit">Login</button>
            <div class="signup-link">
              <a href="#" id="switch-to-register">Regístrate</a>
            </div>
          </form>
        </div>
        ${spans}
      </div>
      <div class="loader-container" id="login-loader" style="display: none;">
        <div class="loader"></div>
      </div>
      <div id="login-error" class="error-box"></div>
    </div>
  `

  const form = document.getElementById('login-form')
  const switchLink = document.getElementById('switch-to-register')
  const loaderContainer = document.getElementById('login-loader')
  const errorBox = document.getElementById('login-error')

  switchLink.addEventListener('click', (e) => {
    e.preventDefault()
    container.innerHTML = ''
    renderRegisterForm(container)
  })

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    errorBox.textContent = ''
    loaderContainer.style.display = 'flex'
    form.querySelector('.btn.login-fx').disabled = true

    const email = form.email.value.trim()
    const password = form.password.value

    try {
      const { user, token } = await loginUser(email, password)
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      window.location.hash = '#events'
      window.location.reload()
    } catch (err) {
      errorBox.textContent = err.message || '❌ Error al iniciar sesión'
      form.querySelector('.btn.login-fx').disabled = false
      loaderContainer.style.display = 'none'
    }
  })
}
