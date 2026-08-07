import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Navbar, NavbarStart, NavbarCenter, NavbarEnd, Button } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

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

  oninit() { loadPageI18n('navbar') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Navbar</Title>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <Navbar className={surface}>
          <NavbarStart><Button variant="ghost" size="sm">panda-ui</Button></NavbarStart>
          <NavbarCenter><Button variant="ghost" size="sm">Home</Button></NavbarCenter>
          <NavbarEnd><Button color="primary" size="sm">Get Started</Button></NavbarEnd>
        </Navbar>

        <section>
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <CodeExample code={usageCode} />
        </section>

        <section>
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={classRows} />
        </section>
      </div>
    )
  }
}
