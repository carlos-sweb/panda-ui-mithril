import m from 'mithril'
import { css } from '../../../styled-system/css'
import { Timeline, TimelineItem, TimelineStart, TimelineMiddle, TimelineEnd } from '../../../src/index.js'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Timeline',
  category: 'Data Display',
  description: 'Timeline component for displaying chronological events.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Timeline</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Timeline component for displaying chronological events.
        </p>

        <Timeline>
          <TimelineItem>
            <TimelineStart>January 2024</TimelineStart>
            <TimelineMiddle><div className="w-4 h-4 rounded-full bg-primary" /></TimelineMiddle>
            <TimelineEnd>First milestone</TimelineEnd>
          </TimelineItem>
          <TimelineItem>
            <TimelineStart>March 2024</TimelineStart>
            <TimelineMiddle><div className="w-4 h-4 rounded-full bg-secondary" /></TimelineMiddle>
            <TimelineEnd>Second milestone</TimelineEnd>
          </TimelineItem>
        </Timeline>
      </div>
    )
  }
}
