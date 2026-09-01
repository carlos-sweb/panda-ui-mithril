import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Text, Title, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const heading = css({ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 })

const usageCodeJsx = `import m from 'mithril'
import { Text } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Text>Default paragraph text</Text>
        <Text size="lg" color="primary">Larger primary text</Text>
        <Text as="span" weight="semibold" transform="uppercase">Inline span</Text>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Text } from 'panda-ui-mithril'

export const TextPage = {
  view() {
    return m('div', null, [
      m(Text, null, 'Default paragraph text'),
      m(Text, { size: 'lg', color: 'primary' }, 'Larger primary text'),
      m(Text, { as: 'span', weight: 'semibold', transform: 'uppercase' }, 'Inline span')
    ])
  }
}`

export default {
  oninit() { loadPageI18n('text') },

  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Text</Title>
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
          <Title as="h2" size="3">{t('common.subtitles.sizes')}</Title>
          <Text size="sm" color="neutral" className={heading}>{t('sizeTiers')}</Text>
          <Stack gap="xs">
            <Text size="xs">Size xs</Text>
            <Text size="sm">Size sm</Text>
            <Text size="md">Size md (default)</Text>
            <Text size="lg">Size lg</Text>
            <Text size="xl">Size xl</Text>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('semanticTags')}</Title>
          <Text size="sm" color="neutral" className={heading}>as only switches the tag — size stays explicit (default md)</Text>
          <Stack gap="xs">
            <Text as="p">p paragraph (default)</Text>
            <Text as="span">span inline text</Text>
            <Text as="div">div block text</Text>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.subtitles.colors')}</Title>
          <Stack direction="row" gap="sm">
            <Text size="lg" color="neutral">Neutral</Text>
            <Text size="lg" color="primary">Primary</Text>
            <Text size="lg" color="secondary">Secondary</Text>
            <Text size="lg" color="accent">Accent</Text>
            <Text size="lg" color="info">Info</Text>
            <Text size="lg" color="success">Success</Text>
            <Text size="lg" color="warning">Warning</Text>
            <Text size="lg" color="error">Error</Text>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('alignment')}</Title>
          <Stack gap="xs" className={css({ maxWidth: '400px', padding: '1rem', border: '1px solid token(colors.base-300)', borderRadius: 'token(radii.md)' })}>
            <Text align="left">Left aligned</Text>
            <Text align="center">Center aligned</Text>
            <Text align="right">Right aligned</Text>
            <Text align="justify">Justify — this text fills the line width evenly</Text>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('transform')}</Title>
          <Stack direction="row" gap="sm">
            <Text size="lg" transform="capitalize">capitalize me</Text>
            <Text size="lg" transform="uppercase">uppercase me</Text>
            <Text size="lg" transform="lowercase">LOWERCASE ME</Text>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('weight')}</Title>
          <Stack gap="xs">
            <Text size="lg" weight="light">Light — 300</Text>
            <Text size="lg" weight="normal">Normal — 400</Text>
            <Text size="lg" weight="medium">Medium — 500</Text>
            <Text size="lg" weight="semibold">Semibold — 600</Text>
            <Text size="lg" weight="bold">Bold — 700</Text>
            <Text size="lg" weight="extrabold">Extrabold — 800</Text>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('truncateItalic')}</Title>
          <Stack gap="xs" className={css({ maxWidth: '300px' })}>
            <Text size="lg" truncate>This is a very long text that should truncate with an ellipsis when it overflows its container</Text>
            <Text size="lg" italic>Italic text style</Text>
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
