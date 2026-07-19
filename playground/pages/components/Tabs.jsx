import m from 'mithril'
import { css } from '../../../styled-system/css'
import { Tabs, Tab } from '../../../src/index.js'

const section = css({ marginBottom: '2rem' })
const heading = css({ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 })
const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Tabs',
  category: 'Navigation',
  description: 'Tabs component for organizing content into tabbed panels.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Tabs</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Tabs component for organizing content into tabbed panels.
        </p>

        <section className={section}>
          <h3 className={heading}>Boxed</h3>
          <Tabs boxed>
            <Tab active>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </Tabs>
        </section>

        <section className={section}>
          <h3 className={heading}>Border</h3>
          <Tabs>
            <Tab active>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </Tabs>
        </section>

        <section className={section}>
          <h3 className={heading}>Lifted</h3>
          <Tabs lifted>
            <Tab active>Tab 1</Tab>
            <Tab>Tab 2</Tab>
          </Tabs>
        </section>
      </div>
    )
  }
}
