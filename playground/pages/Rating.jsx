import m from 'mithril'
import { css } from '../../styled-system/css'
import { Rating } from '../../src/index.js'
import { CodeExample } from '../components/CodeExample.jsx'
import { ClassTable } from '../components/ClassTable.jsx'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '2rem' })
const heading = css({ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 })
const section = css({ marginBottom: '2rem' })
const row = css({ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' })

const usageCode = `<Rating value={3} max={5} onchange={(v) => console.log(v)} />
<Rating value={4} max={5} size="lg" color="warning" />
<Rating value={2} max={5} readonly />`

const classRows = [
  { className: 'rating', prop: '<Rating value={...} max={...}>', type: 'Component', description: 'Rating container' },
  { className: 'mask mask-star-2', prop: '(internal)', type: 'Part', description: 'Each star is rendered as a masked radio input' },
  { className: 'rating-half', type: 'Modifier', description: 'Allows half-star precision — not supported by this component' },
  { className: 'rating-xs', prop: 'size="xs"', type: 'Size', description: 'Extra small size' },
  { className: 'rating-sm', prop: 'size="sm"', type: 'Size', description: 'Small size' },
  { className: 'rating-md', prop: 'size="md" (default)', type: 'Size', description: 'Medium size', isDefault: true },
  { className: 'rating-lg', prop: 'size="lg"', type: 'Size', description: 'Large size' },
  { className: 'rating-xl', prop: 'size="xl"', type: 'Size', description: 'Extra large size' },
]

export default {
  oninit(vnode) {
    vnode.state.value = 3
  },

  name: 'Rating',
  category: 'Data Input',
  description: 'Rating component for displaying star ratings.',

  view(vnode) {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Rating</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Rating component for displaying star ratings.
        </p>

        <section className={section}>
          <h3 className={heading}>Interactive</h3>
          <Rating value={vnode.state.value} max={5} onchange={(v) => { vnode.state.value = v }} />
        </section>

        <section className={section}>
          <h3 className={heading}>Sizes</h3>
          <div className={row}>
            <Rating value={3} size="xs" />
            <Rating value={3} size="sm" />
            <Rating value={3} size="md" />
            <Rating value={3} size="lg" />
            <Rating value={3} size="xl" />
          </div>
        </section>

        <section className={section}>
          <h3 className={heading}>Colors</h3>
          <div className={row}>
            <Rating value={4} color="warning" />
            <Rating value={4} color="success" />
            <Rating value={4} color="error" />
          </div>
        </section>

        <section className={section}>
          <h3 className={heading}>Readonly</h3>
          <Rating value={2} readonly />
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
