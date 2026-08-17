import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Block, Text } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const usageCode = `<Block spacing="md">
  <p>First block</p>
  <p>Second block — spaced from first, no margin after</p>
</Block>`

const classRows = [
  { className: 'block', prop: '<Block>', type: 'Component', description: 'Vertical spacer between siblings' },
  { className: 'block-sm', prop: 'spacing="sm"', type: 'Size', description: '1rem spacing' },
  { className: 'block-md', prop: 'spacing="md" (default)', type: 'Size', description: '1.5rem spacing', isDefault: true },
  { className: 'block-lg', prop: 'spacing="lg"', type: 'Size', description: '2rem spacing' },
]

export default {
  oninit() { loadPageI18n('block') },
  view() {
    return (<Stack gap="lg">
      <Title as="h1" size="2">Block</Title>
      <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>{t('paragraph')}</Text>
      <Block spacing="lg">
        <Title as="h2" size="3">{t('common.usage')}</Title>
        <CodeExample code={usageCode} language="jsx" />
      </Block>
      <Block spacing="lg">
        <Title as="h2" size="3">Spacing</Title>
        <div className={css({ border: '1px solid token(colors.base-300)', borderRadius: 'token(radii.md)', padding: '1rem' })}>
          <Block spacing="sm"><div className={css({ bg: 'token(colors.base-300)', p: '1rem', borderRadius: '0.25rem' })}>sm — 1rem</div></Block>
          <Block spacing="md"><div className={css({ bg: 'token(colors.base-300)', p: '1rem', borderRadius: '0.25rem' })}>md — 1.5rem</div></Block>
          <Block spacing="lg"><div className={css({ bg: 'token(colors.base-300)', p: '1rem', borderRadius: '0.25rem' })}>lg — 2rem</div></Block>
        </div>
      </Block>
      <Block spacing="lg">
        <Title as="h2" size="3">{t('common.classReference')}</Title>
        <ClassTable rows={classRows} />
      </Block>
    </Stack>)
  }
}
