import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Radio, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const usageCodeJsx = `import m from 'mithril'
import { Radio } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Radio name="option" color="primary" checked />
        <Radio name="option" size="lg" />
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Radio } from 'panda-ui-mithril'

export const RadioPage = {
  view() {
    return m('div', null, [
      m(Radio, { name: 'option', color: 'primary', checked: true }),
      m(Radio, { name: 'option', size: 'lg' })
    ])
  }
}`

const classRows = [
  { className: 'radio', prop: '<Radio>', type: 'Component', description: 'For radio input' },
  { className: 'radio-neutral', prop: 'color="neutral"', type: 'Color', description: 'neutral color' },
  { className: 'radio-primary', prop: 'color="primary"', type: 'Color', description: 'primary color' },
  { className: 'radio-secondary', prop: 'color="secondary"', type: 'Color', description: 'secondary color' },
  { className: 'radio-accent', prop: 'color="accent"', type: 'Color', description: 'accent color' },
  { className: 'radio-success', prop: 'color="success"', type: 'Color', description: 'success color' },
  { className: 'radio-warning', prop: 'color="warning"', type: 'Color', description: 'warning color' },
  { className: 'radio-info', prop: 'color="info"', type: 'Color', description: 'info color' },
  { className: 'radio-error', prop: 'color="error"', type: 'Color', description: 'error color' },
  { className: 'radio-xs', prop: 'size="xs"', type: 'Size', description: 'Extra small size' },
  { className: 'radio-sm', prop: 'size="sm"', type: 'Size', description: 'Small size' },
  { className: 'radio-md', prop: 'size="md" (default)', type: 'Size', description: 'Medium size', isDefault: true },
  { className: 'radio-lg', prop: 'size="lg"', type: 'Size', description: 'Large size' },
  { className: 'radio-xl', prop: 'size="xl"', type: 'Size', description: 'Extra large size' },
]

export default {
  name: 'Radio',
  category: 'Data Input',
  description: 'Radio button component for selecting one option from a set.',

  oninit() { loadPageI18n('radio') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Radio</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Block spacing="lg">
          <Title as="h3" size="5">Colors</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <Radio name="r1" checked />
            <Radio name="r1" color="primary" checked />
            <Radio name="r1" color="secondary" checked />
            <Radio name="r1" color="accent" checked />
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Sizes</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <Radio name="r2" size="xs" checked />
            <Radio name="r2" size="sm" checked />
            <Radio name="r2" size="md" checked />
            <Radio name="r2" size="lg" checked />
            <Radio name="r2" size="xl" checked />
          </Stack>
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
