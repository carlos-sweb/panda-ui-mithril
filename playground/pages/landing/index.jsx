import m from 'mithril'
import { css } from '../../../styled-system/css'
import { DevNpmOriginal, DevPnpmOriginal, DevYarnOriginal, DevBunOriginal } from 'devicon-mithril'
import {
  Button, Badge, Card, CardBody, CardTitle, Alert, TextInput, Toggle, Checkbox, Radio,
  Progress, Loading, Hero, HeroContent, Stats, Stat, StatTitle, StatValue, StatDesc,
  Tabs, Tab, TabContent, Title, Block, Stack, Container, Grid, Cell, Text,
} from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { t, loadPageI18n } from '../../i18n/index.js'

import logo from '../../favicon-64.png'

const heroSection = css({
  background: 'token(colors.base-200)',
  borderRadius: '1.5rem',
  marginBottom: '2.5rem',
})

const features = [
  { title: 'Mithril.js', desc: 'Built on the ultra-lightweight 7KB virtual DOM framework with no runtime dependencies.' },
  { title: 'Panda CSS', desc: 'Zero-runtime CSS-in-JS with static analysis. Only the styles you use are generated.' },
  { title: 'Class naming', desc: 'Familiar class naming convention: btn-primary, card-body, alert-soft.' },
  { title: 'Tree-Shakable', desc: 'Import only what you need. Each component is a separate module.' },
  { title: 'TypeScript Ready', desc: 'Full type definitions shipped with every component.' },
  { title: 'Icons', desc: 'Integrates with lucide-mithril for a consistent icon system.' },
]

const packageManagers = [
  { id: 'npm', label: 'npm', command: 'npm install https://github.com/carlos-sweb/panda-ui-mithril.git mithril', icon: DevNpmOriginal },
  { id: 'pnpm', label: 'pnpm', command: 'pnpm add https://github.com/carlos-sweb/panda-ui-mithril.git mithril', icon: DevPnpmOriginal },
  { id: 'yarn', label: 'yarn', command: 'yarn add https://github.com/carlos-sweb/panda-ui-mithril.git mithril', icon: DevYarnOriginal },
  { id: 'bun', label: 'bun', command: 'bun add https://github.com/carlos-sweb/panda-ui-mithril.git mithril', icon: DevBunOriginal },
]

// Quick Start — proceso de consumo verificado (ver install.md). Instala Panda
// primero (el paquete corre `panda codegen` al instalarse desde git), configura
// tu panda.config.ts con el preset, genera el CSS y escribe el hello world.
const quickStartInstall = `bun add -d @pandacss/dev @pandacss/preset-panda
bun add https://github.com/carlos-sweb/panda-ui-mithril.git mithril`

const quickStartInit = `bunx panda-ui-mithril init`

const quickStartCss = `bunx panda codegen && bunx panda cssgen`

// Lo que init escribe: panda.config.ts apuntando a ./pum/preset.
const quickStartConfig = `// panda.config.ts (generado por init)
import { defineConfig } from '@pandacss/dev'
import pandaPreset from '@pandacss/preset-panda'
import { pumPreset } from './pum/preset'

export default defineConfig({
  presets: [pandaPreset, pumPreset],
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  staticCss: { recipes: '*' },
  outdir: 'styled-system',
})`

// Lo que init escribe: los campos JSX en tsconfig.json.
const quickStartTsconfig = `// tsconfig.json — campos JSX que init fusiona
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "m",
    "jsxFragmentFactory": "m.Fragment"
  }
}`

// Árbol que init crea en tu proyecto.
const quickStartPumTree = `pum/
├── preset.ts        # registra las recipes + theme (importa panda-ui-mithril/recipes)
├── theme.ts         # agrega los tokens del theme
├── theme.d.ts
└── theme/           # edita tus tokens aquí
    ├── colors.ts
    ├── fonts.ts
    ├── spacing.ts
    ├── radii.ts
    └── keyframes.ts`

const quickStartApp = `// src/main.js
import m from 'mithril'
import { Button } from 'panda-ui-mithril/button'

m.mount(document.body, {
  view: () => [
    m('h1', 'Try me out'),
    m(Button, { color: 'primary', size: 'md' }, 'try me'),
  ],
})`

