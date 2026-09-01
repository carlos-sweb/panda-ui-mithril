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
          <Title as="h3" size="5">{t('common.subtitles.default')}</Title>
          <Stack direction="row" gap="sm" wrap="wrap" align="center">
            <ButtonCopy text="Hello from ButtonCopy!" tooltip="Copied!" />
          </Stack>
        </Block>

        {/* Sizes */}
        <Block spacing="lg">
          <Title as="h3" size="5">{t('common.subtitles.sizes')}</Title>
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
          <Title as="h3" size="5">{t('common.subtitles.colors')}</Title>
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
          <Title as="h3" size="5">{t('common.subtitles.variants')}</Title>
          <Stack direction="row" gap="sm" wrap="wrap" align="center">
            <ButtonCopy text="default" tooltip="Copied!" />
            <ButtonCopy text="soft" variant="soft" color="primary" tooltip="Copied!" />
            <ButtonCopy text="outline" variant="outline" color="primary" tooltip="Copied!" />
            <ButtonCopy text="ghost" variant="ghost" color="primary" tooltip="Copied!" />
            <ButtonCopy text="dash" variant="dash" color="primary" tooltip="Copied!" />
          </Stack>
        </Block>

        {/* Square shape (opt-out of the circle default) */}
        <Block spacing="lg">
          <Title as="h3" size="5">{t('square')}</Title>
          <Text color="neutral" className={css({ marginBottom: '1rem', fontSize: 'sm' })}>
            {t('squareNote')}<code>shape="square"</code>{t('squareNoteSuffix')}
          </Text>
          <Stack direction="row" gap="sm" wrap="wrap" align="center">
            <ButtonCopy text="square xs" shape="square" size="xs" tooltip="Copied!" />
            <ButtonCopy text="square sm" shape="square" size="sm" tooltip="Copied!" />
            <ButtonCopy text="square md" shape="square" size="md" tooltip="Copied!" />
            <ButtonCopy text="square lg" shape="square" size="lg" tooltip="Copied!" />
            <ButtonCopy text="square xl" shape="square" size="xl" tooltip="Copied!" />
          </Stack>
        </Block>

        {/* Square + colors */}
        <Block spacing="lg">
          <Title as="h3" size="5">{t('squareColors')}</Title>
          <Stack direction="row" gap="sm" wrap="wrap" align="center">
            <ButtonCopy text="square" shape="square" tooltip="Copied!" />
            <ButtonCopy text="square primary" shape="square" color="primary" tooltip="Copied!" />
            <ButtonCopy text="square secondary" shape="square" color="secondary" tooltip="Copied!" />
            <ButtonCopy text="square accent" shape="square" color="accent" tooltip="Copied!" />
            <ButtonCopy text="square soft" shape="square" variant="soft" color="primary" tooltip="Copied!" />
            <ButtonCopy text="square ghost" shape="square" variant="ghost" color="primary" tooltip="Copied!" />
            <ButtonCopy text="square outline" shape="square" variant="outline" color="primary" tooltip="Copied!" />
          </Stack>
        </Block>

        {/* Icon animations */}
        <Block spacing="lg">
          <Title as="h3" size="5">{t('iconAnimation')}</Title>
          <Text color="neutral" className={css({ marginBottom: '1rem', fontSize: 'sm' })}>
            {t('iconAnimationNote1')}<code>animation</code>{t('iconAnimationNote2')}
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
          <Title as="h3" size="5">{t('circleIconAnimation')}</Title>
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
          <Title as="h3" size="5">{t('inlineWithText')}</Title>
          <Stack direction="row" gap="sm" wrap="wrap" align="center">
            <Text id="demo-text-1">npm install panda-ui-mithril</Text>
            <ButtonCopy for="demo-text-1" variant="ghost" size="sm" tooltip="Copied!" />
          </Stack>
        </Block>

        {/* No tooltip */}
        <Block spacing="lg">
          <Title as="h3" size="5">{t('withoutTooltip')}</Title>
          <Stack direction="row" gap="sm" wrap="wrap" align="center">
            <ButtonCopy text="no tooltip at all" />
            <ButtonCopy text="ghost no tooltip" variant="ghost" color="primary" />
            <ButtonCopy text="circle no tooltip" circle color="secondary" />
          </Stack>
        </Block>

        {/* Disabled */}
        <Block spacing="lg">
          <Title as="h3" size="5">{t('common.subtitles.disabled')}</Title>
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
