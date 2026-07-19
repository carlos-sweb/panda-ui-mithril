import m from 'mithril'
import { css } from '../../../styled-system/css'
import { ThemeController } from '../../../src/index.js'

const row = css({ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' })

export default {
  name: 'ThemeController',
  category: 'Actions',
  description: 'Theme controller toggle for switching between light and dark themes.',

  view() {
    return (
      <div>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>ThemeController</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Theme controller toggle for switching between light and dark themes.
        </p>

        <div className={row}>
          <ThemeController value="dark" className="toggle" />
        </div>
      </div>
    )
  }
}
