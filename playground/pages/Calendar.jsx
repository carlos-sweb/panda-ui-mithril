import m from 'mithril'
import { css } from '../../styled-system/css'
import { Calendar } from '../../src/index.js'
import { CodeExample } from '../components/CodeExample.jsx'
import { ClassTable } from '../components/ClassTable.jsx'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '2rem' })
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
    vnode.state.selected = new Date()
  },

  name: 'Calendar',
  category: 'Data Input',
  description: 'Calendar component for selecting dates.',

  view(vnode) {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Calendar</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Calendar component for selecting dates. Real daisyUI has no calendar of its own — it
          only ships CSS to skin external web-component libraries. Since this project has real JS
          via Mithril, this is a fully working month-grid calendar (navigation, today, selection),
          no external dependency.
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
          <h2 className={sectionTitle}>Usage</h2>
          <CodeExample code={usageCode} />
        </section>

        <section>
          <h2 className={sectionTitle}>Class Reference</h2>
          <ClassTable rows={classRows} />
        </section>
      </div>
    )
  }
}
