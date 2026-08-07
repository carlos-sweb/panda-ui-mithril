import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Footer, FooterTitle, Link } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const section = css({ marginBottom: '2rem' })
const surface = css({ background: 'token(colors.base-200)', padding: '2.5rem', borderRadius: 'var(--radius-box)' })

const usageCode = `<Footer className="...">
  <div>
    <FooterTitle>Services</FooterTitle>
    <Link hover={false}>Branding</Link>
    <Link hover={false}>Design</Link>
  </div>
  <div>
    <FooterTitle>Company</FooterTitle>
    <Link hover={false}>About us</Link>
    <Link hover={false}>Contact</Link>
  </div>
</Footer>`

const classRows = [
  { className: 'footer', prop: '<Footer>', type: 'Component', description: 'Footer container' },
  { className: 'footer-title', prop: '<FooterTitle>', type: 'Part', description: 'Section title inside the footer' },
  { className: 'footer-center', prop: 'center', type: 'Modifier', description: 'Centers all items' },
  { className: 'footer-horizontal', prop: 'horizontal', type: 'Placement', description: 'Shows items horizontally (default on larger screens)' },
  { className: 'footer-vertical', prop: 'vertical', type: 'Placement', description: 'Shows items vertically' },
]

export default {
  name: 'Footer',
  category: 'Navigation',
  description: 'Footer component for site footers with links and information.',

  oninit() { loadPageI18n('footer') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Footer</Title>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <section className={section}>
          <Title as="h3" size="5">Columns</Title>
          <Footer horizontal className={surface}>
            <div>
              <FooterTitle>Services</FooterTitle>
              <Link hover={false}>Branding</Link>
              <Link hover={false}>Design</Link>
              <Link hover={false}>Marketing</Link>
            </div>
            <div>
              <FooterTitle>Company</FooterTitle>
              <Link hover={false}>About us</Link>
              <Link hover={false}>Contact</Link>
              <Link hover={false}>Jobs</Link>
            </div>
            <div>
              <FooterTitle>Legal</FooterTitle>
              <Link hover={false}>Terms of use</Link>
              <Link hover={false}>Privacy policy</Link>
            </div>
          </Footer>
        </section>

        <section className={section}>
          <Title as="h3" size="5">Centered</Title>
          <Footer center className={surface}>
            <div>
              <FooterTitle>panda-ui-mithril</FooterTitle>
              <div className={css({ display: 'flex', gap: '1rem' })}>
                <Link href="#">GitHub</Link>
                <Link href="#">npm</Link>
                <Link href="#">Docs</Link>
              </div>
            </div>
          </Footer>
        </section>

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
