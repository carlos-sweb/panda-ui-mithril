import m from 'mithril'
import { css } from '../../styled-system/css'
import { Navbar, NavbarStart, NavbarCenter, NavbarEnd, Button } from '../../src/index.js'
import { CodeExample } from '../components/CodeExample.jsx'
import { ClassTable } from '../components/ClassTable.jsx'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '2rem' })
const surface = css({ background: 'token(colors.base-200)', borderRadius: 'var(--radius-box)' })

const usageCode = `<Navbar>
  <NavbarStart><Button variant="ghost" size="sm">panda-ui</Button></NavbarStart>
  <NavbarCenter><Button variant="ghost" size="sm">Home</Button></NavbarCenter>
  <NavbarEnd><Button color="primary" size="sm">Get Started</Button></NavbarEnd>
</Navbar>`

const classRows = [
  { className: 'navbar', prop: '<Navbar>', type: 'Component', description: 'Navbar container' },
  { className: 'navbar-start', prop: '<NavbarStart>', type: 'Part', description: 'Left side of the navbar (50% width)' },
  { className: 'navbar-center', prop: '<NavbarCenter>', type: 'Part', description: 'Middle of the navbar (shrink-to-fit)' },
  { className: 'navbar-end', prop: '<NavbarEnd>', type: 'Part', description: 'Right side of the navbar (50% width)' },
]

export default {
  name: 'Navbar',
  category: 'Navigation',
  description: 'Navbar component for site navigation headers.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Navbar</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Navbar component for site navigation headers.
        </p>

        <Navbar className={surface}>
          <NavbarStart><Button variant="ghost" size="sm">panda-ui</Button></NavbarStart>
          <NavbarCenter><Button variant="ghost" size="sm">Home</Button></NavbarCenter>
          <NavbarEnd><Button color="primary" size="sm">Get Started</Button></NavbarEnd>
        </Navbar>

        <section>
          <h2 className={sectionTitle}>Usage</h2>
          <CodeExample code={usageCode} />
        </section>

        <section>
          <h2 className={sectionTitle}>Class Reference</h2>
          <ClassTable rows={classRows} />
        </section>
      </div>
    )
  }
}