// Canonical component list. Mirrors the sidebar navigation so the landing
// page can never drift from the routes that actually exist. `route` is the
// playground route for each component's demo page.
const categories = [
  {
    title: 'sidebar.categories.actions',
    desc: 'Buttons, links, and interactive triggers',
    items: [
      { name: 'Button', route: 'button' },
      { name: 'ButtonClose', route: 'buttonclose' },
      { name: 'ButtonCopy', route: 'buttoncopy' },
      { name: 'ButtonGroup', route: 'buttongroup' },
      { name: 'FAB', route: 'fab' },
      { name: 'Filter', route: 'filter' },
      { name: 'Link', route: 'link' },
      { name: 'Swap', route: 'swap' },
      { name: 'ThemeController', route: 'themectrl' },
    ],
  },
  {
    title: 'sidebar.categories.dataDisplay',
    desc: 'Show information, lists, and media',
    items: [
      { name: 'Avatar', route: 'avatar' },
      { name: 'Badge', route: 'badge' },
      { name: 'Card', route: 'card' },
      { name: 'ChatBubble', route: 'chat' },
      { name: 'Countdown', route: 'countdown' },
      { name: 'Kbd', route: 'kbd' },
      { name: 'List', route: 'list' },
      { name: 'Mask', route: 'mask' },
      { name: 'Stat', route: 'stat' },
      { name: 'Table', route: 'table' },
      { name: 'Tag', route: 'tag' },
      { name: 'Timeline', route: 'timeline' },
    ],
  },
  {
    title: 'sidebar.categories.navigation',
    desc: 'Menus, tabs, and page structure',
    items: [
      { name: 'Breadcrumbs', route: 'breadcrumbs' },
      { name: 'Footer', route: 'footer' },
      { name: 'Megamenu', route: 'megamenu' },
      { name: 'Menu', route: 'menu' },
      { name: 'Navbar', route: 'navbar' },
      { name: 'Pagination', route: 'pagination' },
      { name: 'Steps', route: 'steps' },
      { name: 'Tabs', route: 'tabs' },
    ],
  },
  {
    title: 'sidebar.categories.feedback',
    desc: 'Alerts, modals, and loading states',
    items: [
      { name: 'Alert', route: 'alert' },
      { name: 'Aura', route: 'aura' },
      { name: 'Indicator', route: 'indicator' },
      { name: 'Loading', route: 'loading' },
      { name: 'Modal', route: 'modal' },
      { name: 'Progress', route: 'progress' },
      { name: 'RadialProgress', route: 'radialprogress' },
      { name: 'Skeleton', route: 'skeleton' },
      { name: 'Status', route: 'status' },
      { name: 'Toast', route: 'toast' },
      { name: 'Tooltip', route: 'tooltip' },
    ],
  },
  {
    title: 'sidebar.categories.dataInput',
    desc: 'Forms, selects, and input controls',
    items: [
      { name: 'Calendar', route: 'calendar' },
      { name: 'Checkbox', route: 'checkbox' },
      { name: 'Fieldset', route: 'fieldset' },
      { name: 'FileInput', route: 'fileinput' },
      { name: 'TextInput', route: 'input' },
      { name: 'Label', route: 'label' },
      { name: 'OTP', route: 'otp' },
      { name: 'Radio', route: 'radio' },
      { name: 'Range', route: 'range' },
      { name: 'Rating', route: 'rating' },
      { name: 'RatingGroup', route: 'ratinggroup' },
      { name: 'Select', route: 'select' },
      { name: 'Textarea', route: 'textarea' },
      { name: 'Toggle', route: 'toggle' },
    ],
  },
  {
    title: 'sidebar.categories.layout',
    desc: 'Structure, spacing, and visual hierarchy',
    items: [
      { name: 'Accordion', route: 'accordion' },
      { name: 'Block', route: 'block' },
      { name: 'Box', route: 'box' },
      { name: 'Carousel', route: 'carousel' },
      { name: 'Collapse', route: 'collapse' },
      { name: 'Columns', route: 'columns' },
      { name: 'Container', route: 'container' },
      { name: 'Diff', route: 'diff' },
      { name: 'Divider', route: 'divider' },
      { name: 'Grid', route: 'grid' },
      { name: 'Hero', route: 'hero' },
      { name: 'Join', route: 'join' },
      { name: 'Stack', route: 'stack' },
    ],
  },
  {
    title: 'sidebar.categories.typography',
    desc: 'Text styling and semantic headings',
    items: [
      { name: 'Text', route: 'text' },
      { name: 'Title', route: 'title' },
    ],
  },
]

// Component count: one folder in src/components = one component (the same
// rule as `bun run count` → scripts/count-components.ts). Subcomponents such
// as <MenuItem> or <CardBody> live inside their parent's folder and don't
// count. The value comes from the generated components-count.js module, which
// `bun run count` regenerates from the real folders, so it can never drift.
import { COMPONENTS_COUNT } from './components-count.js'

