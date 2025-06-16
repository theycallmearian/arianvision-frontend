export function showError(container, message) {
  const el =
    container instanceof Element
      ? container
      : document.getElementById(container) || document.querySelector(container)
  if (!(el && el instanceof Element)) {
    console.error('Invalid container for showError:', container)
    return
  }
  const prev = el.querySelector('.alert.error')
  if (prev) prev.remove()
  const msgDiv = document.createElement('div')
  msgDiv.className = 'alert error'
  msgDiv.textContent = message
  el.appendChild(msgDiv)
}

export function clearError(container) {
  const el =
    container instanceof Element
      ? container
      : document.getElementById(container) || document.querySelector(container)
  if (!(el && el instanceof Element)) return
  const err = el.querySelector('.alert.error')
  if (err) err.remove()
}
