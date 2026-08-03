import m from 'mithril'
import { css } from '../../styled-system/css'
import { Collapse, CollapseTitle, CollapseContent } from '../../src/index.js'
import { CodeExample } from '../components/CodeExample.jsx'
import { ClassTable } from '../components/ClassTable.jsx'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '2rem' })
const heading = css({ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 })
const section = css({ marginBottom: '2rem' })

const usageCode = `<Collapse plus border>
  <CollapseTitle>How do I create an account?</CollapseTitle>
  <CollapseContent>
    Click the "Sign Up" button in the top right corner and follow the registration process.
  </CollapseContent>
</Collapse>`

const classRows = [
  { className: 'collapse', prop: '<Collapse>', type: 'Component', description: 'Collapse container — click the title to toggle' },
  { className: 'collapse-title', prop: '<CollapseTitle>', type: 'Part', description: 'Title part' },
  { className: 'collapse-content', prop: '<CollapseContent>', type: 'Part', description: 'Content part' },
  { className: 'collapse-arrow', prop: 'arrow', type: 'Modifier', description: 'Adds arrow icon' },
  { className: 'collapse-plus', prop: 'plus', type: 'Modifier', description: 'Adds plus/minus icon' },
  { className: 'collapse-open', prop: 'checked', type: 'Modifier', description: 'Force open (controlled)' },
  { className: '—', prop: 'border', type: 'Modifier', description: 'base-100 background + base-300 border (the reference implementation applies this via plain utility classes, not a component class)' },
]

export default {
  name: 'Collapse',
  category: 'Layout',
  description: 'Collapse component for toggling visibility of content sections.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Collapse</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Collapse component for toggling visibility of content sections. Click the title to
          toggle — driven by a hidden native checkbox, no JS required for the basic case (see{' '}
          <a href="#!/accordion">Accordion</a> for grouped, only-one-open behavior).
        </p>

        <section className={section}>
          <h3 className={heading}>Arrow</h3>
          <Collapse arrow border>
            <CollapseTitle>How do I create an account?</CollapseTitle>
            <CollapseContent>
              Click the "Sign Up" button in the top right corner and follow the registration process.
            </CollapseContent>
          </Collapse>
        </section>

        <section className={section}>
          <h3 className={heading}>Plus / minus</h3>
          <Collapse plus border>
            <CollapseTitle>Can I cancel my subscription?</CollapseTitle>
            <CollapseContent>
              Yes, you can cancel anytime from your account settings — no questions asked.
            </CollapseContent>
          </Collapse>
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
