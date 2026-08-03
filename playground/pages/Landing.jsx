import m from 'mithril'
import { css } from '../../styled-system/css'
import {
  Button, Badge, Card, CardBody, CardTitle, Alert, TextInput, Toggle, Checkbox, Radio,
  Progress, Loading, Hero, HeroContent, Stats, Stat, StatTitle, StatValue, StatDesc,
  Tabs, Tab, TabContent,
} from '../../src/index.js'
import { CodeExample } from '../components/CodeExample.jsx'

const heroSection = css({
  background: 'token(colors.base-200)',
  borderRadius: '1.5rem',
  marginBottom: '2.5rem',
})

const featureGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '1.5rem',
  marginBottom: '3rem',
})

const installCommand = css({
  background: 'token(colors.neutral)',
  color: 'token(colors.neutral-content)',
  borderRadius: '0.75rem',
  padding: '1rem 1.25rem',
  fontFamily: 'var(--fonts-mono, monospace)',
  fontSize: '0.8125rem',
  overflowX: 'auto',
  whiteSpace: 'pre',
})

const features = [
  { title: 'Mithril.js', desc: 'Built on the ultra-lightweight 7KB virtual DOM framework with no runtime dependencies.' },
  { title: 'Panda CSS', desc: 'Zero-runtime CSS-in-JS with static analysis. Only the styles you use are generated.' },
  { title: 'daisyUI Naming', desc: 'Familiar class naming convention: btn-primary, card-body, alert-soft.' },
  { title: 'Tree-Shakable', desc: 'Import only what you need. Each component is a separate module.' },
  { title: 'TypeScript Ready', desc: 'Full type definitions shipped with every component.' },
  { title: 'Icons', desc: 'Integrates with lucide-mithril for a consistent icon system.' },
]

const installCommands = {
  npm: 'npm install panda-ui-mithril-mithril mithril lucide-mithril',
  pnpm: 'pnpm add panda-ui-mithril-mithril mithril lucide-mithril',
  yarn: 'yarn add panda-ui-mithril-mithril mithril lucide-mithril',
  bun: 'bun add panda-ui-mithril-mithril mithril lucide-mithril',
}

const quickStartCode = `<Alert color="info">Welcome to panda-ui-mithril!</Alert>

<Card border>
  <CardBody>
    <CardTitle>Hello World</CardTitle>
    <Button color="primary">Click me</Button>
  </CardBody>
</Card>`

const categories = [
  { title: 'Actions', desc: 'Buttons, links, and interactive triggers', items: ['Button', 'FAB', 'Link', 'Swap', 'Filter', 'ThemeController'] },
  { title: 'Data Display', desc: 'Show information, lists, and media', items: ['Badge', 'Avatar', 'Card', 'List', 'Table', 'Stats', 'Timeline', 'Countdown', 'Chat', 'Mask', 'Kbd', 'Aura'] },
  { title: 'Navigation', desc: 'Menus, tabs, and page structure', items: ['Navbar', 'Breadcrumbs', 'Menu', 'Tabs', 'Pagination', 'Steps', 'Megamenu', 'Footer'] },
  { title: 'Feedback', desc: 'Alerts, modals, and loading states', items: ['Alert', 'Toast', 'Modal', 'Tooltip', 'Loading', 'Skeleton', 'Progress', 'RadialProgress', 'Status', 'Indicator'] },
  { title: 'Data Input', desc: 'Forms, selects, and input controls', items: ['TextInput', 'Textarea', 'Select', 'Checkbox', 'Radio', 'Toggle', 'Range', 'FileInput', 'OTP', 'Rating', 'Calendar', 'Fieldset', 'Label'] },
  { title: 'Layout', desc: 'Structure, spacing, and visual hierarchy', items: ['Hero', 'Divider', 'Stack', 'Join', 'Accordion', 'Collapse', 'Carousel', 'Diff'] },
]

