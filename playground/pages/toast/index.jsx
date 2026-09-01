import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Toast, Alert, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const placementBox = css({
  position: 'relative',
  height: '14rem',
  border: '1px dashed color-mix(in oklab, currentColor 20%, transparent)',
  borderRadius: '0.5rem',
  overflow: 'hidden',
})
const chip = css({
  position: 'absolute',
  fontSize: '0.75rem',
  fontFamily: 'var(--fonts-mono, monospace)',
  padding: '0.25rem 0.5rem',
  borderRadius: '0.25rem',
  background: 'color-mix(in oklab, currentColor 12%, transparent)',
})

const PLACEMENTS = [
  { label: 'top start', top: '0.5rem', left: '0.5rem' },
  { label: 'top center', top: '0.5rem', left: '50%', translateX: true },
  { label: 'top end', top: '0.5rem', right: '0.5rem' },
  { label: 'bottom start', bottom: '0.5rem', left: '0.5rem' },
  { label: 'bottom center', bottom: '0.5rem', left: '50%', translateX: true },
  { label: 'bottom end (default)', bottom: '0.5rem', right: '0.5rem' },
]

const usageCodeJsx = `import m from 'mithril'
import { Toast, Alert } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Toast position="bottom end">
          <Alert color="info">Toast notification!</Alert>
        </Toast>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Toast, Alert } from 'panda-ui-mithril'

export const ToastPage = {
  view() {
    return m(Toast, { position: 'bottom end' }, [
      m(Alert, { color: 'info' }, 'Toast notification!')
    ])
  }
}`

export default {
  name: 'Toast',
  category: 'Feedback',
  description: 'Toast component for showing temporary notifications.',

  oninit() { loadPageI18n('toast') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Toast</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Toast position="bottom end">
          <Alert color="info">Toast notification!</Alert>
        </Toast>

        <Title as="h3" size="5">{t('availablePlacements')}</Title>
        <div className={placementBox}>
          {PLACEMENTS.map((p) => (
            <span
              className={chip}
              style={{
                top: p.top,
                bottom: p.bottom,
                left: p.left,
                right: p.right,
                transform: p.translateX ? 'translateX(-50%)' : undefined,
              }}
            >
              {p.label}
            </span>
          ))}
        </div>

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
