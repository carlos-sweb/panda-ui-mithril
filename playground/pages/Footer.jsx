import m from 'mithril'
import { css } from '../../styled-system/css'
import { Footer, FooterTitle, Link } from '../../src/index.js'
import { CodeExample } from '../components/CodeExample.jsx'
import { ClassTable } from '../components/ClassTable.jsx'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '2rem' })
const heading = css({ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 })
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

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Footer</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Footer component for site footers with links and information.
        </p>

        <section className={section}>
          <h3 className={heading}>Columns</h3>
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
          <h3 className={heading}>Centered</h3>
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
