import m from 'mithril'
import { css } from '../../../styled-system/css'
import { Accordion, AccordionTitle, AccordionContent } from '../../../src/index.js'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Accordion',
  category: 'Layout',
  description: 'Accordion component for collapsible content sections.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Accordion</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Accordion component for collapsible content sections.
        </p>

        <Accordion arrow>
          <AccordionTitle>First item</AccordionTitle>
          <AccordionContent>Content for the first accordion item.</AccordionContent>
        </Accordion>
        <Accordion plus>
          <AccordionTitle>Second item</AccordionTitle>
          <AccordionContent>Content for the second accordion item.</AccordionContent>
        </Accordion>
      </div>
    )
  }
}
