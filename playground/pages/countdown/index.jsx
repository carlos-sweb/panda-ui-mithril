import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Countdown, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

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
        {/* Presentational mode */}
        <Countdown value={59} />
        <Countdown value={7} digits={2} />

        {/* Timer mode */}
        <Countdown
          duration={10}
          autostart
          oncomplete={() => console.log('done!')}
        />
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Countdown } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m('div', null, [
      // Presentational mode
      m(Countdown, { value: 59 }),
      m(Countdown, { value: 7, digits: 2 }),

      // Timer mode
      m(Countdown, {
        duration: 10,
        autostart: true,
        oncomplete: () => console.log('done!')
      })
    ])
  }
}`

export default {
  oninit(vnode) {
    loadPageI18n('countdown')
    vnode.state.seconds = 59
    vnode.state.done = false
  },

  name: 'Countdown',
  category: 'Data Display',
  description: 'Countdown component for displaying remaining time.',

  view(vnode) {
    const { seconds, done } = vnode.state
    const minutes = 59
    const hours = 23

    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Countdown</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Block spacing="lg">
          <Title as="h3" size="5">Presentational</Title>
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
          <Title as="h3" size="5">Timer Mode (with oncomplete)</Title>
          <Countdown
            duration={10}
            autostart
            oncomplete={() => { vnode.state.done = true }}
          />
          <Text color={done ? 'success' : 'neutral'} className={css({ marginTop: '0.5rem' })}>
            {done ? 'Ready to resend!' : 'Waiting...'}
          </Text>
          {done && (
            <Block spacing="sm">
              <Countdown
                duration={10}
                autostart
                oncomplete={() => { vnode.state.done = false }}
              />
            </Block>
          )}
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
