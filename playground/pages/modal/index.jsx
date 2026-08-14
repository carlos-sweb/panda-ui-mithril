import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Button, Modal, ModalBox, ModalAction, ModalBackdrop } from '../../../src/index.js'
//import { modal } from '../../../src/recipes/modal'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const row = css({ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' })
const title = css({ fontSize: '1.125rem', fontWeight: '700' })
const body = css({ paddingBlock: '1rem' })
const hint = css({ opacity: 0.6, maxWidth: '600px' })

const usageCode = `<Button onclick={() => { open = true }}>Open Modal</Button>

<!-- size prop: xs / sm / md (default) / lg ; labelledby wires aria-labelledby to the h3 id -->
<Modal open={open} size="sm" labelledby="modal-title" onclose={() => { open = false }}>
  <ModalBox>
    <h3 id="modal-title" className={modal({}).header}>Hello!</h3>
    <p className={modal({}).body}>This is a sized modal — press ESC, click outside, or the button to close.</p>
    <ModalAction className={modal({}).footer}>
      <Button onclick={() => { open = false }}>Close</Button>
    </ModalAction>
  </ModalBox>
  <ModalBackdrop onclick={() => { open = false }} />
</Modal>

<!-- persistent: ESC and backdrop click do NOT close it; only the button below dismisses -->
<Modal open={open} persistent>
  <ModalBox>
    <h3>Persistent</h3>
    <p>You must use the button below to close this modal.</p>
    <ModalAction>
      <Button onclick={() => { open = false }}>Close</Button>
    </ModalAction>
  </ModalBox>
</Modal>`

const classRows = [
  { className: 'modal', prop: '<Modal open onclose={...}>', type: 'Component', description: 'Native <dialog>-backed modal — `open` drives real .showModal()/.close()' },
  { className: 'modal-box', prop: '<ModalBox>', type: 'Part', description: 'The modal content box' },
  { className: 'modal-action', prop: '<ModalAction>', type: 'Part', description: 'Container for actions, right-aligned' },
  { className: 'modal-backdrop', prop: '<ModalBackdrop onclick={...}>', type: 'Part', description: 'Invisible button behind modal-box — click to close' },
  { className: 'modal-xs', prop: 'size="xs"', type: 'Size', description: 'Panel max-width: 20rem (320px)' },
  { className: 'modal-sm', prop: 'size="sm"', type: 'Size', description: 'Panel max-width: 24rem (384px)' },
  { className: 'modal-md', prop: 'size="md" (default)', type: 'Size', description: 'Panel max-width: 32rem (512px)', isDefault: true },
  { className: 'modal-lg', prop: 'size="lg"', type: 'Size', description: 'Panel max-width: 48rem (768px)' },
  { className: 'modal-top', prop: 'position="top"', type: 'Placement', description: 'Modal box slides in from the top' },
  { className: 'modal-middle', prop: 'position="middle" (default)', type: 'Placement', description: 'Modal box centered', isDefault: true },
  { className: 'modal-bottom', prop: 'position="bottom"', type: 'Placement', description: 'Modal box slides in from the bottom' },
  { className: 'modal-start', prop: 'position="start"', type: 'Placement', description: 'Modal box slides in from the start (left)' },
  { className: 'modal-end', prop: 'position="end"', type: 'Placement', description: 'Modal box slides in from the end (right)' },
  { className: '—', prop: 'buttonClose', type: 'Modifier', description: 'Auto-append ButtonClose in ModalAction (form method="dialog")' },
]

