import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Button, Modal, ModalBox, ModalAction, ModalBackdrop, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { modal } from '../../../styled-system/recipes'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const title = css({ fontSize: '1.125rem', fontWeight: '700' })
const body = css({ paddingBlock: '1rem' })

const usageCodeJsx = `import m from 'mithril'
import { Button, Modal, ModalBox, ModalAction, ModalBackdrop } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Button onclick={() => { open = true }}>Open Modal</Button>

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
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Button, Modal, ModalBox, ModalAction, ModalBackdrop } from 'panda-ui-mithril'
import { modal } from 'panda-ui-mithril/styled-system/recipes'

export const MyPage = {
  view() {
    return m('div', null, [
      m(Button, { onclick: () => { open = true } }, 'Open Modal'),
      m(Modal, { open: open, size: 'sm', labelledby: 'modal-title', onclose: () => { open = false } }, [
        m(ModalBox, null, [
          m('h3', { id: 'modal-title', className: modal({}).header }, 'Hello!'),
          m('p', { className: modal({}).body }, 'This is a sized modal'),
          m(ModalAction, { className: modal({}).footer }, [
            m(Button, { onclick: () => { open = false } }, 'Close')
          ])
        ]),
        m(ModalBackdrop, { onclick: () => { open = false } })
      ])
    ])
  }
}`

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
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Title as="h2" size="3">{t('common.subtitles.sizes')}</Title>
        <Stack direction="row" gap="sm">
          {sizes.map((s) => (
            <Button key={s} onclick={() => { vnode.state.sizeFor = s; vnode.state.sizeOpen = true }}>
              Open ({s.toUpperCase()})
            </Button>
          ))}
        </Stack>

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

        <Title as="h2" size="3">{t('persistent')}</Title>
        <Text color="neutral">
          {t('persistentDescription')}
        </Text>
        <Stack direction="row" gap="sm">
          <Button onclick={() => { vnode.state.persistentOpen = true }}>
            Open persistent modal
          </Button>
        </Stack>

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

        <Stack direction="row" gap="sm">
          {positions.map((p) => (
            <Button key={p} onclick={() => { vnode.state.openFor = p }}>
              Open ({p})
            </Button>
          ))}
        </Stack>

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

        <Block spacing="lg">
          <Title as="h2" size="3">{t('autoCloseButton')}</Title>
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
        </Block>


        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <Tabs defaultActive="jsx" lifted size="lg">
            <Tab ref="jsx">Jsx</Tab>
            <Tab ref="js">Js</Tab>
            <TabContent ref="jsx">
              <CodeExample type="jsx" code={usageCodeJsx} />
            </TabContent>
            <TabContent ref="js">
              <CodeExample type="javascript" code={usageCodeJavascript} />
            </TabContent>
          </Tabs>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={tableToRows(table)} />
        </Block>
      </Stack>
    )
  }
}