export const Landing = {
  oninit(vnode) {
    loadPageI18n('landing')
    vnode.state.pkgManager = 'npm'
  },

  view(vnode) {
    return (
      <Container maxWidth="desktop">
        {/* ── Hero ── */}
        <Hero className={heroSection}>
          <HeroContent className={css({ flexDirection: 'column', textAlign: 'center', padding: '4rem 2rem' })}>
            <Badge color="primary" variant="soft" className={css({ marginBottom: '1rem' })}>
              {COMPONENTS_COUNT} {t('componentsLabel')}
            </Badge>
            <img src={logo} alt="PUM logo" />
            <Title size="1">PUM</Title>
            <Title as="p" size="5" className={css({ opacity: 0.6, maxWidth: '600px', margin: '0 auto 2rem' })}>
              {t('hero')}
            </Title>
            <Stack direction="row" gap="sm" justify="center">
              <Button color="primary" size="lg" href="#quick-start">Get Started</Button>
              <Button variant="outline" size="lg" onclick={() => window.open('https://github.com/carlos-sweb/panda-ui-mithril', '_blank')}>GitHub</Button>
            </Stack>
          </HeroContent>
        </Hero>

        {/* ── Stats ── */}
        <Stats className={css({ width: '100%', marginBottom: '3rem', border: '1px solid', borderColor: 'token(colors.base-300)' })}>
          <Stat>
            <StatTitle>{t('statsComponents')}</StatTitle>
            <StatValue className={css({ color: 'token(colors.primary)' })}>{COMPONENTS_COUNT}</StatValue>
            <StatDesc>{t('componentsDesc')}</StatDesc>
          </Stat>
          <Stat>
            <StatTitle>{t('statsCore')}</StatTitle>
            <StatValue className={css({ color: 'token(colors.secondary)' })}>{t('kbSize')}</StatValue>
            <StatDesc>{t('kbSizeDesc')}</StatDesc>
          </Stat>
          <Stat>
            <StatTitle>{t('statsDeps')}</StatTitle>
            <StatValue className={css({ color: 'token(colors.accent)' })}>{t('dependencies')}</StatValue>
            <StatDesc>{t('dependenciesDesc')}</StatDesc>
          </Stat>
        </Stats>

        {/* ── Features ── */}
        <Grid cols={3} gap="md" className={css({ marginBottom: '3rem' })}>
          {features.map((f) => (
            <Cell key={f.title}>
              <Card border className={css({ background: 'token(colors.base-100)' })}>
                <CardBody>
                  <CardTitle className={css({ fontSize: '1rem' })}>{f.title}</CardTitle>
                  <p className={css({ fontSize: '0.8125rem', color: 'token(colors.base-content)', opacity: 0.6 })}>{f.desc}</p>
                </CardBody>
              </Card>
            </Cell>
          ))}
        </Grid>

        {/* ── Install ── */}
        <Title as="h2" size="3">{t('install')}</Title>
        <Block spacing="sm" />
        <Tabs
          boxed
          active={vnode.state.pkgManager}
          onActiveChange={(ref) => { vnode.state.pkgManager = ref }}
          className={css({ marginBottom: '1.5rem' })}
        >
          {packageManagers.map((pm) => (
            <Tab key={pm.id} ref={pm.id} className={css({ gap: '0.375rem' })}>
              {pm.icon ? m(pm.icon, { size: 16, 'aria-hidden': 'true' }) : null}
              {pm.label}
            </Tab>
          ))}
          {packageManagers.map((pm) => (
            <TabContent key={pm.id} ref={pm.id}>
              <CodeExample code={pm.command} type="bash" copyId={`install-${pm.id}`} />
            </TabContent>
          ))}
        </Tabs>

        {/* ── Quick Start ── */}
        <Title as="h2" size="3" id="quick-start" className={css({ marginTop: '2.5rem' })}>{t('quickStart')}</Title>
        <Block spacing="sm" />
        <Text color="neutral" className={css({ marginBottom: '1.5rem' })}>
          {m.trust(t('quickStartIntro'))}
        </Text>

        <Stack gap="lg">
          <Stack gap="sm">
            <Text weight="bold">{t('quickStartStep1Title')}</Text>
            <Text color="neutral">{m.trust(t('quickStartStep1Desc'))}</Text>
            <CodeExample code={quickStartInstall} type="bash" copyId="quick-start-install" />
          </Stack>

          <Stack gap="sm">
            <Text weight="bold">{t('quickStartStep2Title')}</Text>
            <Text color="neutral">{m.trust(t('quickStartStep2Desc'))}</Text>
            <CodeExample code={quickStartInit} type="bash" copyId="quick-start-init" />
          </Stack>

          <Stack gap="sm">
            <Text weight="bold">{t('quickStartStep3Title')}</Text>
            <Text color="neutral">{m.trust(t('quickStartStep3Desc'))}</Text>
            <CodeExample code={quickStartCss} type="bash" copyId="quick-start-css" />
          </Stack>

          <Stack gap="sm">
            <Text weight="bold">{t('quickStartStep4Title')}</Text>
            <Text color="neutral">{m.trust(t('quickStartStep4Desc'))}</Text>
            <CodeExample code={quickStartApp} type="jsx" copyId="quick-start-app" />
            <Text color="neutral">{m.trust(t('quickStartStep5Run'))}</Text>
          </Stack>

          <Card>
            <CardBody>
              <Stack gap="sm">
                <Title as="h3" size="5">{t('quickStartWhatInitTitle')}</Title>
                <Text color="neutral">{m.trust(t('quickStartWhatInitIntro'))}</Text>

                <Block spacing="sm" />
                <Stack gap="sm">
                  <Text weight="bold">{t('quickStartWhatInit1Title')}</Text>
                  <Text color="neutral">{m.trust(t('quickStartWhatInit1Desc'))}</Text>
                  <CodeExample code={quickStartPumTree} type="bash" copyId="quick-start-pum-tree" />
                </Stack>

                <Stack gap="sm">
                  <Text weight="bold">{t('quickStartWhatInit2Title')}</Text>
                  <Text color="neutral">{m.trust(t('quickStartWhatInit2Desc'))}</Text>
                  <CodeExample code={quickStartConfig} type="typescript" copyId="quick-start-config" />
                </Stack>

                <Stack gap="sm">
                  <Text weight="bold">{t('quickStartWhatInit3Title')}</Text>
                  <Text color="neutral">{m.trust(t('quickStartWhatInit3Desc'))}</Text>
                  <CodeExample code={quickStartTsconfig} type="typescript" copyId="quick-start-tsconfig" />
                </Stack>
              </Stack>
            </CardBody>
          </Card>
        </Stack>
        {/* ── Component Preview ── */}
        <Title as="h2" size="3" className={css({ marginTop: '2.5rem' })}>{t('componentPreview')}</Title>
        <Block spacing="sm" />
        <Stack gap="sm" className={css({ marginBottom: '1.5rem' })}>
          <Alert color="info">{t('alert')}</Alert>
          <Alert color="success">Your changes have been saved successfully.</Alert>
          <Alert color="warning">This action cannot be undone.</Alert>
          <Alert color="error">Something went wrong. Please try again.</Alert>
        </Stack>
        <Stack direction="row" gap="md" className={css({ marginBottom: '2rem' })}>
          <Button color="primary">Primary</Button>
          <Button color="secondary">Secondary</Button>
          <Button color="accent">Accent</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </Stack>
        <Stack direction="row" gap="sm" className={css({ marginBottom: '1rem' })}>
          <Badge color="primary">Primary</Badge>
          <Badge color="secondary">Secondary</Badge>
          <Badge color="accent">Accent</Badge>
          <Badge color="info">Info</Badge>
          <Badge color="success">Success</Badge>
          <Badge color="warning">Warning</Badge>
          <Badge color="error">Error</Badge>
        </Stack>
        <Stack direction="row" gap="md" align="center" className={css({ marginBottom: '1rem' })}>
          <Toggle checked />
          <Checkbox checked />
          <Radio checked />
          <Progress value={60} max={100} color="primary" className={css({ minWidth: '8rem', flex: '1' })} />
        </Stack>
        <Stack direction="row" gap="md" align="center" className={css({ marginBottom: '1rem' })}>
          <Loading variant="spinner" />
          <Loading variant="ring" />
          <Loading variant="ball" />
          <Loading variant="bars" />
          <Loading variant="infinity" />
        </Stack>
        <Stack direction="row" gap="sm" className={css({ marginBottom: '2rem' })}>
          <TextInput placeholder="Enter text..." className={css({ maxWidth: '300px' })} />
          <Button color="primary">Submit</Button>
        </Stack>

        {/* ── Browse All Components ── */}
        <Title as="h2" size="3">{t('browseAllComponents')}</Title>
        <Block spacing="sm" />
        <Text color="neutral" className={css({ marginBottom: '1.5rem' })}>{t('orgDesc')}</Text>

        <Stack gap="lg">
          {categories.map((cat) => (
            <Card key={cat.title} className={css({ background: 'token(colors.base-100)', border: '1px solid', borderColor: 'token(colors.base-300)' })}>
              <CardBody>
                <Stack direction="row" gap="sm" align="center">
                  <CardTitle className={css({ fontSize: '1rem' })}>{t(cat.title)}</CardTitle>
                  <Badge size="sm" variant="soft">{cat.items.length}</Badge>
                </Stack>
                <p className={css({ fontSize: '0.8125rem', color: 'token(colors.base-content)', opacity: 0.5, margin: '0.5rem 0 0.75rem' })}>{cat.desc}</p>
                <Stack direction="row" gap="sm">
                  {cat.items.map((item) => (
                    <Button
                      key={item.name}
                      variant="outline"
                      size="sm"
                      onclick={() => m.route.set(`/${item.route}`)}
                    >
                      {item.name}
                    </Button>
                  ))}
                </Stack>
              </CardBody>
            </Card>
          ))}
        </Stack>
      </Container>
    )
  }
}
