import { describe, test, expect, beforeEach, afterEach, afterAll, mock } from 'bun:test'
import { GlobalRegistrator } from '@happy-dom/global-registrator'
import m from 'mithril'
import { Modal, ModalBox, ModalAction, ModalBackdrop } from '../src/components/Modal/index.js'

// Register happy-dom globals BEFORE any rendering
GlobalRegistrator.register()

// Stub matchMedia if happy-dom doesn't provide it
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    onchange: null,
    dispatchEvent() { return true }
  })
}

// Helper: get the dialog element from a container
function getDialog(container) {
  return container.querySelector('dialog')
}

// Helper: get the backdrop button from a container
function getBackdrop(container) {
  return container.querySelector('button.modal-backdrop')
}

// Helper: simulate the exit animation completing (happy-dom has no CSS engine,
// so animationend never fires naturally — the component's close bridge waits
// for this event before closing the dialog).
function endAnimation(dialog) {
  dialog.dispatchEvent(new Event('animationend'))
}

let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
  // Reset body style between tests
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
})

afterEach(() => {
  // Properly unmount via m.render (not m.mount) to trigger onremove cleanup.
  try { m.render(container, []) } catch (_) {}
  container.remove()
})

afterAll(() => {
  GlobalRegistrator.unregister()
})

