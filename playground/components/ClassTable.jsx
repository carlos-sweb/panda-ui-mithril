import m from 'mithril'
import { css, cx } from '../../styled-system/css'
import { Badge } from '../../src/index.js'
import { PaintBucket, Shapes, RulerDimensionLine, Settings, Wrench, Puzzle, Weight, AlignJustify, CaseSensitive } from 'lucide-mithril'
import { t, tClassRow } from '../i18n/index.js'

const note = css({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.5rem',
  fontSize: '0.8125rem',
  opacity: 0.7,
  marginBottom: '0.75rem',
  maxWidth: '640px',
})
const wrapper = css({ overflowX: 'auto', borderWidth: '1px', borderColor: 'var(--colors-base-300)', borderRadius: 'var(--radius-box, 0.5rem)' })
const table = css({ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' })
const th = css({ textAlign: 'left', padding: '0.75rem 1rem', fontWeight: '600', backgroundColor: 'var(--colors-base-200)', borderBottomWidth: '1px', borderColor: 'var(--colors-base-300)' })
const td = css({ padding: '0.75rem 1rem', borderBottomWidth: '1px', borderColor: 'var(--colors-base-300)', verticalAlign: 'top' })
const classNameCell = css({ fontFamily: 'var(--fonts-mono, monospace)', fontSize: '0.8125rem', whiteSpace: 'nowrap', opacity: 0.6 })
const propCell = css({ whiteSpace: 'nowrap' })
const propChip = css({
  display: 'inline-block',
  fontFamily: 'var(--fonts-mono, monospace)',
  fontSize: '0.8125rem',
  backgroundColor: 'var(--colors-base-200)',
  color: 'var(--colors-base-content)',
  borderRadius: '0.25rem',
  padding: '0.125rem 0.375rem',
})
const propFallback = css({ opacity: 0.35, fontFamily: 'var(--fonts-mono, monospace)', fontSize: '0.8125rem' })
const typeCell = css({ whiteSpace: 'nowrap' })
const defaultBadge = css({ marginInlineStart: '0.5rem', fontSize: '0.6875rem', opacity: 0.6 })
const typeTag = css({ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontWeight: '500' })
const fallbackType = css({ opacity: 0.6 })

// Color/icon per "Type" column value, per the user's spec.
const TYPE_CONFIG = {
  Color: { icon: PaintBucket, color: 'var(--colors-success)' },
  Style: { icon: Shapes, color: 'var(--colors-secondary)' },
  Size: { icon: RulerDimensionLine, color: 'var(--colors-warning)' },
  Behavior: { icon: Settings, color: 'var(--colors-info)' },
  Modifier: { icon: Wrench, color: 'var(--colors-accent)' },
  Weight: { icon: Weight, color: 'var(--colors-error)' },
  Alignment: { icon: AlignJustify, color: 'var(--colors-primary)' },
  Transform: { icon: CaseSensitive, color: 'var(--colors-secondary)' },
}

// Types rendered as a ghost Badge instead of colored icon+text.
const BADGE_TYPES = {
  Component: null,
  Part: Puzzle,
}

function typeCellContent(type) {
  if (type in BADGE_TYPES) {
    const icon = BADGE_TYPES[type]
    return m(Badge, { size: 'sm', variant: 'ghost' }, icon ? [m(icon, { size: 12 }), type] : type)
  }

  const config = TYPE_CONFIG[type]
  if (!config) {
    return m('span', { className: fallbackType }, type)
  }

  return m('span', { className: typeTag, style: `color: ${config.color}` }, [
    m(config.icon, { size: 14 }),
    type,
  ])
}

// rows: [{ className, prop?, type, description, isDefault? }]
// `className` is the raw CSS class this variant generates internally —
// it's shown for cross-reference, not something you pass to this library.
// `prop` is what you actually write in Mithril JSX to get it.
export const ClassTable = {
  view(vnode) {
    const { rows } = vnode.attrs

    return m('div', [
      m('p', { className: note }, [
        m('span', {}, '💡 '),
        m('span', {}, t('common.classTableTooltip')),
      ]),
      m('div', { className: wrapper },
        m('table', { className: table }, [
          m('thead', m('tr', [
            m('th', { className: th }, t('common.thClassName')),
            m('th', { className: th }, t('common.thProp')),
            m('th', { className: th }, t('common.thType')),
            m('th', { className: th }, t('common.thDescription')),
          ])),
          m('tbody', rows.map((row, i) =>
            m('tr', { key: i }, [
              m('td', { className: cx(td, classNameCell) }, row.className),
              m('td', { className: cx(td, propCell) },
                row.prop
                  ? m('code', { className: propChip }, row.prop)
                  : m('span', { className: propFallback }, '—')
              ),
              m('td', { className: cx(td, typeCell) }, typeCellContent(row.type)),
              m('td', { className: td }, [
                tClassRow(row.description),
                row.isDefault && m('span', { className: defaultBadge }, '[Default]'),
              ]),
            ])
          )),
        ])
      ),
    ])
  }
}
