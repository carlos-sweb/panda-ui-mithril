import m from 'mithril'
import hljs from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/xml'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import bash from 'highlight.js/lib/languages/bash'
import jsx from './../jsx-language.js'
import { css, cx } from '../../styled-system/css'
import { indicatorItem } from '../../styled-system/recipes'

import { ButtonCopy, Indicator } from '../../src/index.js'

// Register languages
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('jsx', jsx)

const pre = css({
  backgroundColor: '#282c34',
  borderRadius: 'var(--radius-box, 0.5rem)',
  padding: '0.625rem 0.875rem',
  overflowX: 'auto',
  fontSize: '1rem',
  lineHeight: '1.6',
  // The UA stylesheet gives <code> its own font-family: monospace, which does
  // not inherit from <pre> — so the rendered code text must be targeted
  // directly, not just the block.
  fontFamily: "'JetBrains Mono', monospace",
  '& code': {
    fontFamily: "'JetBrains Mono', monospace",
  },
})

// Language badge shown with the library's Indicator at the top-start corner.
// Dark background matching the block so it reads as a corner label.
const langBadge = css({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '0.125rem 0.5rem',
  borderRadius: '9999px',
  backgroundColor: '#282c34',
  border: '1px solid',
  borderColor: 'color-mix(in oklab, white 15%, transparent)',
  color: 'color-mix(in oklab, white 75%, transparent)',
  fontSize: '0.6875rem',
  fontWeight: '600',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  fontFamily: "'JetBrains Mono', monospace",
  userSelect: 'none',
})

// Copy button floats at the end (right) edge, vertically aligned with the
// first line of code instead of sitting below the text.
const copyFloat = css({
  position: 'absolute',
  top: '-0.125rem',
  insetInlineEnd: '0.25rem',
  zIndex: '1',
})

// White icon without touching any component API: targets the icon's svg
// stroke directly, so it stays white regardless of the button's color
// variant or hover states (CSS overrides the lucide `stroke="currentColor"`).
// Also bumps the icon one size scale (lg → xl: 18px → 20px) while keeping
// the button itself at `size="lg"`.
const copyIcon = css({
  '& svg': {
    stroke: 'white',
    width: '20px',
    height: '20px',
  },
})

export const CodeExample = {
  view(vnode) {
    const { code, type, copyId } = vnode.attrs
    const lang = type || 'xml'
    const highlighted = hljs.highlight(code.trim(), { language: lang }).value

    return m(Indicator, {
      position: 'center top',
      className: css({ width: '100%', display: 'block' }),
    }, [
      // Badge rendered as a direct child with the indicator-item class (the
      // recipe positions any descendant carrying it). Not via the `item` prop:
      // that wraps the content in an extra span, which would double the
      // border/pill styles and look like two concentric rings.
      m('span', { className: cx('indicator-item', indicatorItem(), langBadge) }, lang),
      m('pre', { className: pre },
        m('code', { id: copyId == undefined ? '' : copyId, className: `hljs language-${lang}` }, m.trust(highlighted)),
      ),
      m(ButtonCopy, {
        variant: 'ghost',
        size: 'lg',
        animation: 'scale',
        for: copyId,
        className: cx(copyFloat, copyIcon),
      }),
    ])
  }
}
