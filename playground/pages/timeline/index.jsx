import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Timeline, TimelineItem, TimelineStart, TimelineMiddle, TimelineEnd } from '../../../src/index.js'
import { CircleCheck } from 'lucide-mithril'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

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

  oninit() { loadPageI18n('timeline') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Timeline</Title>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <section className={section}>
          <Title as="h3" size="5">Horizontal (default)</Title>
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
          <Title as="h3" size="5">Vertical</Title>
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
