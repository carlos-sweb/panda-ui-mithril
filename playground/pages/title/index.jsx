import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const heading = css({ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 })

const usageCodeJsx = `import m from 'mithril'
import { Title } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Title as="h1" size="1" color="primary">Hero Title</Title>
        <Title as="h2" size="3" align="center">Section Heading</Title>
        <Title as="p" size="6" transform="capitalize">paragraph text styled as h6</Title>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Title } from 'panda-ui-mithril'

export const TitlePage = {
  view() {
    return m('div', null, [
      m(Title, { as: 'h1', size: '1', color: 'primary' }, 'Hero Title'),
      m(Title, { as: 'h2', size: '3', align: 'center' }, 'Section Heading'),
      m(Title, { as: 'p', size: '6', transform: 'capitalize' }, 'paragraph text styled as h6')
    ])
  }
}`

export default {
  oninit() { loadPageI18n('title') },

  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Title</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

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
          <Title as="h2" size="3">Sizes</Title>
          <Text size="sm" color="neutral" className={heading}>7 size tiers — from hero to caption</Text>
          <Stack gap="xs">
            <Title size="1">Size 1</Title>
            <Title size="2">Size 2</Title>
            <Title size="3">Size 3</Title>
            <Title size="4">Size 4</Title>
            <Title size="5">Size 5</Title>
            <Title size="6">Size 6</Title>
            <Title size="7">Size 7</Title>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">Semantic tags</Title>
          <Text size="sm" color="neutral" className={heading}>Auto-size from tag (h1→1, h2→2, …)</Text>
          <Stack gap="xs">
            <Title as="h1">h1 heading</Title>
            <Title as="h2">h2 heading</Title>
            <Title as="h3">h3 heading</Title>
            <Title as="h4">h4 heading</Title>
            <Title as="h5">h5 heading</Title>
            <Title as="h6">h6 heading</Title>
            <Title as="p">p paragraph</Title>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">Colors</Title>
          <Stack direction="row" gap="sm">
            <Title as="h3" color="primary">Primary</Title>
            <Title as="h3" color="secondary">Secondary</Title>
            <Title as="h3" color="accent">Accent</Title>
            <Title as="h3" color="info">Info</Title>
            <Title as="h3" color="success">Success</Title>
            <Title as="h3" color="warning">Warning</Title>
            <Title as="h3" color="error">Error</Title>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">Alignment</Title>
          <Stack gap="xs" className={css({ maxWidth: '400px', padding: '1rem', border: '1px solid token(colors.base-300)', borderRadius: 'token(radii.md)' })}>
            <Title as="h4" align="left">Left aligned</Title>
            <Title as="h4" align="center">Center aligned</Title>
            <Title as="h4" align="right">Right aligned</Title>
            <Title as="h4" align="justify">Justify — this text fills the line width evenly</Title>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">Transform</Title>
          <Stack direction="row" gap="sm">
            <Title as="h4" transform="capitalize">capitalize me</Title>
            <Title as="h4" transform="uppercase">uppercase me</Title>
            <Title as="h4" transform="lowercase">LOWERCASE ME</Title>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">Weight</Title>
          <Stack gap="xs">
            <Title size="4" weight="light">Light — 300</Title>
            <Title size="4" weight="normal">Normal — 400</Title>
            <Title size="4" weight="medium">Medium — 500</Title>
            <Title size="4" weight="semibold">Semibold — 600</Title>
            <Title size="4" weight="bold">Bold — 700</Title>
            <Title size="4" weight="extrabold">Extrabold — 800</Title>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">Truncate & Italic</Title>
          <Stack gap="xs" className={css({ maxWidth: '300px' })}>
            <Title size="5" truncate>This is a very long title that should truncate with an ellipsis when it overflows its container</Title>
            <Title size="5" italic>Italic text style</Title>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={tableToRows(table)} />
        </Block>
      </Stack>
    )
  }
}
