import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Pagination, PaginationButton } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'


const usageCode = `<Pagination>
  <PaginationButton>1</PaginationButton>
  <PaginationButton active>2</PaginationButton>
  <PaginationButton>3</PaginationButton>
  <PaginationButton disabled>4</PaginationButton>
</Pagination>`

const classRows = [
  { className: 'join', prop: '<Pagination>', type: 'Component', description: 'Container — built on top of Join + Button, matching the common pagination pattern' },
  { className: 'btn join-item', prop: '<PaginationButton>', type: 'Component', description: 'A page button' },
  { className: 'btn-active', prop: '<PaginationButton active>', type: 'Modifier', description: 'Marks the current page' },
]

export default {
  name: 'Pagination',
  category: 'Navigation',
  description: 'Pagination component for navigating between pages of content.',

  oninit() { loadPageI18n('pagination') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Pagination</Title>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <Pagination>
          <PaginationButton>«</PaginationButton>
          <PaginationButton>1</PaginationButton>
          <PaginationButton active>2</PaginationButton>
          <PaginationButton>3</PaginationButton>
          <PaginationButton disabled>4</PaginationButton>
          <PaginationButton>»</PaginationButton>
        </Pagination>

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
