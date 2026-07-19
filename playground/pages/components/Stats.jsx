import m from 'mithril'
import { css } from '../../../styled-system/css'
import { Stats, Stat, StatTitle, StatValue, StatDesc } from '../../../src/index.js'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Stats',
  category: 'Data Display',
  description: 'Stats are used to show numerical data.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Stats</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Stats are used to show numerical data.
        </p>

        <Stats>
          <Stat>
            <StatTitle>Total Downloads</StatTitle>
            <StatValue>31K</StatValue>
            <StatDesc>From January 1 - February 1</StatDesc>
          </Stat>
          <Stat>
            <StatTitle>New Users</StatTitle>
            <StatValue color="secondary">4,200</StatValue>
            <StatDesc>42% more than last month</StatDesc>
          </Stat>
        </Stats>
      </div>
    )
  }
}
