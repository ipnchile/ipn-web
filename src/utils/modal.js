// Modal teletransportado fuera de #app. Devuelve el estado previo al cerrar.
export function createModalController(doc = document) {
  let dialog = null
  let previousFocus = null
  let previousOverflow = ''
  let background = null
  let previousInert = false
  let onClose = null

  const focusable = () => [...dialog.querySelectorAll(
    'button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'
  )].filter((element) => element.tabIndex >= 0 && element.getClientRects().length > 0)

  function containFocus(event) {
    if (dialog && !dialog.contains(event.target)) (focusable()[0] || dialog).focus()
  }

  function keydown(event) {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose?.()
    } else if (event.key === 'Tab') {
      const items = focusable()
      const first = items[0] || dialog
      const last = items.at(-1) || dialog
      if (!items.length || (event.shiftKey && doc.activeElement === first) ||
          (!event.shiftKey && doc.activeElement === last) || !dialog.contains(doc.activeElement)) {
        event.preventDefault()
        ;(event.shiftKey ? last : first).focus()
      }
    }
  }

  function deactivate({ restoreFocus = true } = {}) {
    if (!dialog) return
    doc.removeEventListener('keydown', keydown)
    doc.removeEventListener('focusin', containFocus)
    doc.body.style.overflow = previousOverflow
    if (background) background.inert = previousInert
    dialog = null
    if (restoreFocus && previousFocus?.isConnected) previousFocus.focus()
    previousFocus = null
  }

  function activate(element, close) {
    if (dialog || !element) return
    dialog = element
    onClose = close
    previousFocus = doc.activeElement
    previousOverflow = doc.body.style.overflow
    background = doc.getElementById('app')
    previousInert = background?.inert || false
    doc.body.style.overflow = 'hidden'
    ;(focusable()[0] || dialog).focus()
    if (background && !background.contains(dialog)) background.inert = true
    doc.addEventListener('keydown', keydown)
    doc.addEventListener('focusin', containFocus)
  }

  return { activate, deactivate }
}
