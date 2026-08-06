import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t } from '../../i18n/index.js'
import { Swap } from '../../../src/index.js'
import { Sun, Moon } from 'lucide-mithril'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const row = css({ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '2rem' })
const heading = css({ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 })

const usageCode = `<Swap on="On" off="Off" style="rotate" />
<Swap on="☀️" off="🌙" style="flip" />
<Swap on={<Sun size={20} />} off={<Moon size={20} />} style="rotate" />`

const classRows = [
  { className: 'swap', prop: '<Swap on={...} off={...}>', type: 'Component', description: 'Swap container' },
  { className: 'swap-on', prop: 'on={...}', type: 'Part', description: 'The child element that should be visible when checkbox is checked or when swap is active' },
  { className: 'swap-off', prop: 'off={...}', type: 'Part', description: 'The child element that should be visible when checkbox is not checked or when swap is not active' },
  { className: 'swap-indeterminate', type: 'Part', description: 'The child element that should be visible when checkbox is indeterminate — not supported by this component' },
  { className: 'swap-active', prop: 'active', type: 'Modifier', description: 'Activates the swap (no need for checkbox)' },
  { className: 'swap-rotate', prop: 'style="rotate"', type: 'Style', description: 'Adds rotate effect to swap' },
  { className: 'swap-flip', prop: 'style="flip"', type: 'Style', description: 'Adds flip effect to swap' },
  { className: 'swap-xs', prop: 'size="xs"', type: 'Size', description: 'Extra small size' },
  { className: 'swap-sm', prop: 'size="sm"', type: 'Size', description: 'Small size' },
  { className: 'swap-md', prop: 'size="md" (default)', type: 'Size', description: 'Medium size', isDefault: true },
  { className: 'swap-lg', prop: 'size="lg"', type: 'Size', description: 'Large size' },
  { className: 'swap-xl', prop: 'size="xl"', type: 'Size', description: 'Extra large size' },
]

export default {
  name: 'Swap',
  category: 'Actions',
  description: 'Swap elements with a transition animation.',

  view() {
    return (
      <div>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Swap</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraphs.swap')}
        </p>

        <div className={row}>
          <Swap on="On" off="Off" style="rotate" />
          <Swap on="On" off="Off" style="flip" />
          <Swap on={<Sun size={20} />} off={<Moon size={20} />} style="rotate" />
          <Swap>
            <span>Manual (children)</span>
          </Swap>
        </div>
        <p className={css({ opacity: 0.6, marginTop: '0.5rem', fontSize: '0.875rem' })}>
          Click to toggle — the swap works with a hidden native checkbox (like the reference implementation), no
          JS state required. Pass an icon component to <code>on</code>/<code>off</code> the same
          way you'd pass text.
        </p>

        <h3 className={sectionTitle}>Sizes</h3>
        <h4 className={heading}>XS · SM · MD · LG · XL</h4>
        <div className={row}>
          <Swap size="xs" on="XS" off="XS" style="flip" />
          <Swap size="sm" on="SM" off="SM" style="flip" />
          <Swap size="md" on="MD" off="MD" style="flip" />
          <Swap size="lg" on="LG" off="LG" style="flip" />
          <Swap size="xl" on="XL" off="XL" style="flip" />
        </div>

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
