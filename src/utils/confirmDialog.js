export function confirmDialog(message) {
  return new Promise((resolve) => {
    const overlay = document.createElement('div')
    overlay.classList.add('confirm-overlay')

    const dialog = document.createElement('div')
    dialog.classList.add('confirm-dialog')

    dialog.innerHTML = `
      <p class="confirm-message">${message}</p>
      <div class="confirm-buttons">
        <button class="btn-confirm btn-yes">Sí</button>
        <button class="btn-confirm btn-no">No</button>
      </div>
    `

    overlay.appendChild(dialog)
    document.body.appendChild(overlay)

    const btnYes = dialog.querySelector('.btn-yes')
    const btnNo = dialog.querySelector('.btn-no')

    btnYes.addEventListener('click', () => {
      document.body.removeChild(overlay)
      resolve(true)
    })

    btnNo.addEventListener('click', () => {
      document.body.removeChild(overlay)
      resolve(false)
    })
  })
}
