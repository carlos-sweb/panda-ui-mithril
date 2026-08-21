import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, ButtonCopy, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const usageCodeJsx = `import m from 'mithril'
import { ButtonCopy } from 'panda-ui-mithril'

// No tooltip — just the button
m(ButtonCopy, { text: 'Hello world' })

// With tooltip feedback
m(ButtonCopy, { text: 'Hello world', tooltip: 'Copied!' })

// Copy from a DOM element by id
m('p', { id: 'my-text' }, 'Click the button to copy me')
m(ButtonCopy, { for: 'my-text', tooltip: 'Copied!' })

// Compose inline with Text
m(Stack, { direction: 'row', align: 'center', gap: 'sm' }, [
  m(Text, { id: 'api-key' }, 'sk-abc123xyz'),
  m(ButtonCopy, { for: 'api-key', variant: 'ghost', size: 'sm', tooltip: 'Copied!' })
])

// Custom animation
m(ButtonCopy, { text: 'Hello', tooltip: 'Done!', animation: 'rotate' })
m(ButtonCopy, { text: 'Hello', animation: 'none' })`

const usageCodeJavascript = `import m from 'mithril'
import { ButtonCopy } from 'panda-ui-mithril'

// No tooltip — just the button
m(ButtonCopy, { text: 'Hello world' })

// With tooltip feedback
m(ButtonCopy, { text: 'Hello world', tooltip: 'Copied!' })

// Copy from a DOM element by id
m('p', { id: 'my-text' }, 'Click the button to copy me')
m(ButtonCopy, { for: 'my-text', tooltip: 'Copied!' })`

