import '../components/scss/Alert.scss'

let currentDialog = null

export function showAlert(container, type, message) {
  if (currentDialog) {
    currentDialog.remove()
    currentDialog = null
  }

  const overlay = document.createElement('div')
  overlay.className = 'alert-overlay'

  const dialog = document.createElement('div')
  dialog.className = `alert-dialog ${type}`

  const msg = document.createElement('p')
  msg.className = 'alert-message'
  msg.textContent = message

  const btn = document.createElement('button')
  btn.className = 'alert-ok'
  btn.textContent = 'OK'
  btn.addEventListener('click', () => {
    overlay.remove()
    currentDialog = null
  })

  dialog.appendChild(msg)
  dialog.appendChild(btn)
  overlay.appendChild(dialog)
  document.body.appendChild(overlay)

  currentDialog = overlay
}

export function clearAlert(container) {}
