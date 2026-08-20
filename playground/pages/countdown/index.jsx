import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Countdown, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const big = css({ fontFamily: 'var(--fonts-mono, monospace)', fontSize: '3.5rem' })
const clock = css({ display: 'flex', alignItems: 'center', gap: '0.5rem' })
const clockUnit = css({ display: 'flex', flexDirection: 'column', alignItems: 'center' })
const clockLabel = css({ fontSize: '0.6875rem', opacity: 0.5, textTransform: 'uppercase' })

const usageCodeJsx = `import m from 'mithril'
import { Countdown } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Countdown value={59} />
        <Countdown value={7} digits={2} className="text-6xl font-mono" />
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Countdown } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m('div', null, [
      m(Countdown, { value: 59 }),
      m(Countdown, { value: 7, digits: 2, className: 'text-6xl font-mono' })
    ])
  }
}`

const classRows = [
  { className: 'countdown', prop: '<Countdown value={...}>', type: 'Component', description: 'Countdown wrapper — value must be a number between 0 and 999' },
]

export default {
  oninit(vnode) {
    loadPageI18n('countdown')
    vnode.state.seconds = 59
    vnode.state.timer = setInterval(() => {
      vnode.state.seconds = vnode.state.seconds > 0 ? vnode.state.seconds - 1 : 59
      m.redraw()
    }, 1000)
  },

  onremove(vnode) {
    clearInterval(vnode.state.timer)
  },

  name: 'Countdown',
  category: 'Data Display',
  description: 'Countdown component for displaying remaining time.',

  view(vnode) {
    const { seconds } = vnode.state
    const minutes = 59
    const hours = 23

    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Countdown</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Block spacing="lg">
          <Title as="h3" size="5">Live (ticking)</Title>
          <Countdown value={seconds} className={big} />
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Clock layout (hh:mm:ss)</Title>
          <div className={clock}>
            <div className={clockUnit}><Countdown value={hours} digits={2} className={big} /><span className={clockLabel}>hours</span></div>
            <span className={big}>:</span>
            <div className={clockUnit}><Countdown value={minutes} digits={2} className={big} /><span className={clockLabel}>min</span></div>
            <span className={big}>:</span>
            <div className={clockUnit}><Countdown value={seconds} digits={2} className={big} /><span className={clockLabel}>sec</span></div>
          </div>
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
          <ClassTable rows={classRows} />
        </Block>
      </Stack>
    )
  }
}
