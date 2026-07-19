import m from 'mithril'
import { css } from '../../styled-system/css'
import { Filter, FilterReset } from '../../src/index.js'

export default {
  name: 'Filter',
  category: 'Actions',
  description: 'Filter component for filtering data with radio buttons styled as buttons.',

  view() {
    return (
      <div>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Filter</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Filter component for filtering data with radio buttons styled as buttons.
        </p>

        <Filter>
          <FilterReset value="x" />
          <input type="radio" className="btn" name="filter" aria-label="All" />
          <input type="radio" className="btn" name="filter" aria-label="Active" />
          <input type="radio" className="btn" name="filter" aria-label="Inactive" />
        </Filter>
      </div>
    )
  }
}
