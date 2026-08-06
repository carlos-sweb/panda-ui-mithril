import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t } from '../../i18n/index.js'
import { Megamenu, MegamenuItem, MegamenuTrigger, MegamenuPanel } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '2rem' })
const surface = css({ background: 'token(colors.base-100)', border: '1px solid', borderColor: 'token(colors.base-300)', padding: '0.5rem', borderRadius: 'var(--radius-box)' })
const grid = css({ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' })
const colTitle = css({ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', opacity: 0.5, marginBottom: '0.5rem' })
const link = css({ display: 'block', padding: '0.375rem 0', fontSize: '0.875rem', textDecoration: 'none', color: 'inherit', opacity: 0.8, _hover: { opacity: 1 } })

const usageCode = `<Megamenu>
  <MegamenuItem>
    <MegamenuTrigger>Products</MegamenuTrigger>
    <MegamenuPanel>
      <div>Analytics</div>
      <div>Automation</div>
    </MegamenuPanel>
  </MegamenuItem>
  <MegamenuItem>
    <MegamenuTrigger href="#!/docs" chevron={false}>Docs</MegamenuTrigger>
  </MegamenuItem>
</Megamenu>`

const classRows = [
  { className: 'megamenu', prop: '<Megamenu>', type: 'Component', description: 'Nav container' },
  { className: '(item wrapper)', prop: '<MegamenuItem>', type: 'Part', description: 'Positions a trigger + its dropdown panel together' },
  { className: '[popovertarget]', prop: '<MegamenuTrigger href? chevron?>', type: 'Part', description: 'The clickable/hoverable trigger — renders a link if `href` is given' },
  { className: '[popover]', prop: '<MegamenuPanel>', type: 'Part', description: 'The dropdown panel, shown on hover/focus of its MegamenuItem' },
  { className: 'megamenu-active', prop: '<MegamenuActive />', type: 'Modifier', description: 'Manual highlight overlay — the reference implementation animates this between triggers via CSS anchor positioning, not supported here' },
  { className: 'megamenu-xs', prop: 'size="xs"', type: 'Size', description: 'Extra small size' },
  { className: 'megamenu-sm', prop: 'size="sm"', type: 'Size', description: 'Small size' },
  { className: 'megamenu-md', prop: 'size="md" (default)', type: 'Size', description: 'Medium size', isDefault: true },
  { className: 'megamenu-lg', prop: 'size="lg"', type: 'Size', description: 'Large size' },
  { className: 'megamenu-xl', prop: 'size="xl"', type: 'Size', description: 'Extra large size' },
]

export default {
  name: 'Megamenu',
  category: 'Navigation',
  description: 'Mega menu component for large dropdown navigation menus.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Megamenu</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraphs.megamenu')}
        </p>

        <Megamenu className={surface}>
          <MegamenuItem>
            <MegamenuTrigger>Products</MegamenuTrigger>
            <MegamenuPanel>
              <div className={grid}>
                <div>
                  <div className={colTitle}>Platform</div>
                  <a className={link} href="#!/">Analytics</a>
                  <a className={link} href="#!/">Automation</a>
                  <a className={link} href="#!/">Reporting</a>
                </div>
                <div>
                  <div className={colTitle}>Tools</div>
                  <a className={link} href="#!/">Integrations</a>
                  <a className={link} href="#!/">API</a>
                </div>
              </div>
            </MegamenuPanel>
          </MegamenuItem>

          <MegamenuItem>
            <MegamenuTrigger>Solutions</MegamenuTrigger>
            <MegamenuPanel>
              <div className={colTitle}>By team</div>
              <a className={link} href="#!/">Engineering</a>
              <a className={link} href="#!/">Design</a>
              <a className={link} href="#!/">Marketing</a>
            </MegamenuPanel>
          </MegamenuItem>

          <MegamenuItem>
            <MegamenuTrigger href="#!/" chevron={false}>Pricing</MegamenuTrigger>
          </MegamenuItem>
        </Megamenu>

        <section>
          <h2 className={sectionTitle}>{t('common.usage')}</h2>
          <CodeExample code={usageCode} />
        </section>

        <section>
          <h2 className={sectionTitle}>{t('common.classReference')}</h2>
          <ClassTable rows={classRows} />
        </section>
      </div>
    )
  }
}
