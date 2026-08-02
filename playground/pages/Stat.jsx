import m from 'mithril'
import { css } from '../../styled-system/css'
import { Stats, Stat, StatTitle, StatValue, StatDesc, StatFigure, StatActions, Button } from '../../src/index.js'
import { Wallet, Users, ThumbsUp } from 'lucide-mithril'
import { CodeExample } from '../components/CodeExample.jsx'
import { ClassTable } from '../components/ClassTable.jsx'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '2rem' })
const heading = css({ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 })
const section = css({ marginBottom: '2rem' })
const shadow = css({ boxShadow: '0 1px 3px color-mix(in oklab, black 15%, transparent)' })

const usageCode = `<Stats>
  <Stat>
    <StatFigure><Wallet size={32} /></StatFigure>
    <StatTitle>Total Downloads</StatTitle>
    <StatValue>31K</StatValue>
    <StatDesc>From January 1 - February 1</StatDesc>
  </Stat>
</Stats>`

const classRows = [
  { className: 'stats', prop: '<Stats>', type: 'Component', description: 'Container for stat boxes' },
  { className: 'stat', prop: '<Stat>', type: 'Component', description: 'Container for a single stat' },
  { className: 'stat-title', prop: '<StatTitle>', type: 'Part', description: 'The title of the stat' },
  { className: 'stat-value', prop: '<StatValue>', type: 'Part', description: 'The value of the stat' },
  { className: 'stat-desc', prop: '<StatDesc>', type: 'Part', description: 'The description of the stat' },
  { className: 'stat-figure', prop: '<StatFigure>', type: 'Part', description: 'Container for a figure/icon in the stat' },
  { className: 'stat-actions', prop: '<StatActions>', type: 'Part', description: 'Container for buttons/actions in the stat' },
  { className: 'stats-horizontal', prop: '(default)', type: 'Placement', description: 'Shows stats horizontally', isDefault: true },
  { className: 'stats-vertical', prop: 'vertical', type: 'Placement', description: 'Shows stats vertically' },
]

export default {
  name: 'Stats',
  category: 'Data Display',
  description: 'Stats are used to show numerical data.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Stats</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Stats are used to show numerical data.
        </p>

        <section className={section}>
          <h3 className={heading}>With figures & actions</h3>
          <Stats className={shadow}>
            <Stat>
              <StatFigure><Wallet size={32} /></StatFigure>
              <StatTitle>Total Downloads</StatTitle>
              <StatValue>31K</StatValue>
              <StatDesc>From January 1 - February 1</StatDesc>
            </Stat>
            <Stat>
              <StatFigure><Users size={32} /></StatFigure>
              <StatTitle>New Users</StatTitle>
              <StatValue>4,200</StatValue>
              <StatDesc>↗︎ 400 (22%)</StatDesc>
            </Stat>
            <Stat>
              <StatFigure><ThumbsUp size={32} /></StatFigure>
              <StatTitle>New Registers</StatTitle>
              <StatValue>1,200</StatValue>
              <StatActions>
                <Button size="sm" color="success">Add</Button>
              </StatActions>
            </Stat>
          </Stats>
        </section>

        <section className={section}>
          <h3 className={heading}>Vertical</h3>
          <Stats vertical className={shadow}>
            <Stat>
              <StatTitle>Total Downloads</StatTitle>
              <StatValue>31K</StatValue>
              <StatDesc>From January 1 - February 1</StatDesc>
            </Stat>
            <Stat>
              <StatTitle>New Users</StatTitle>
              <StatValue>4,200</StatValue>
              <StatDesc>42% more than last month</StatDesc>
            </Stat>
          </Stats>
        </section>

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
