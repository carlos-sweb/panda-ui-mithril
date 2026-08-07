import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Accordion, AccordionTitle, AccordionContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '2rem' })
const section = css({ marginBottom: '2rem' })
const group = css({ display: 'flex', flexDirection: 'column', gap: '0.5rem' })

const usageCode = `<Accordion name="faq" arrow border defaultChecked>
  <AccordionTitle>What is panda-ui-mithril?</AccordionTitle>
  <AccordionContent>A component library for Tailwind CSS.</AccordionContent>
</Accordion>
<Accordion name="faq" arrow border>
  <AccordionTitle>Is it free?</AccordionTitle>
  <AccordionContent>Yes, it's open source and free to use.</AccordionContent>
</Accordion>`

const classRows = [
  { className: 'collapse', prop: '<Accordion name="...">', type: 'Component', description: 'An accordion item — same underlying component as Collapse, but items sharing a `name` become a radio group where only one stays open' },
  { className: 'collapse-title', prop: '<AccordionTitle>', type: 'Part', description: 'Title part' },
  { className: 'collapse-content', prop: '<AccordionContent>', type: 'Part', description: 'Content part' },
  { className: 'collapse-arrow', prop: 'arrow', type: 'Modifier', description: 'Adds arrow icon' },
  { className: 'collapse-plus', prop: 'plus', type: 'Modifier', description: 'Adds plus/minus icon' },
  { className: '—', prop: 'border', type: 'Modifier', description: 'base-100 background + base-300 border (the reference implementation applies this via plain utility classes, not a component class)' },
]

export default {
  name: 'Accordion',
  category: 'Layout',
  description: 'Accordion component for collapsible content sections.',

  oninit() { loadPageI18n('accordion') },
  view() {
    return (
      <div className={stack}>
        <Title as="h1" size="2">Accordion</Title>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <section className={section}>
          <Title as="h3" size="5">Grouped (only one open at a time)</Title>
          <div className={group}>
            <Accordion name="faq" arrow border defaultChecked>
              <AccordionTitle>What is panda-ui-mithril?</AccordionTitle>
              <AccordionContent>A component library for Tailwind CSS with a huge set of pre-styled UI components.</AccordionContent>
            </Accordion>
            <Accordion name="faq" arrow border>
              <AccordionTitle>Is it free?</AccordionTitle>
              <AccordionContent>Yes, it's open source (MIT license) and free to use.</AccordionContent>
            </Accordion>
            <Accordion name="faq" arrow border>
              <AccordionTitle>Does it work with any framework?</AccordionTitle>
              <AccordionContent>Yes — it's plain CSS, so it works with React, Vue, Svelte, Mithril, or plain HTML.</AccordionContent>
            </Accordion>
          </div>
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
