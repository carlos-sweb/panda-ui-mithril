import m from 'mithril'
import { css } from '../../../styled-system/css'
import { Navbar, NavbarStart, NavbarCenter, NavbarEnd, Button } from '../../../src/index.js'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Navbar',
  category: 'Navigation',
  description: 'Navbar component for site navigation headers.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Navbar</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Navbar component for site navigation headers.
        </p>

        <Navbar className="bg-base-200 rounded-box">
          <NavbarStart><Button variant="ghost" size="sm">panda-ui</Button></NavbarStart>
          <NavbarCenter><Button variant="ghost" size="sm">Home</Button></NavbarCenter>
          <NavbarEnd><Button color="primary" size="sm">Get Started</Button></NavbarEnd>
        </Navbar>
      </div>
    )
  }
}
