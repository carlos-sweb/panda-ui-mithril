import m from 'mithril'
import hljs from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/xml'
import { css } from '../../styled-system/css'

// Our examples are bare JSX tag fragments (no imports, no render() call), so
// the 'javascript' grammar can't parse them — they're markup, not statements.
// 'xml' highlights tags/attributes/strings correctly for this shape.
hljs.registerLanguage('xml', xml)

const wrapper = css({ position: 'relative' })

const pre = css({
  backgroundColor: '#282c34',
  borderRadius: 'var(--radius-box, 0.5rem)',
  padding: '1rem',
  paddingTop: '2.25rem',
  overflowX: 'auto',
  fontSize: '0.8125rem',
  lineHeight: '1.6',
  fontFamily: 'var(--fonts-mono, monospace)',
})

// Labels the block as JSX so it isn't mistaken for plain HTML you could paste
// straight into an .html file — it's Mithril hyperscript via a JSX pragma.
const languageTag = css({
  position: 'absolute',
  top: '0.625rem',
  insetInlineEnd: '0.75rem',
  fontSize: '0.6875rem',
  fontWeight: '600',
  letterSpacing: '0.03em',
  color: 'color-mix(in oklab, white 55%, transparent)',
  fontFamily: 'var(--fonts-mono, monospace)',
  userSelect: 'none',
})

export const CodeExample = {
  view(vnode) {
    const { code } = vnode.attrs
    const highlighted = hljs.highlight(code.trim(), { language: 'xml' }).value

    return m('div', { className: wrapper }, [
      m('span', { className: languageTag }, 'JSX'),
      m('pre', { className: pre },
        m('code', { className: 'hljs language-xml' }, m.trust(highlighted))
      ),
    ])
  }
}
