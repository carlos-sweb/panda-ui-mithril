import m from 'mithril'
import { css } from '../../styled-system/css'
import { Swap } from '../../src/index.js'
import { Sun, Moon } from 'lucide-mithril'
import { CodeExample } from '../components/CodeExample.jsx'
import { ClassTable } from '../components/ClassTable.jsx'

const row = css({ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '2rem' })

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
          Swap elements with a transition animation.
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
