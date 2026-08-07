import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Calendar } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const surface = css({
  display: 'inline-block',
  background: 'token(colors.base-100)',
  border: '1px solid',
  borderColor: 'token(colors.base-300)',
  boxShadow: '0 4px 12px color-mix(in oklab, black 15%, transparent)',
})
const picked = css({ marginTop: '0.75rem', fontSize: '0.875rem', opacity: 0.7 })

const usageCode = `<Calendar
  value={selectedDate}
  onchange={(date) => { selectedDate = date }}
/>`

const classRows = [
  { className: 'cally', prop: '<Calendar value={...} onchange={...}>', type: 'Component', description: 'Month-grid calendar with real date logic (navigable, no external library)' },
  { className: 'calendar-header', prop: '(internal)', type: 'Part', description: 'Month/year label with previous/next navigation' },
  { className: 'calendar-month', prop: '(internal)', type: 'Part', description: 'The 7-column weekday + day grid' },
  { className: 'calendar-date', prop: '(internal)', type: 'Part', description: 'A single day cell — today is highlighted primary, the selected value is highlighted solid' },
]

export default {
  oninit(vnode) {
    loadPageI18n('calendar')
    vnode.state.selected = new Date()
  },

  name: 'Calendar',
  category: 'Data Input',
  description: 'Calendar component for selecting dates.',

  view(vnode) {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Calendar</Title>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <div>
          <Calendar
            className={surface}
            value={vnode.state.selected}
            onchange={(date) => { vnode.state.selected = date }}
          />
          <p className={picked}>Selected: {vnode.state.selected.toDateString()}</p>
        </div>

        <section>
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <CodeExample code={usageCode} />
        </section>

        <section>
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={classRows} />
        </section>
      </div>
    )
  }
}
