import m from 'mithril'
import { css } from '../../styled-system/css'
import { t } from '../i18n/index.js'
import { Button, Modal, ModalBox, ModalAction, ModalBackdrop } from '../../src/index.js'
import { CodeExample } from '../components/CodeExample.jsx'
import { ClassTable } from '../components/ClassTable.jsx'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '2rem' })
const row = css({ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' })
const title = css({ fontSize: '1.125rem', fontWeight: '700' })
const body = css({ paddingBlock: '1rem' })

const usageCode = `<Button onclick={() => { open = true }}>Open Modal</Button>

<Modal open={open} onclose={() => { open = false }}>
  <ModalBox>
    <h3>Hello!</h3>
    <p>This is a modal — press ESC, click outside, or the button to close.</p>
    <ModalAction>
      <Button onclick={() => { open = false }}>Close</Button>
    </ModalAction>
  </ModalBox>
  <ModalBackdrop onclick={() => { open = false }} />
</Modal>`

const classRows = [
  { className: 'modal', prop: '<Modal open onclose={...}>', type: 'Component', description: 'Native <dialog>-backed modal — `open` drives real .showModal()/.close()' },
  { className: 'modal-box', prop: '<ModalBox>', type: 'Part', description: 'The modal content box' },
  { className: 'modal-action', prop: '<ModalAction>', type: 'Part', description: 'Container for action buttons, right-aligned' },
  { className: 'modal-backdrop', prop: '<ModalBackdrop onclick={...}>', type: 'Part', description: 'Invisible button behind modal-box — click to close' },
  { className: 'modal-top', prop: 'position="top"', type: 'Placement', description: 'Modal box slides in from the top' },
  { className: 'modal-middle', prop: 'position="middle" (default)', type: 'Placement', description: 'Modal box centered', isDefault: true },
  { className: 'modal-bottom', prop: 'position="bottom"', type: 'Placement', description: 'Modal box slides in from the bottom' },
  { className: 'modal-start', prop: 'position="start"', type: 'Placement', description: 'Modal box slides in from the start (left)' },
  { className: 'modal-end', prop: 'position="end"', type: 'Placement', description: 'Modal box slides in from the end (right)' },
]

export default {
  oninit(vnode) {
    vnode.state.openFor = null
  },

  name: 'Modal',
  category: 'Feedback',
  description: 'Modal component for displaying dialog windows and overlays.',

  view(vnode) {
    const close = () => { vnode.state.openFor = null }
    const positions = ['middle', 'top', 'bottom', 'start', 'end']

    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Modal</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraphs.modal')}
        </p>

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
          <h2 className={sectionTitle}>{t('common.usage')}</h2>
          <CodeExample code={usageCode} />
        </section>

        <section>
          <h2 className={sectionTitle}>{t('common.classReference')}</h2>
          <ClassTable rows={classRows} />
        </section>
      </div>
    )
  }
}
