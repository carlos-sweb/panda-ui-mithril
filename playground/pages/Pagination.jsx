import m from 'mithril'
import { css } from '../../styled-system/css'
import { Pagination, PaginationButton } from '../../src/index.js'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Pagination',
  category: 'Navigation',
  description: 'Pagination component for navigating between pages of content.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Pagination</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Pagination component for navigating between pages of content.
        </p>

        <Pagination>
          <PaginationButton>1</PaginationButton>
          <PaginationButton active>2</PaginationButton>
          <PaginationButton>3</PaginationButton>
        </Pagination>
      </div>
    )
  }
}
