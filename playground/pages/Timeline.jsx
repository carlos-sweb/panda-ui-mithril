import m from 'mithril'
import { css } from '../../styled-system/css'
import { t } from '../i18n/index.js'
import { Timeline, TimelineItem, TimelineStart, TimelineMiddle, TimelineEnd } from '../../src/index.js'
import { CircleCheck } from 'lucide-mithril'
import { CodeExample } from '../components/CodeExample.jsx'
import { ClassTable } from '../components/ClassTable.jsx'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '2rem' })
const heading = css({ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 })
const section = css({ marginBottom: '2rem' })
const icon = css({ color: 'token(colors.primary)' })

const events = ['1984', '1998', '2001', '2007', '2015']
const labels = ['First Macintosh', 'iMac', 'iPod', 'iPhone', 'Apple Watch']

const usageCode = `<Timeline>
  <TimelineItem hrAfter>
    <TimelineStart>1984</TimelineStart>
    <TimelineMiddle><CircleCheck size={20} /></TimelineMiddle>
    <TimelineEnd box>First Macintosh</TimelineEnd>
  </TimelineItem>
  <TimelineItem hrBefore>
    <TimelineStart>1998</TimelineStart>
    <TimelineMiddle><CircleCheck size={20} /></TimelineMiddle>
    <TimelineEnd box>iMac</TimelineEnd>
  </TimelineItem>
</Timeline>`

const classRows = [
  { className: 'timeline', prop: '<Timeline>', type: 'Component', description: 'Timeline container' },
  { className: 'timeline-start', prop: '<TimelineStart>', type: 'Part', description: 'The content inside <li> at the start direction' },
  { className: 'timeline-middle', prop: '<TimelineMiddle>', type: 'Part', description: 'The content inside <li> at the middle' },
  { className: 'timeline-end', prop: '<TimelineEnd>', type: 'Part', description: 'The content inside <li> at the end direction' },
  { className: 'hr', prop: '<TimelineItem hrBefore/hrAfter>', type: 'Part', description: 'Connects items with a line' },
  { className: 'timeline-box', prop: '<TimelineStart box> / <TimelineEnd box>', type: 'Modifier', description: 'Applies a box style to timeline-start or timeline-end' },
  { className: 'timeline-snap-icon', prop: 'snapIcon', type: 'Modifier', description: 'snaps the icon to the start instead of middle' },
  { className: 'timeline-compact', type: 'Modifier', description: 'forces all items on one side — not supported by this component' },
  { className: 'timeline-horizontal', prop: '(default)', type: 'Placement', description: 'horizontal layout', isDefault: true },
  { className: 'timeline-vertical', prop: 'vertical', type: 'Placement', description: 'vertical layout' },
]

export default {
  name: 'Timeline',
  category: 'Data Display',
  description: 'Timeline component for displaying chronological events.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Timeline</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraphs.timeline')}
        </p>

        <section className={section}>
          <h3 className={heading}>Horizontal (default)</h3>
          <Timeline>
            {events.map((year, i) => (
              <TimelineItem key={year} hrBefore={i > 0} hrAfter={i < events.length - 1}>
                <TimelineStart>{year}</TimelineStart>
                <TimelineMiddle><CircleCheck size={20} className={icon} /></TimelineMiddle>
                <TimelineEnd box>{labels[i]}</TimelineEnd>
              </TimelineItem>
            ))}
          </Timeline>
        </section>

        <section className={section}>
          <h3 className={heading}>Vertical</h3>
          <Timeline vertical>
            {events.slice(0, 3).map((year, i) => (
              <TimelineItem key={year} hrBefore={i > 0} hrAfter={i < 2}>
                <TimelineStart>{year}</TimelineStart>
                <TimelineMiddle><CircleCheck size={20} className={icon} /></TimelineMiddle>
                <TimelineEnd box>{labels[i]}</TimelineEnd>
              </TimelineItem>
            ))}
          </Timeline>
        </section>

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
