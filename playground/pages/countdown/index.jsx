import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Block, Countdown } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const big = css({ fontFamily: 'var(--fonts-mono, monospace)', fontSize: '3.5rem' })
const clock = css({ display: 'flex', alignItems: 'center', gap: '0.5rem' })
const clockUnit = css({ display: 'flex', flexDirection: 'column', alignItems: 'center' })
const clockLabel = css({ fontSize: '0.6875rem', opacity: 0.5, textTransform: 'uppercase' })

const usageCode = `<Countdown value={59} />
<Countdown value={7} digits={2} className="text-6xl font-mono" />`

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
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <Block spacing="lg" as="section">
          <Title as="h3" size="5">Live (ticking)</Title>
          <Countdown value={seconds} className={big} />
        </Block>

        <Block spacing="lg" as="section">
          <Title as="h3" size="5">Clock layout (hh:mm:ss)</Title>
          <div className={clock}>
            <div className={clockUnit}><Countdown value={hours} digits={2} className={big} /><span className={clockLabel}>hours</span></div>
            <span className={big}>:</span>
            <div className={clockUnit}><Countdown value={minutes} digits={2} className={big} /><span className={clockLabel}>min</span></div>
            <span className={big}>:</span>
            <div className={clockUnit}><Countdown value={seconds} digits={2} className={big} /><span className={clockLabel}>sec</span></div>
          </div>
        </Block>

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