export default {
  name: 'ButtonCopy',
  category: 'Actions',
  description: 'Button that copies text to the clipboard with a visual confirmation tooltip.',

  oninit() { loadPageI18n('buttoncopy') },

  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">ButtonCopy</Title>

        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        {/* Default */}
        <Block spacing="lg">
          <Title as="h3" size="5">Default</Title>
          <Stack direction="row" gap="sm" wrap="wrap" align="center">
            <ButtonCopy text="Hello from ButtonCopy!" tooltip="Copied!" />
          </Stack>
        </Block>

        {/* Sizes */}
        <Block spacing="lg">
          <Title as="h3" size="5">Sizes</Title>
          <Stack direction="row" gap="sm" wrap="wrap" align="center">
            <ButtonCopy text="xs" size="xs" tooltip="Copied!" />
            <ButtonCopy text="sm" size="sm" tooltip="Copied!" />
            <ButtonCopy text="md" size="md" tooltip="Copied!" />
            <ButtonCopy text="lg" size="lg" tooltip="Copied!" />
            <ButtonCopy text="xl" size="xl" tooltip="Copied!" />
          </Stack>
        </Block>

        {/* Colors */}
        <Block spacing="lg">
          <Title as="h3" size="5">Colors</Title>
          <Stack direction="row" gap="sm" wrap="wrap" align="center">
            <ButtonCopy text="neutral" tooltip="Copied!" />
            <ButtonCopy text="primary" color="primary" tooltip="Copied!" />
            <ButtonCopy text="secondary" color="secondary" tooltip="Copied!" />
            <ButtonCopy text="accent" color="accent" tooltip="Copied!" />
            <ButtonCopy text="info" color="info" tooltip="Copied!" />
            <ButtonCopy text="success" color="success" tooltip="Copied!" />
            <ButtonCopy text="warning" color="warning" tooltip="Copied!" />
            <ButtonCopy text="error" color="error" tooltip="Copied!" />
          </Stack>
        </Block>

        {/* Variants */}
        <Block spacing="lg">
          <Title as="h3" size="5">Variants</Title>
          <Stack direction="row" gap="sm" wrap="wrap" align="center">
            <ButtonCopy text="default" tooltip="Copied!" />
            <ButtonCopy text="soft" variant="soft" color="primary" tooltip="Copied!" />
            <ButtonCopy text="outline" variant="outline" color="primary" tooltip="Copied!" />
            <ButtonCopy text="ghost" variant="ghost" color="primary" tooltip="Copied!" />
            <ButtonCopy text="dash" variant="dash" color="primary" tooltip="Copied!" />
          </Stack>
        </Block>

        {/* Circle shape */}
        <Block spacing="lg">
          <Title as="h3" size="5">Circle</Title>
          <Stack direction="row" gap="sm" wrap="wrap" align="center">
            <ButtonCopy text="circle xs" circle size="xs" tooltip="Copied!" />
            <ButtonCopy text="circle sm" circle size="sm" tooltip="Copied!" />
            <ButtonCopy text="circle md" circle size="md" tooltip="Copied!" />
            <ButtonCopy text="circle lg" circle size="lg" tooltip="Copied!" />
            <ButtonCopy text="circle xl" circle size="xl" tooltip="Copied!" />
          </Stack>
        </Block>

        {/* Circle + colors */}
        <Block spacing="lg">
          <Title as="h3" size="5">Circle + Colors</Title>
          <Stack direction="row" gap="sm" wrap="wrap" align="center">
            <ButtonCopy text="circle" circle tooltip="Copied!" />
            <ButtonCopy text="circle primary" circle color="primary" tooltip="Copied!" />
            <ButtonCopy text="circle secondary" circle color="secondary" tooltip="Copied!" />
            <ButtonCopy text="circle accent" circle color="accent" tooltip="Copied!" />
            <ButtonCopy text="circle soft" circle variant="soft" color="primary" tooltip="Copied!" />
            <ButtonCopy text="circle ghost" circle variant="ghost" color="primary" tooltip="Copied!" />
            <ButtonCopy text="circle outline" circle variant="outline" color="primary" tooltip="Copied!" />
          </Stack>
        </Block>

        {/* Icon animations */}
        <Block spacing="lg">
          <Title as="h3" size="5">Icon animation</Title>
          <Text color="neutral" className={css({ marginBottom: '1rem', fontSize: 'sm' })}>
            The Copy → Check transition can be customised with the <code>animation</code> prop. Click each button to see the effect.
          </Text>
          <Stack direction="row" gap="sm" wrap="wrap" align="center">
            <Stack gap="xs" align="center">
              <ButtonCopy text="scale (default)" animation="scale" tooltip="Copied!" color="primary" />
              <Text size="xs" color="neutral">scale</Text>
            </Stack>
            <Stack gap="xs" align="center">
              <ButtonCopy text="fade" animation="fade" tooltip="Copied!" color="secondary" />
              <Text size="xs" color="neutral">fade</Text>
            </Stack>
            <Stack gap="xs" align="center">
              <ButtonCopy text="rotate" animation="rotate" tooltip="Copied!" color="accent" />
              <Text size="xs" color="neutral">rotate</Text>
            </Stack>
            <Stack gap="xs" align="center">
              <ButtonCopy text="bounce" animation="bounce" tooltip="Copied!" color="success" />
              <Text size="xs" color="neutral">bounce</Text>
            </Stack>
            <Stack gap="xs" align="center">
              <ButtonCopy text="none" animation="none" tooltip="Copied!" />
              <Text size="xs" color="neutral">none</Text>
            </Stack>
          </Stack>
        </Block>

        {/* Circle + animations */}
        <Block spacing="lg">
          <Title as="h3" size="5">Circle + Icon animation</Title>
          <Stack direction="row" gap="sm" wrap="wrap" align="center">
            <Stack gap="xs" align="center">
              <ButtonCopy text="scale" animation="scale" circle tooltip="Copied!" color="primary" />
              <Text size="xs" color="neutral">scale</Text>
            </Stack>
            <Stack gap="xs" align="center">
              <ButtonCopy text="fade" animation="fade" circle tooltip="Copied!" color="secondary" />
              <Text size="xs" color="neutral">fade</Text>
            </Stack>
            <Stack gap="xs" align="center">
              <ButtonCopy text="rotate" animation="rotate" circle tooltip="Copied!" color="accent" />
              <Text size="xs" color="neutral">rotate</Text>
            </Stack>
            <Stack gap="xs" align="center">
              <ButtonCopy text="bounce" animation="bounce" circle tooltip="Copied!" color="success" />
              <Text size="xs" color="neutral">bounce</Text>
            </Stack>
          </Stack>
        </Block>

        {/* Inline with text — the primary use case */}
        <Block spacing="lg">
          <Title as="h3" size="5">Inline with Text</Title>
          <Stack direction="row" gap="sm" wrap="wrap" align="center">
            <Text id="demo-text-1">npm install panda-ui-mithril</Text>
            <ButtonCopy for="demo-text-1" variant="ghost" size="sm" tooltip="Copied!" />
          </Stack>
        </Block>

        {/* No tooltip */}
        <Block spacing="lg">
          <Title as="h3" size="5">Without tooltip (no Tooltip rendered)</Title>
          <Stack direction="row" gap="sm" wrap="wrap" align="center">
            <ButtonCopy text="no tooltip at all" />
            <ButtonCopy text="ghost no tooltip" variant="ghost" color="primary" />
            <ButtonCopy text="circle no tooltip" circle color="secondary" />
          </Stack>
        </Block>

        {/* Disabled */}
        <Block spacing="lg">
          <Title as="h3" size="5">Disabled</Title>
          <Stack direction="row" gap="sm" wrap="wrap" align="center">
            <ButtonCopy text="disabled" disabled tooltip="Copied!" />
            <ButtonCopy text="disabled primary" disabled color="primary" tooltip="Copied!" />
            <ButtonCopy text="disabled circle" disabled circle tooltip="Copied!" />
          </Stack>
        </Block>

        {/* Usage */}
        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <Tabs defaultActive="jsx" lifted size="lg">
            <Tab ref="jsx">Jsx</Tab>
            <Tab ref="js">Js</Tab>
            <TabContent ref="jsx">
              <CodeExample copyId="buttoncopy-jsx-copy" type="jsx" code={usageCodeJsx} />
            </TabContent>
            <TabContent ref="js">
              <CodeExample copyId="buttcopy-js-copy" type="javascript" code={usageCodeJavascript} />
            </TabContent>
          </Tabs>
        </Block>

        {/* Class reference */}
        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={tableToRows(table)} />
        </Block>
      </Stack>
    )
  }
}
