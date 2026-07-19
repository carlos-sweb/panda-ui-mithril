import m from 'mithril'
import { css } from '../../styled-system/css'
import { Footer, FooterTitle, Link } from '../../src/index.js'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Footer',
  category: 'Navigation',
  description: 'Footer component for site footers with links and information.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Footer</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Footer component for site footers with links and information.
        </p>

        <Footer center className="bg-base-200 p-4 rounded-box">
          <FooterTitle>panda-ui-mithril</FooterTitle>
          <div className="grid grid-flow-col gap-4">
            <Link href="#">GitHub</Link>
            <Link href="#">npm</Link>
            <Link href="#">Docs</Link>
          </div>
        </Footer>
      </div>
    )
  }
}
