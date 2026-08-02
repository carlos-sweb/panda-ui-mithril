import m from 'mithril'
import { css } from '../../styled-system/css'
import { Accordion, AccordionTitle, AccordionContent } from '../../src/index.js'
import { CodeExample } from '../components/CodeExample.jsx'
import { ClassTable } from '../components/ClassTable.jsx'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '2rem' })
const heading = css({ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 })
const section = css({ marginBottom: '2rem' })
const group = css({ display: 'flex', flexDirection: 'column', gap: '0.5rem' })
const surface = css({ background: 'base-100', border: '1px solid', borderColor: 'base-300' })

const usageCode = `<Accordion name="faq" arrow defaultChecked>
  <AccordionTitle>What is daisyUI?</AccordionTitle>
  <AccordionContent>A component library for Tailwind CSS.</AccordionContent>
</Accordion>
<Accordion name="faq" arrow>
  <AccordionTitle>Is it free?</AccordionTitle>
  <AccordionContent>Yes, it's open source and free to use.</AccordionContent>
</Accordion>`

const classRows = [
  { className: 'collapse', prop: '<Accordion name="...">', type: 'Component', description: 'An accordion item — same underlying component as Collapse, but items sharing a `name` become a radio group where only one stays open' },
  { className: 'collapse-title', prop: '<AccordionTitle>', type: 'Part', description: 'Title part' },
  { className: 'collapse-content', prop: '<AccordionContent>', type: 'Part', description: 'Content part' },
  { className: 'collapse-arrow', prop: 'arrow', type: 'Modifier', description: 'Adds arrow icon' },
  { className: 'collapse-plus', prop: 'plus', type: 'Modifier', description: 'Adds plus/minus icon' },
]

export default {
  name: 'Accordion',
  category: 'Layout',
  description: 'Accordion component for collapsible content sections.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Accordion</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Accordion component for collapsible content sections. This is the same{' '}
          <a href="#!/collapse">Collapse</a> primitive — pass the same <code>name</code> to a
          group of items (radio inputs under the hood) so opening one closes the others.
        </p>

        <section className={section}>
          <h3 className={heading}>Grouped (only one open at a time)</h3>
          <div className={group}>
            <Accordion name="faq" arrow defaultChecked className={surface}>
              <AccordionTitle>What is daisyUI?</AccordionTitle>
              <AccordionContent>A component library for Tailwind CSS with a huge set of pre-styled UI components.</AccordionContent>
            </Accordion>
            <Accordion name="faq" arrow className={surface}>
              <AccordionTitle>Is it free?</AccordionTitle>
              <AccordionContent>Yes, it's open source (MIT license) and free to use.</AccordionContent>
            </Accordion>
            <Accordion name="faq" arrow className={surface}>
              <AccordionTitle>Does it work with any framework?</AccordionTitle>
              <AccordionContent>Yes — it's plain CSS, so it works with React, Vue, Svelte, Mithril, or plain HTML.</AccordionContent>
            </Accordion>
          </div>
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
