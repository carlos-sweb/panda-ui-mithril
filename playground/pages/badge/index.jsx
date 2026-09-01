import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Badge, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const usageCodeJsx = `import m from 'mithril'
import { Badge } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Badge color="primary">Primary</Badge>
        <Badge variant="outline" color="success">Outline</Badge>
        <Badge size="lg" color="error">Error</Badge>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Badge } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m('div', null, [
      m(Badge, { color: 'primary' }, 'Primary'),
      m(Badge, { variant: 'outline', color: 'success' }, 'Outline'),
      m(Badge, { size: 'lg', color: 'error' }, 'Error')
    ])
  }
}`

export default {
  name: 'Badge',
  category: 'Data Display',
  description: 'Badges are used to highlight an item\'s status for quick recognition.',

  oninit() { loadPageI18n('badge') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Badge</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('common.subtitles.colors')}</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <Badge color="neutral">Neutral</Badge>
            <Badge color="primary">Primary</Badge>
            <Badge color="secondary">Secondary</Badge>
            <Badge color="accent">Accent</Badge>
            <Badge color="info">Info</Badge>
            <Badge color="success">Success</Badge>
            <Badge color="warning">Warning</Badge>
            <Badge color="error">Error</Badge>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('common.subtitles.variants')}</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <Badge variant="outline">Outline</Badge>
            <Badge variant="dash">Dash</Badge>
            <Badge variant="ghost">Ghost</Badge>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('common.subtitles.sizes')}</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <Badge size="xs">XS</Badge>
            <Badge size="sm">SM</Badge>
            <Badge size="md">MD</Badge>
            <Badge size="lg">LG</Badge>
            <Badge size="xl">XL</Badge>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <Tabs defaultActive="jsx" lifted size="lg">
            <Tab ref="jsx">Jsx</Tab>
            <Tab ref="js">Js</Tab>
            <TabContent ref="jsx">
              <CodeExample copyId="badge-jsx-copy" type="jsx" code={usageCodeJsx} />
            </TabContent>
            <TabContent ref="js">
              <CodeExample copyId="badge-js-copy" type="javascript" code={usageCodeJavascript} />
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