export const Landing = {
  oninit(vnode) {
    vnode.state.pkgManager = 'npm'
  },

  view(vnode) {
    return (
      <div className={css({ maxWidth: '960px' })}>
        <Hero className={heroSection}>
          <HeroContent className={css({ flexDirection: 'column', textAlign: 'center', padding: '4rem 2rem' })}>
            <Badge color="primary" variant="soft" className={css({ marginBottom: '1rem' })}>57 components</Badge>
            <h1 className={css({ fontSize: '2.75rem', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-0.02em' })}>panda-ui-mithril</h1>
            <p className={css({ fontSize: '1.125rem', color: 'token(colors.base-content)', opacity: 0.6, maxWidth: '600px', margin: '0 auto 2rem' })}>
              A Mithril.js component library styled with Panda CSS. Production-ready components with daisyUI-compatible class naming.
            </p>
            <div className={css({ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' })}>
              <Button color="primary" size="lg" href="#quick-start">Get Started</Button>
              <Button variant="outline" size="lg" onclick={() => window.open('https://github.com/carlos-sweb/panda-ui-mithril-mithril', '_blank')}>GitHub</Button>
            </div>
          </HeroContent>
        </Hero>

        <Stats className={css({ width: '100%', marginBottom: '3rem', border: '1px solid', borderColor: 'token(colors.base-300)' })}>
          <Stat>
            <StatTitle>Components</StatTitle>
            <StatValue className={css({ color: 'token(colors.primary)' })}>57</StatValue>
            <StatDesc>daisyUI-compatible</StatDesc>
          </Stat>
          <Stat>
            <StatTitle>Core size</StatTitle>
            <StatValue className={css({ color: 'token(colors.secondary)' })}>7KB</StatValue>
            <StatDesc>Mithril.js runtime</StatDesc>
          </Stat>
          <Stat>
            <StatTitle>Runtime deps</StatTitle>
            <StatValue className={css({ color: 'token(colors.accent)' })}>0</StatValue>
            <StatDesc>zero-runtime CSS</StatDesc>
          </Stat>
        </Stats>

        <div className={featureGrid}>
          {features.map((f) => (
            <Card key={f.title} border className={css({ background: 'token(colors.base-100)' })}>
              <CardBody>
                <CardTitle className={css({ fontSize: '1rem' })}>{f.title}</CardTitle>
                <p className={css({ fontSize: '0.8125rem', color: 'token(colors.base-content)', opacity: 0.6 })}>{f.desc}</p>
              </CardBody>
            </Card>
          ))}
        </div>

        <h2 className={css({ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' })}>Install</h2>
        <Tabs boxed className={css({ marginBottom: '0.75rem' })}>
          {Object.keys(installCommands).map((mgr) => (
            <Tab key={mgr} active={vnode.state.pkgManager === mgr} onclick={() => { vnode.state.pkgManager = mgr }}>{mgr}</Tab>
          ))}
        </Tabs>
        {Object.entries(installCommands).map(([mgr, cmd]) => (
          <TabContent key={mgr} active={vnode.state.pkgManager === mgr} className={css({ marginBottom: '1rem' })}>
            <div className={installCommand}>{cmd}</div>
          </TabContent>
        ))}

        <h2 id="quick-start" className={css({ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', marginTop: '2.5rem' })}>Quick Start</h2>
        <Alert color="info" className={css({ marginBottom: '1rem' })}>
          Every component is a plain Mithril component — compose them the same way you'd write any other <code>m(...)</code> vnode tree.
        </Alert>
        <CodeExample code={quickStartCode} />

        <h2 className={css({ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', marginTop: '2.5rem' })}>Component Preview</h2>
        <div className={css({ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' })}>
          <Alert color="info">New: 57 components now match daisyUI pixel-for-pixel.</Alert>
          <Alert color="success">Your changes have been saved successfully.</Alert>
          <Alert color="warning">This action cannot be undone.</Alert>
          <Alert color="error">Something went wrong. Please try again.</Alert>
        </div>
        <div className={css({ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' })}>
          <Button color="primary">Primary</Button>
          <Button color="secondary">Secondary</Button>
          <Button color="accent">Accent</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <div className={css({ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' })}>
          <Badge color="primary">Primary</Badge>
          <Badge color="secondary">Secondary</Badge>
          <Badge color="accent">Accent</Badge>
          <Badge color="info">Info</Badge>
          <Badge color="success">Success</Badge>
          <Badge color="warning">Warning</Badge>
          <Badge color="error">Error</Badge>
        </div>
        <div className={css({ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1rem' })}>
          <Toggle checked />
          <Checkbox checked />
          <Radio checked />
          <Progress value={60} max={100} color="primary" className={css({ minWidth: '8rem', flex: '1' })} />
        </div>
        <div className={css({ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1rem' })}>
          <Loading variant="spinner" />
          <Loading variant="ring" />
          <Loading variant="ball" />
          <Loading variant="bars" />
          <Loading variant="infinity" />
        </div>
        <div className={css({ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' })}>
          <TextInput placeholder="Enter text..." style={{ maxWidth: '300px' }} />
          <Button color="primary">Submit</Button>
        </div>

        <h2 className={css({ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem', marginTop: '2.5rem' })}>Browse All Components</h2>
        <p className={css({ marginBottom: '1.5rem', color: 'token(colors.base-content)', opacity: 0.6 })}>57 components organized by category. Click any to see the full demo.</p>

        {categories.map((cat) => (
          <Card key={cat.title} className={css({ background: 'token(colors.base-100)', border: '1px solid', borderColor: 'token(colors.base-300)', marginBottom: '1.5rem' })}>
            <CardBody>
              <div className={css({ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' })}>
                <CardTitle className={css({ fontSize: '1rem' })}>{cat.title}</CardTitle>
                <Badge size="sm" variant="soft">{cat.items.length}</Badge>
              </div>
              <p className={css({ fontSize: '0.8125rem', color: 'token(colors.base-content)', opacity: 0.5, marginBottom: '0.75rem' })}>{cat.desc}</p>
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
            </CardBody>
          </Card>
        ))}
      </div>
    )
  }
}
