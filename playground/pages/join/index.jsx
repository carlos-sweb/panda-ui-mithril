import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Block, Join, JoinItem, PaginationButton } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'


const usageCode = `<Join>
  <PaginationButton>Button 1</PaginationButton>
  <PaginationButton>Button 2</PaginationButton>
  <PaginationButton>Button 3</PaginationButton>
</Join>`

const classRows = [
  { className: 'join', prop: '<Join>', type: 'Component', description: 'For grouping multiple items' },
  { className: 'join-item', prop: '<JoinItem>', type: 'Part', description: 'Item inside join. Can be a button, input, etc.' },
  { className: 'join-horizontal', prop: '(default)', type: 'Placement', description: 'Shows items horizontally', isDefault: true },
  { className: 'join-vertical', prop: 'vertical', type: 'Placement', description: 'Shows items vertically' },
]

export default {
  name: 'Join',
  category: 'Layout',
  description: 'Join component for grouping elements together.',

  oninit() { loadPageI18n('join') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Join</Title>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <Block spacing="lg" as="section">
          <Title as="h3" size="5">Generic items</Title>
          <Join>
            <JoinItem>Button 1</JoinItem>
            <JoinItem>Button 2</JoinItem>
            <JoinItem>Button 3</JoinItem>
          </Join>
        </Block>

        <Block spacing="lg" as="section">
          <Title as="h3" size="5">Combined with Button (via PaginationButton)</Title>
          <Join>
            <PaginationButton>Button 1</PaginationButton>
            <PaginationButton active>Button 2</PaginationButton>
            <PaginationButton>Button 3</PaginationButton>
          </Join>
        </Block>

        <Block spacing="lg" as="section">
          <Title as="h3" size="5">Vertical</Title>
          <Join vertical>
            <JoinItem>Item 1</JoinItem>
            <JoinItem>Item 2</JoinItem>
            <JoinItem>Item 3</JoinItem>
          </Join>
        </Block>

        <section>
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <CodeExample code={usageCode} />
        </section>

        <section>
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={classRows} />
        </section>
      </Stack>
    )
  }
}
