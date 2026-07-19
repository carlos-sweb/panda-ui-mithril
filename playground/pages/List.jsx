import m from 'mithril'
import { css } from '../../styled-system/css'
import { List, ListRow } from '../../src/index.js'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'List',
  category: 'Data Display',
  description: 'List is a group of list items with optional actions.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>List</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          List is a group of list items with optional actions.
        </p>

        <List>
          <ListRow><div>Title 1</div><div>Description 1</div></ListRow>
          <ListRow><div>Title 2</div><div>Description 2</div></ListRow>
          <ListRow><div>Title 3</div><div>Description 3</div></ListRow>
        </List>
      </div>
    )
  }
}
