import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

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

const classRows = [
  { className: 'title', prop: '<Title>', type: 'Component', description: 'Typography helper — semantic heading with style props' },
  { className: 'title-size1', prop: 'size="1" (default)', type: 'Size', description: 'Largest size — 3rem / 7xl', isDefault: true },
  { className: 'title-size2', prop: 'size="2"', type: 'Size', description: '2.5rem / 6xl' },
  { className: 'title-size3', prop: 'size="3"', type: 'Size', description: '2rem / 5xl' },
  { className: 'title-size4', prop: 'size="4"', type: 'Size', description: '1.5rem / 4xl' },
  { className: 'title-size5', prop: 'size="5"', type: 'Size', description: '1.25rem / 3xl' },
  { className: 'title-size6', prop: 'size="6"', type: 'Size', description: '1rem / 2xl' },
  { className: 'title-size7', prop: 'size="7"', type: 'Size', description: '0.875rem / lg' },
  { className: 'title-neutral', prop: 'color="neutral"', type: 'Color', description: 'Neutral color' },
  { className: 'title-primary', prop: 'color="primary"', type: 'Color', description: 'Primary color' },
  { className: 'title-secondary', prop: 'color="secondary"', type: 'Color', description: 'Secondary color' },
  { className: 'title-accent', prop: 'color="accent"', type: 'Color', description: 'Accent color' },
  { className: 'title-info', prop: 'color="info"', type: 'Color', description: 'Info color' },
  { className: 'title-success', prop: 'color="success"', type: 'Color', description: 'Success color' },
  { className: 'title-warning', prop: 'color="warning"', type: 'Color', description: 'Warning color' },
  { className: 'title-error', prop: 'color="error"', type: 'Color', description: 'Error color' },
  { className: 'title-left', prop: 'align="left" (default)', type: 'Alignment', description: 'Left aligned', isDefault: true },
  { className: 'title-center', prop: 'align="center"', type: 'Alignment', description: 'Center aligned' },
  { className: 'title-right', prop: 'align="right"', type: 'Alignment', description: 'Right aligned' },
  { className: 'title-justify', prop: 'align="justify"', type: 'Alignment', description: 'Justified' },
  { className: 'title-capitalize', prop: 'transform="capitalize"', type: 'Transform', description: 'Capitalize each word' },
  { className: 'title-uppercase', prop: 'transform="uppercase"', type: 'Transform', description: 'All uppercase' },
  { className: 'title-lowercase', prop: 'transform="lowercase"', type: 'Transform', description: 'All lowercase' },
  { className: 'title-light', prop: 'weight="light"', type: 'Weight', description: 'Light — 300' },
  { className: 'title-normal', prop: 'weight="normal" (default)', type: 'Weight', description: 'Normal — 400', isDefault: true },
  { className: 'title-medium', prop: 'weight="medium"', type: 'Weight', description: 'Medium — 500' },
  { className: 'title-semibold', prop: 'weight="semibold"', type: 'Weight', description: 'Semibold — 600' },
  { className: 'title-bold', prop: 'weight="bold"', type: 'Weight', description: 'Bold — 700' },
  { className: 'title-extrabold', prop: 'weight="extrabold"', type: 'Weight', description: 'Extrabold — 800' },
  { className: 'title-truncate', prop: 'truncate', type: 'Modifier', description: 'Truncate with ellipsis' },
  { className: 'title-italic', prop: 'italic', type: 'Modifier', description: 'Italic style' },
  { className: 'title-as-h1', prop: 'as="h1" (default)', type: 'Part', description: 'Render as <h1>. Maps to size 1.', isDefault: true },
  { className: 'title-as-h2', prop: 'as="h2"', type: 'Part', description: 'Render as <h2>. Maps to size 2.' },
  { className: 'title-as-h3', prop: 'as="h3"', type: 'Part', description: 'Render as <h3>. Maps to size 3.' },
  { className: 'title-as-h4', prop: 'as="h4"', type: 'Part', description: 'Render as <h4>. Maps to size 4.' },
  { className: 'title-as-h5', prop: 'as="h5"', type: 'Part', description: 'Render as <h5>. Maps to size 5.' },
  { className: 'title-as-h6', prop: 'as="h6"', type: 'Part', description: 'Render as <h6>. Maps to size 6.' },
  { className: 'title-as-p', prop: 'as="p"', type: 'Part', description: 'Render as <p>. Maps to size 7.' },
  { className: 'title-as-span', prop: 'as="span"', type: 'Part', description: 'Render as <span>. Maps to size 7.' },
  { className: 'title-as-div', prop: 'as="div"', type: 'Part', description: 'Render as <div>. Maps to size 7.' },
]

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
          <ClassTable rows={classRows} />
        </Block>
      </Stack>
    )
  }
}