describe('Modal', () => {

  // Case 1: Apertura
  test('1. Apertura — open={true} makes dialog.open === true', () => {
    m.render(container, m(Modal, { open: true }, m(ModalBox, 'Hello')))
    const dialog = getDialog(container)
    expect(dialog).not.toBeNull()
    expect(dialog.open).toBe(true)
  })

  // Case 2: Cierre
  test('2. Cierre — open={true} then open={false} closes dialog', () => {
    m.render(container, m(Modal, { open: true }, m(ModalBox, 'Hello')))
    expect(getDialog(container).open).toBe(true)

    // Re-render with open=false (same container → same instance → onupdate fires)
    m.render(container, m(Modal, { open: false }, m(ModalBox, 'Hello')))

    // Exit animation completes → bridge closes the dialog
    endAnimation(getDialog(container))

    expect(getDialog(container).open).toBe(false)
  })

  // Case 3: Cierre con Escape
  test('3. Cierre con Escape — cancel+close events fire onclose', () => {
    const onclose = mock(() => {})
    m.render(container, m(Modal, { open: true, onclose }, m(ModalBox, 'Hello')))
    const dialog = getDialog(container)
    expect(dialog.open).toBe(true)

    // Simulate Escape: native cancel (cancelable) then close event
    const cancelEvent = new Event('cancel', { cancelable: true })
    dialog.dispatchEvent(cancelEvent)
    // cancel was NOT prevented (non-persistent)
    expect(cancelEvent.defaultPrevented).toBe(false)

    // Then the native close event fires
    dialog.dispatchEvent(new Event('close'))

    // Mithril wires onclose as an event handler on the dialog
    // The close event should trigger it
    expect(onclose).toHaveBeenCalled()
  })

  // Case 4: Persistent bloquea Escape
  test('4. Persistent bloquea Escape — cancel is preventDefault-ed, onclose NOT called', () => {
    const onclose = mock(() => {})
    m.render(container, m(Modal, { open: true, persistent: true, onclose }, m(ModalBox, 'Hello')))
    const dialog = getDialog(container)
    expect(dialog.open).toBe(true)

    // Simulate Escape: cancel event
    const cancelEvent = new Event('cancel', { cancelable: true })
    dialog.dispatchEvent(cancelEvent)

    // persistent should preventDefault on cancel
    expect(cancelEvent.defaultPrevented).toBe(true)

    // onclose should NOT have been called (cancel was prevented, dialog stays open)
    expect(onclose).not.toHaveBeenCalled()
    expect(dialog.open).toBe(true)
  })

  // Case 5: Cierre con click en backdrop
  test('5. Cierre con click en backdrop — backdrop onclick called, then close via re-render', () => {
    const backdropClick = mock(() => {})
    const onclose = mock(() => {})

    m.render(container,
      m(Modal, { open: true, onclose },
        m(ModalBox, 'Content'),
        m(ModalBackdrop, { onclick: backdropClick })
      )
    )

    const backdrop = getBackdrop(container)
    expect(backdrop).not.toBeNull()

    // Click the backdrop button
    backdrop.click()
    expect(backdropClick).toHaveBeenCalled()

    // Consumer would re-render with open=false after backdrop click
    m.render(container,
      m(Modal, { open: false, onclose },
        m(ModalBox, 'Content'),
        m(ModalBackdrop, { onclick: backdropClick })
      )
    )

    // Exit animation completes → bridge closes the dialog
    endAnimation(getDialog(container))

    expect(getDialog(container).open).toBe(false)
  })

  // Case 6: Persistent bloquea backdrop
  test('6. Persistent bloquea backdrop — no onclick on backdrop, dialog stays open', () => {
    m.render(container,
      m(Modal, { open: true, persistent: true },
        m(ModalBox, 'Content'),
        m(ModalBackdrop)
      )
    )

    const backdrop = getBackdrop(container)
    expect(backdrop).not.toBeNull()

    // Click backdrop — no onclick wired, nothing should close
    backdrop.click()

    const dialog = getDialog(container)
    expect(dialog.open).toBe(true)
  })

  // Case 7: Scroll lock — moved to CSS, body:has(dialog[open]) rule exists in generated styles
  test('7. Scroll lock — CSS rule body:has(dialog[open]) exists in generated styles', async () => {
    m.render(container, m(Modal, { open: true }, m(ModalBox, 'Hello')))
    expect(getDialog(container).open).toBe(true)

    // Scroll lock no longer lives in JS. Verify the generated CSS contains the
    // body:has(dialog[open]) { overflow: hidden } rule instead.
    const fs = await import('node:fs')
    const css = fs.readFileSync(new URL('../styled-system/styles.css', import.meta.url), 'utf8')
    expect(css).toContain('body:has(dialog[open])')
  })

  // Case 9: aria-modal
  test('9. aria-modal — open={true} sets aria-modal="true" on dialog', () => {
    m.render(container, m(Modal, { open: true }, m(ModalBox, 'Hello')))
    const dialog = getDialog(container)
    expect(dialog.getAttribute('aria-modal')).toBe('true')
  })

  // Case 10: aria-labelledby
  test('10. aria-labelledby — labelledby prop sets aria-labelledby on dialog', () => {
    m.render(container, m(Modal, { open: true, labelledby: 'title-id' }, m(ModalBox, 'Hello')))
    const dialog = getDialog(container)
    expect(dialog.getAttribute('aria-labelledby')).toBe('title-id')
  })

  // Case 11: onclosed — fires after the exit animation ends, not synchronously
  test('11. onclosed — open={false} closes dialog and calls onclosed after animationend', () => {
    const onclosed = mock(() => {})

    m.render(container, m(Modal, { open: true, onclosed }, m(ModalBox, 'Hello')))
    expect(getDialog(container).open).toBe(true)

    // Trigger close
    m.render(container, m(Modal, { open: false, onclosed }, m(ModalBox, 'Hello')))

    // The bridge starts the exit animation synchronously…
    expect(getDialog(container).classList.contains('modal-closing')).toBe(true)
    // …but the dialog stays open until animationend fires
    expect(getDialog(container).open).toBe(true)
    expect(onclosed).not.toHaveBeenCalled()

    // Simulate the exit animation completing → bridge closes and fires onclosed
    endAnimation(getDialog(container))

    expect(onclosed).toHaveBeenCalledTimes(1)
    expect(getDialog(container).open).toBe(false)
  })

  // Case 12: Tamaños
  test('12. Tamaños — size="sm" adds modal-sm class to dialog', () => {
    m.render(container, m(Modal, { open: true, size: 'sm' }, m(ModalBox, 'Hello')))
    const dialog = getDialog(container)
    expect(dialog.classList.contains('modal-sm')).toBe(true)
  })
})
