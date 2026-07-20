import m from 'mithril'
import { css } from '../../styled-system/css'
import { Button, Badge, Card, CardBody, CardTitle, Alert, TextInput, Toggle, Checkbox, Radio, Progress, Avatar, Loading, Tooltip, Tabs, Tab } from '../../src/index.js'

const heroSection = css({
  textAlign: 'center',
  padding: '5rem 2rem 4rem',
  background: 'base-200',
  borderRadius: '1.5rem',
  marginBottom: '3rem',
})

const featureGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '1.5rem',
  marginBottom: '3rem',
})

const installBlock = css({
  background: 'base-200',
  borderRadius: '0.75rem',
  padding: '1.25rem 1.5rem',
  fontFamily: 'monospace',
  fontSize: '0.875rem',
  marginBottom: '1rem',
})

const codeBlock = css({
  background: 'neutral',
  color: 'neutral-content',
  borderRadius: '0.75rem',
  padding: '1.25rem 1.5rem',
  fontFamily: 'monospace',
  fontSize: '0.8125rem',
  overflowX: 'auto',
  whiteSpace: 'pre',
  marginBottom: '1rem',
  lineHeight: '1.7',
})

const features = [
  { title: 'Mithril.js', desc: 'Built on the ultra-lightweight 7KB virtual DOM framework with no runtime dependencies.' },
  { title: 'Panda CSS', desc: 'Zero-runtime CSS-in-JS with static analysis. Only the styles you use are generated.' },
  { title: 'daisyUI Naming', desc: 'Familiar class naming convention: btn-primary, card-body, alert-soft.' },
  { title: 'Tree-Shakable', desc: 'Import only what you need. Each component is a separate module.' },
  { title: 'TypeScript Ready', desc: 'Full type definitions shipped with every component.' },
  { title: 'Icons', desc: 'Integrates with lucide-mithril for a consistent icon system.' },
]

export const Landing = {
  view() {
    return (
      <div className={css({ maxWidth: '960px' })}>
        <div className={heroSection}>
          <h1 className={css({ fontSize: '2.75rem', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-0.02em' })}>panda-ui-mithril</h1>
          <p className={css({ fontSize: '1.125rem', color: 'base-content', opacity: 0.6, maxWidth: '600px', margin: '0 auto 2rem' })}>
            A Mithril.js component library styled with Panda CSS. 56 production-ready components with daisyUI-compatible class naming.
          </p>
          <div className={css({ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' })}>
            <Button color="primary" size="lg" href="#quick-start" >Get Started</Button>
            <Button variant="outline" size="lg" onclick={() => window.open('https://github.com/carlos-sweb/panda-ui-mithril-mithril', '_blank')}>GitHub</Button>
          </div>
        </div>

        <div className={featureGrid}>
          {features.map((f) => (
            <div key={f.title} className={css({ padding: '1.25rem', background: 'base-200', borderRadius: '0.75rem' })}>
              <h3 className={css({ fontSize: '1rem', fontWeight: '600', marginBottom: '0.375rem' })}>{f.title}</h3>
              <p className={css({ fontSize: '0.8125rem', color: 'base-content', opacity: 0.6 })}>{f.desc}</p>
            </div>
          ))}
        </div>

        <h2 className={css({ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' })}>Install</h2>
        <div className={installBlock}>npm install panda-ui-mithril-mithril mithril lucide-mithril</div>

        <h2 id="quick-start" className={css({ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', marginTop: '2.5rem' })}>Quick Start</h2>
        <div className={codeBlock}>{`import m from 'mithril'
import { Button, Alert, Card } from 'panda-ui-mithril-mithril'

const App = {
  view() {
    return m('div', [
      m(Alert, { color: 'info' }, 'Welcome to panda-ui-mithril!'),
      m(Card, { border: true }, [
        m(CardBody, null, [
          m('h2', 'Hello World'),
          m(Button, { color: 'primary' }, 'Click me'),
        ]),
      ]),
    ])
  }
}

m.mount(document.body, App)`}</div>

        <h2 className={css({ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', marginTop: '2.5rem' })}>Component Preview</h2>
        <div className={css({ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' })}>
          <Button color="primary">Primary</Button>
          <Button color="secondary">Secondary</Button>
          <Button color="accent">Accent</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <div className={css({ display: 'flex', gap: '0.5rem', marginBottom: '1rem' })}>
          <Badge color="primary">Primary</Badge>
          <Badge color="secondary">Secondary</Badge>
          <Badge color="accent">Accent</Badge>
          <Badge color="info">Info</Badge>
          <Badge color="success">Success</Badge>
          <Badge color="warning">Warning</Badge>
          <Badge color="error">Error</Badge>
        </div>
        <div className={css({ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' })}>
          <Toggle checked />
          <Checkbox checked />
          <Radio checked />
          <Progress value={60} max={100} color="primary" />
        </div>
        <div className={css({ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' })}>
          <Loading variant="spinner" />
          <Loading variant="ring" />
          <Loading variant="ball" />
          <Loading variant="bars" />
          <Loading variant="infinity" />
        </div>
        <div className={css({ display: 'flex', gap: '0.5rem', marginBottom: '2rem' })}>
          <TextInput placeholder="Enter text..." style={{ maxWidth: '300px' }} />
          <Button color="primary">Submit</Button>
        </div>

        <h2 className={css({ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem', marginTop: '2.5rem' })}>Browse All Components</h2>
        <p className={css({ marginBottom: '1.5rem', color: 'base-content', opacity: 0.6 })}>56 components organized by category. Click any to see the full demo.</p>

        {[
          { title: 'Actions', desc: 'Buttons, links, and interactive triggers', items: ['Button', 'FAB', 'Link', 'Swap', 'Filter', 'ThemeController'] },
          { title: 'Data Display', desc: 'Show information, lists, and media', items: ['Badge', 'Avatar', 'Card', 'List', 'Table', 'Stats', 'Timeline', 'Countdown', 'Chat', 'Mask', 'Kbd'] },
          { title: 'Navigation', desc: 'Menus, tabs, and page structure', items: ['Navbar', 'Breadcrumbs', 'Menu', 'Tabs', 'Pagination', 'Steps', 'Megamenu', 'Footer'] },
          { title: 'Feedback', desc: 'Alerts, modals, and loading states', items: ['Alert', 'Toast', 'Modal', 'Tooltip', 'Loading', 'Skeleton', 'Progress', 'RadialProgress', 'Status', 'Indicator', 'Aura'] },
          { title: 'Data Input', desc: 'Forms, selects, and input controls', items: ['TextInput', 'Textarea', 'Select', 'Checkbox', 'Radio', 'Toggle', 'Range', 'FileInput', 'OTP', 'Rating', 'Calendar', 'Fieldset', 'Label'] },
          { title: 'Layout', desc: 'Structure, spacing, and visual hierarchy', items: ['Hero', 'Divider', 'Stack', 'Join', 'Accordion', 'Collapse', 'Carousel', 'Diff'] },
        ].map((cat) => (
          <div key={cat.title} className={css({ marginBottom: '1.5rem' })}>
            <h3 className={css({ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' })}>{cat.title}</h3>
            <p className={css({ fontSize: '0.8125rem', color: 'base-content', opacity: 0.5, marginBottom: '0.75rem' })}>{cat.desc}</p>
            <div className={css({ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' })}>
              {cat.items.map((name) => (
                <Button
                  key={name}
                  variant="outline"
                  size="sm"
                  onclick={() => m.route.set(`/${name.toLowerCase()}`)}
                >
                  {name}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }
}
