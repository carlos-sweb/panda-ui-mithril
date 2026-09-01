import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Tag, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'
import { Sparkles, Hash } from 'lucide-mithril'

const usageCodeJsx = `import m from 'mithril'
import { Tag } from 'panda-ui-mithril'
import { Sparkles } from 'lucide-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Tag>Default</Tag>
        <Tag variant="info">Info</Tag>
        <Tag variant="success">Success</Tag>
        <Tag icon={Sparkles}>With icon</Tag>
        <Tag onRemove={(e) => console.log(e)}>Removable</Tag>
        <Tag clickable>Clickable</Tag>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Tag } from 'panda-ui-mithril'
import { Sparkles } from 'lucide-mithril'

export const TagPage = {
  view() {
    return m('div', null, [
      m(Tag, null, 'Default'),
      m(Tag, { variant: 'info' }, 'Info'),
      m(Tag, { variant: 'success' }, 'Success'),
      m(Tag, { icon: Sparkles }, 'With icon'),
      m(Tag, { onRemove: (e) => console.log(e) }, 'Removable'),
      m(Tag, { clickable: true }, 'Clickable')
    ])
  }
}`

export default {
  name: 'Tag',
  category: 'Data Display',
  description: 'Tag — small interactive UI element to label, categorize, or filter content.',

  oninit() { loadPageI18n('tag') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Tag</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('common.subtitles.variants')}</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <Tag>Default</Tag>
            <Tag variant="info">Info</Tag>
            <Tag variant="success">Success</Tag>
            <Tag variant="warning">Warning</Tag>
            <Tag variant="error">Error</Tag>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('styles')}</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <Tag variant="outline">Outline</Tag>
            <Tag variant="dash">Dash</Tag>
            <Tag variant="soft">Soft</Tag>
            <Tag variant="ghost">Ghost</Tag>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('common.subtitles.sizes')}</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <Tag size="md">Medium (md)</Tag>
            <Tag size="lg">Large (lg)</Tag>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('withIcon')}</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <Tag icon={Sparkles}>AI Generated</Tag>
            <Tag variant="info" icon={Hash}>Channel</Tag>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('oneCharacter')}</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <Tag>A</Tag>
            <Tag variant="success">S</Tag>
            <Tag variant="error">E</Tag>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('clickable')}</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <Tag clickable>Click me</Tag>
            <Tag clickable variant="info">Info</Tag>
            <Tag clickable variant="success">Success</Tag>
            <Tag clickable disabled>Disabled</Tag>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('onRemove')}</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <Tag onRemove={(e) => console.log('removed', e)}>Removable</Tag>
            <Tag variant="info" onRemove={(e) => console.log('removed', e)}>Info</Tag>
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
          <ClassTable rows={tableToRows(table)} />
        </Block>
      </Stack>
    )
  }
}
