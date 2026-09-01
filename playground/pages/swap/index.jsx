import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Title, Swap, Stack, Text, Block, Badge, Tabs, Tab, TabContent } from '../../../src/index.js'
import { Sun, Moon } from 'lucide-mithril'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const heading = css({ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 })
const stateBadge = css({
  padding: '0.5rem 1rem',
  background: 'token(colors.base-300)',
  borderRadius: 'var(--radius-box)',
  fontSize: '0.875rem',
  marginTop: '0.5rem',
})

const usageCodeJsx = `import m from 'mithril'
import { Swap } from 'panda-ui-mithril'
import { Sun, Moon } from 'lucide-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Swap on="On" off="Off" style="rotate" />
        <Swap on="☀️" off="🌙" style="flip" />
        <Swap on={<Sun size={20} />} off={<Moon size={20} />} style="rotate" />

        <!-- Controlled with onchange -->
        <Swap
          on={<Sun size={20} />}
          off={<Moon size={20} />}
          style="rotate"
          checked={state}
          onchange={(checked, e) => { state = checked }}
        />
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Swap } from 'panda-ui-mithril'
import { Sun, Moon } from 'lucide-mithril'

export const SwapPage = {
  view() {
    return m('div', null, [
      m(Swap, { on: 'On', off: 'Off', style: 'rotate' }),
      m(Swap, { on: '☀️', off: '🌙', style: 'flip' }),
      m(Swap, { on: m(Sun, { size: 20 }), off: m(Moon, { size: 20 }), style: 'rotate' }),
      // Controlled
      m(Swap, {
        on: m(Sun, { size: 20 }),
        off: m(Moon, { size: 20 }),
        style: 'rotate',
        checked: state,
        onchange: (checked) => { state = checked }
      })
    ])
  }
}`

export default {
  name: 'Swap',
  category: 'Actions',
  description: 'Swap elements with a transition animation.',

  oninit(vnode) {
    loadPageI18n('swap')
    vnode.state.swapChecked = false
  },
  view(vnode) {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Swap</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Stack direction="row" gap="sm">
          <Swap on="On" off="Off" style="rotate" />
          <Swap on="On" off="Off" style="flip" />
          <Swap on={<Sun size={20} />} off={<Moon size={20} />} style="rotate" />
          <Swap>
            <span>Manual (children)</span>
          </Swap>
        </Stack>
        <Text size="sm" color="neutral">
          {t('swapNote1')}<code>on</code>/<code>off</code>{t('swapNote2')}
        </Text>

        <Title as="h3" size="5">{t('common.subtitles.sizes')}</Title>
        <Text size="sm" color="neutral" className={heading}>XS · SM · MD · LG · XL</Text>
        <Stack direction="row" gap="sm">
          <Swap size="xs" on="XS" off="XS" style="flip" />
          <Swap size="sm" on="SM" off="SM" style="flip" />
          <Swap size="md" on="MD" off="MD" style="flip" />
          <Swap size="lg" on="LG" off="LG" style="flip" />
          <Swap size="xl" on="XL" off="XL" style="flip" />
        </Stack>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('controlledTitle')}</Title>
          <Text size="sm" color="neutral" className={css({ marginBottom: '0.75rem' })}>
            {t('controlledDescription')}
          </Text>
          <Stack direction="row" gap="sm" alignItems="center">
            <Swap
              on={<Sun size={20} />}
              off={<Moon size={20} />}
              style="rotate"
              checked={vnode.state.swapChecked}
              onchange={(checked) => { vnode.state.swapChecked = checked }}
            />
            <Text size="sm">State: {vnode.state.swapChecked ? 'on' : 'off'}</Text>
          </Stack>
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
