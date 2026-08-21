import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Accordion, AccordionTitle, AccordionContent, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const group = css({ display: 'flex', flexDirection: 'column', gap: '0.5rem' })

const usageCodeJsx = `import m from 'mithril'
import { Accordion, AccordionTitle, AccordionContent } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Accordion name="faq" arrow border defaultChecked>
          <AccordionTitle>What is panda-ui-mithril?</AccordionTitle>
          <AccordionContent>A component library for Tailwind CSS.</AccordionContent>
        </Accordion>
        <Accordion name="faq" arrow border>
          <AccordionTitle>Is it free?</AccordionTitle>
          <AccordionContent>Yes, it's open source and free to use.</AccordionContent>
        </Accordion>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Accordion, AccordionTitle, AccordionContent } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m('div', null, [
      m(Accordion, { name: 'faq', arrow: true, border: true, defaultChecked: true }, [
        m(AccordionTitle, null, 'What is panda-ui-mithril?'),
        m(AccordionContent, null, 'A component library for Tailwind CSS.')
      ]),
      m(Accordion, { name: 'faq', arrow: true, border: true }, [
        m(AccordionTitle, null, 'Is it free?'),
        m(AccordionContent, null, "Yes, it's open source and free to use.")
      ])
    ])
  }
}`

export default {
  name: 'Accordion',
  category: 'Layout',
  description: 'Accordion component for collapsible content sections.',

  oninit() { loadPageI18n('accordion') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Accordion</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Block spacing="lg">
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
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <Tabs defaultActive="jsx" lifted size="lg">
            <Tab ref="jsx">Jsx</Tab>
            <Tab ref="js">Js</Tab>
            <TabContent ref="jsx">
              <CodeExample copyId="accordion-jsx-copy" type="jsx" code={usageCodeJsx} />
            </TabContent>
            <TabContent ref="js">
              <CodeExample copyId="accordion-js-copy" type="javascript" code={usageCodeJavascript} />
            </TabContent>
          </Tabs>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={tableToRows(table)} />
        </Block>
      </Stack>
    )
  }
}