export default {
  oninit(vnode) {
    loadPageI18n('modal')
    vnode.state.openFor = null
    vnode.state.sizeFor = null
    vnode.state.sizeOpen = false
    vnode.state.persistentOpen = false
    vnode.state.autoCloseOpen = false
  },

  name: 'Modal',
  category: 'Feedback',
  description: 'Modal component for displaying dialog windows and overlays.',

  view(vnode) {
    const close = () => { vnode.state.openFor = null }
    const closeSize = () => { vnode.state.sizeOpen = false }
    const closePersistent = () => { vnode.state.persistentOpen = false }
    const positions = ['middle', 'top', 'bottom', 'start', 'end']
    const sizes = ['xs', 'sm', 'md', 'lg']

    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Modal</Title>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <Title as="h2" size="3">Sizes</Title>
        <div className={row}>
          {sizes.map((s) => (
            <Button key={s} onclick={() => { vnode.state.sizeFor = s; vnode.state.sizeOpen = true }}>
              Open ({s.toUpperCase()})
            </Button>
          ))}
        </div>

        <Modal
          size={vnode.state.sizeFor || undefined}
          open={vnode.state.sizeOpen}
          labelledby="size-modal-title"
          onclose={closeSize}
          onclosed={() => { vnode.state.sizeFor = null }}
        >
          <ModalBox>
            <h3 id="size-modal-title" className={modal({}).header}>
              Size: {vnode.state.sizeFor ? vnode.state.sizeFor.toUpperCase() : ''}
            </h3>
            <p className={modal({}).body}>
              This modal is rendered with <code>size="{vnode.state.sizeFor}"</code>. The same
              Modal instance is reused — only the size prop changes.
            </p>
            <ModalAction className={modal({}).footer}>
              <Button onclick={closeSize}>Close</Button>
            </ModalAction>
          </ModalBox>
          <ModalBackdrop onclick={closeSize} />
        </Modal>

        <Title as="h2" size="3">Persistent</Title>
        <p className={hint}>
          This modal is persistent — ESC and clicking outside won't close it; use the Close button.
        </p>
        <div className={row}>
          <Button onclick={() => { vnode.state.persistentOpen = true }}>
            Open persistent modal
          </Button>
        </div>

        <Modal persistent open={vnode.state.persistentOpen}>
          <ModalBox>
            <h3 className={modal({}).header}>Persistent modal</h3>
            <p className={modal({}).body}>
              You cannot close this modal with ESC or by clicking outside. The only way to
              dismiss it is the button below.
            </p>
            <ModalAction className={modal({}).footer}>
              <Button onclick={closePersistent}>Close</Button>
            </ModalAction>
          </ModalBox>
        </Modal>

        <div className={row}>
          {positions.map((p) => (
            <Button key={p} onclick={() => { vnode.state.openFor = p }}>
              Open ({p})
            </Button>
          ))}
        </div>

        {positions.map((p) => (
          <Modal key={p} position={p === 'middle' ? undefined : p} open={vnode.state.openFor === p} onclose={close}>
            <ModalBox>
              <h3 className={title}>Hello! ({p})</h3>
              <p className={body}>
                This is a modal dialog using the <code>Modal</code> component. Press ESC, click
                outside, or the button below to close.
              </p>
              <ModalAction>
                <Button onclick={close}>Close</Button>
              </ModalAction>
            </ModalBox>
            <ModalBackdrop onclick={close} />
          </Modal>
        ))}

        <section>
          <Title as="h2" size="3">Auto Close Button</Title>
          <Button
            className={css({ marginBottom: '1rem' })}
            onclick={() => { vnode.state.autoCloseOpen = true }}
          >
            Open with buttonClose
          </Button>
          <Modal open={vnode.state.autoCloseOpen} buttonClose onclose={() => { vnode.state.autoCloseOpen = false }}>
            <ModalBox>
              <h3 className={css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' })}>Auto Close</h3>
              <p className={css({ opacity: 0.7, marginBottom: '1rem' })}>This modal has <code>buttonClose</code>. The X button is added automatically.</p>
            </ModalBox>
            <ModalBackdrop onclick={() => { vnode.state.autoCloseOpen = false }} />
          </Modal>
        </section>


        <section>
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <CodeExample code={usageCode} />
        </section>

        <section>
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={classRows} />
        </section>
      </Stack>
    )
  }
}
