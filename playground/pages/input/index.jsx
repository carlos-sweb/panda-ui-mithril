import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, TextInput, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const usageCodeJsx = `import m from 'mithril'
import { TextInput } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <TextInput placeholder="Enter text..." />
        <TextInput color="primary" placeholder="Primary input" />
        <TextInput size="lg" placeholder="Large" />
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { TextInput } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m('div', null, [
      m(TextInput, { placeholder: 'Enter text...' }),
      m(TextInput, { color: 'primary', placeholder: 'Primary input' }),
      m(TextInput, { size: 'lg', placeholder: 'Large' })
    ])
  }
}`

const classRows = [
  { className: 'input', prop: '<TextInput>', type: 'Component', description: 'For <input type="text"> tag or a wrapper of <input type="text"> tag' },
  { className: 'input-ghost', prop: 'ghost', type: 'Style', description: 'ghost style' },
  { className: 'input-neutral', prop: 'color="neutral"', type: 'Color', description: 'neutral color' },
  { className: 'input-primary', prop: 'color="primary"', type: 'Color', description: 'primary color' },
  { className: 'input-secondary', prop: 'color="secondary"', type: 'Color', description: 'secondary color' },
  { className: 'input-accent', prop: 'color="accent"', type: 'Color', description: 'accent color' },
  { className: 'input-info', prop: 'color="info"', type: 'Color', description: 'info color' },
  { className: 'input-success', prop: 'color="success"', type: 'Color', description: 'success color' },
  { className: 'input-warning', prop: 'color="warning"', type: 'Color', description: 'warning color' },
  { className: 'input-error', prop: 'color="error"', type: 'Color', description: 'error color' },
  { className: 'input-xs', prop: 'size="xs"', type: 'Size', description: 'Extra small size' },
  { className: 'input-sm', prop: 'size="sm"', type: 'Size', description: 'Small size' },
  { className: 'input-md', prop: 'size="md" (default)', type: 'Size', description: 'Medium size', isDefault: true },
  { className: 'input-lg', prop: 'size="lg"', type: 'Size', description: 'Large size' },
  { className: 'input-xl', prop: 'size="xl"', type: 'Size', description: 'Extra large size' },
]

export default {
  name: 'TextInput',
  category: 'Data Input',
  description: 'Text input component for single-line text entry.',

  oninit() { loadPageI18n('input') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">TextInput</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <TextInput placeholder="Enter text..." />
        <TextInput color="primary" placeholder="Primary input" />
        <TextInput color="error" placeholder="Error input" />

        <Block spacing="lg">
          <Title as="h3" size="5">Sizes</Title>
          <TextInput size="xs" placeholder="XS" />
          <TextInput size="sm" placeholder="SM" />
          <TextInput size="md" placeholder="MD" />
          <TextInput size="lg" placeholder="LG" />
          <TextInput size="xl" placeholder="XL" />
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <Tabs defaultActive="jsx" lifted size="lg">
            <Tab ref="jsx">Jsx</Tab>
            <Tab ref="js">Js</Tab>
            <TabContent ref="jsx">
              <CodeExample type="jsx" code={usageCodeJsx} />
            </TabContent>
            <TabContent ref="js">
              <CodeExample type="javascript" code={usageCodeJavascript} />
            </TabContent>
          </Tabs>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={classRows} />
        </Block>
      </Stack>
    )
  }
}
