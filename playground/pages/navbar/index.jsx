import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import {
  Stack, Title, Navbar, NavbarStart, NavbarCenter, NavbarEnd, NavbarBrand,
  NavbarLink, NavbarMenu, NavbarToggle, Button, Text, Block, Tabs, Tab, TabContent,
  Grid, Cell, Box, Drawer, DrawerBox, DrawerBackdrop, DrawerHeader, DrawerBody,
  Menu, MenuItem, MenuTitle
} from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const surface = css({ background: 'token(colors.base-200)' })
const scrollArea = css({
  height: '220px',
  overflow: 'auto',
  borderRadius: 'var(--radius-box)',
  background: 'token(colors.base-100)',
  padding: '1rem',
})
// transform hace al Box containing block del `position: fixed`, así el sample
// queda contenido en el demo (si no, escaparía al viewport y taparía la
// navbar del shell). En una página real `fixed` se fija al viewport — la
// navbar superior de este playground lo usa.
const fixedArea = css({
  height: '220px',
  overflow: 'auto',
  borderRadius: 'var(--radius-box)',
  background: 'token(colors.base-100)',
  paddingTop: '4rem',
  transform: 'translateZ(0)',
})

const usageCodeJsx = `import m from 'mithril'
import {
  Navbar, NavbarStart, NavbarCenter, NavbarEnd, NavbarBrand,
  NavbarMenu, NavbarLink, NavbarToggle, Button
} from 'panda-ui-mithril'

export const SiteNav = {
  view() {
    return (
      <div>
        <Navbar position="sticky" size="lg" border shadow="sm">
          <NavbarStart>
            <NavbarToggle open={open} onclick={() => { open = true }} />
            <NavbarBrand href="/">panda-ui</NavbarBrand>
          </NavbarStart>
          <NavbarCenter>
            <NavbarMenu>
              <NavbarLink href="/docs" active>Docs</NavbarLink>
              <NavbarLink href="/components">Components</NavbarLink>
              <NavbarLink href="/blog">Blog</NavbarLink>
            </NavbarMenu>
          </NavbarCenter>
          <NavbarEnd>
            <Button color="primary" size="sm">Get Started</Button>
          </NavbarEnd>
        </Navbar>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import {
  Navbar, NavbarStart, NavbarCenter, NavbarEnd, NavbarBrand,
  NavbarMenu, NavbarLink, NavbarToggle, Button
} from 'panda-ui-mithril'

export const SiteNav = {
  view() {
    return m(Navbar, { position: 'sticky', size: 'lg', border: true, shadow: 'sm' }, [
      m(NavbarStart, null, [
        m(NavbarToggle, { open: open, onclick: () => { open = true } }),
        m(NavbarBrand, { href: '/' }, 'panda-ui'),
      ]),
      m(NavbarCenter, null,
        m(NavbarMenu, null, [
          m(NavbarLink, { href: '/docs', active: true }, 'Docs'),
          m(NavbarLink, { href: '/components' }, 'Components'),
          m(NavbarLink, { href: '/blog' }, 'Blog'),
        ])
      ),
      m(NavbarEnd, null,
        m(Button, { color: 'primary', size: 'sm' }, 'Get Started')
      ),
    ])
  }
}`

export default {
  name: 'Navbar',
  category: 'Navigation',
  description: 'Navbar component for site navigation headers.',

  oninit(vnode) {
    loadPageI18n('navbar')
    vnode.state.anatomyActive = 1
    vnode.state.navOpen = false
  },

  view(vnode) {
    const links = [
      { label: 'Drawer', route: '/drawer' },
      { label: 'Modal', route: '/modal' },
      { label: 'OTP', route: '/otp' },
      { label: 'Rating', route: '/rating' },
    ]

    const scrollFill = Array.from({ length: 12 }, (_, i) => (
      <Text key={i} size="sm" color="neutral">Scrollable filler line {i + 1} — the navbar stays pinned while this content scrolls.</Text>
    ))

    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Navbar</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Title as="h2" size="3">Basic</Title>
        <Navbar className={surface}>
          <NavbarStart><NavbarBrand onclick={(e) => e.preventDefault()}>panda-ui</NavbarBrand></NavbarStart>
          <NavbarEnd>
            <Button variant="ghost" size="sm">Login</Button>
            <Button color="primary" size="sm">Sign up</Button>
          </NavbarEnd>
        </Navbar>

        <Block spacing="lg">
          <Title as="h2" size="3">Anatomy</Title>
          <Text color="neutral">
            <code>NavbarBrand</code> + <code>NavbarMenu</code> con <code>NavbarLink</code> (estado activo controlado)
            y acciones en <code>NavbarEnd</code>.
          </Text>
          <Navbar className={surface} border shadow="sm">
            <NavbarStart>
              <NavbarBrand onclick={(e) => e.preventDefault()}>panda-ui</NavbarBrand>
            </NavbarStart>
            <NavbarCenter>
              <NavbarMenu>
                {links.map((l, i) => (
                  <NavbarLink
                    key={l.label}
                    href={`#!${l.route}`}
                    active={vnode.state.anatomyActive === i}
                    onclick={(e) => { e.preventDefault(); vnode.state.anatomyActive = i }}
                  >
                    {l.label}
                  </NavbarLink>
                ))}
                <NavbarLink disabled href="#!">Disabled</NavbarLink>
              </NavbarMenu>
            </NavbarCenter>
            <NavbarEnd>
              <Button variant="ghost" size="sm">Login</Button>
              <Button color="primary" size="sm">Get Started</Button>
            </NavbarEnd>
          </Navbar>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">Positions</Title>
          <Text color="neutral">
            <code>static</code> (default), <code>sticky</code> (se fija al top de su contenedor al hacer
            scroll) y <code>fixed</code> (se fija al viewport; aquí contenido en el demo con un ancestro
            transform — la navbar del shell de este playground es el ejemplo real).
          </Text>

          <Stack gap="md">
            <Navbar className={surface}>
              <NavbarStart><NavbarBrand onclick={(e) => e.preventDefault()}>static</NavbarBrand></NavbarStart>
              <NavbarCenter>
                <NavbarMenu>
                  <NavbarLink href="#!">Home</NavbarLink>
                  <NavbarLink href="#!">Docs</NavbarLink>
                </NavbarMenu>
              </NavbarCenter>
            </Navbar>

            <Box className={scrollArea}>
              <Navbar position="sticky" className={surface} border shadow="sm">
                <NavbarStart><NavbarBrand onclick={(e) => e.preventDefault()}>sticky</NavbarBrand></NavbarStart>
                <NavbarEnd><Button color="primary" size="sm">Action</Button></NavbarEnd>
              </Navbar>
              <Stack gap="xs">{scrollFill}</Stack>
            </Box>

            <Box className={fixedArea}>
              <Navbar position="fixed" className={surface} border shadow="sm">
                <NavbarStart><NavbarBrand onclick={(e) => e.preventDefault()}>fixed</NavbarBrand></NavbarStart>
                <NavbarEnd><Button color="primary" size="sm">Action</Button></NavbarEnd>
              </Navbar>
              <Stack gap="xs">{scrollFill}</Stack>
            </Box>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">Colors</Title>
          <Text color="neutral">
            El color semántico define <code>--navbar-bg</code> / <code>--navbar-fg</code>; los slots heredan
            <code> currentColor</code>.
          </Text>
          <Stack gap="md">
            {['base', 'primary', 'neutral', 'secondary', 'accent'].map((c) => (
              <Navbar key={c} color={c} size="sm" className={c === 'base' ? surface : undefined}>
                <NavbarStart><NavbarBrand onclick={(e) => e.preventDefault()}>{c}</NavbarBrand></NavbarStart>
                <NavbarEnd>
                  <NavbarLink href="#!" active>Home</NavbarLink>
                </NavbarEnd>
              </Navbar>
            ))}
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">Sizes</Title>
          <Stack gap="md">
            {['sm', 'md', 'lg'].map((s) => (
              <Navbar key={s} size={s} className={surface}>
                <NavbarStart><NavbarBrand onclick={(e) => e.preventDefault()}>size {s}</NavbarBrand></NavbarStart>
                <NavbarEnd><Button color="primary" size="sm">Action</Button></NavbarEnd>
              </Navbar>
            ))}
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">Border &amp; shadow</Title>
          <Grid cols={2} gap="md">
            <Cell><Navbar className={surface} border><NavbarBrand onclick={(e) => e.preventDefault()}>border</NavbarBrand></Navbar></Cell>
            <Cell><Navbar className={surface} shadow="sm"><NavbarBrand onclick={(e) => e.preventDefault()}>shadow sm</NavbarBrand></Navbar></Cell>
            <Cell><Navbar className={surface} shadow="md"><NavbarBrand onclick={(e) => e.preventDefault()}>shadow md</NavbarBrand></Navbar></Cell>
            <Cell><Navbar className={surface} border shadow="lg"><NavbarBrand onclick={(e) => e.preventDefault()}>border + lg</NavbarBrand></Navbar></Cell>
          </Grid>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">Glass</Title>
          <Text color="neutral">
            <code>glass</code> vuelve el fondo translúcido y aplica <code>backdrop-filter: blur()</code> —
            aquí sobre un degradado de color.
          </Text>
          <Box className={css({
            position: 'relative',
            borderRadius: 'var(--radius-box)',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, token(colors.primary), token(colors.accent))',
            paddingTop: '4rem',
          })}>
            <Navbar glass className={css({ position: 'absolute', top: 0, left: 0, right: 0 })}>
              <NavbarStart><NavbarBrand onclick={(e) => e.preventDefault()}>glass</NavbarBrand></NavbarStart>
              <NavbarEnd>
                <NavbarLink href="#!" active>Home</NavbarLink>
                <Button color="primary" size="sm">Action</Button>
              </NavbarEnd>
            </Navbar>
            <Box className={css({ padding: '1.5rem', color: 'white' })}>
              <Title as="h3" size="4">Content over gradient</Title>
              <Text className={css({ color: 'white', opacity: 0.9 })}>
                The navbar above blurs everything behind it. The <code>glass</code> background is the
                semantic color at 75% opacity.
              </Text>
            </Box>
          </Box>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">Container</Title>
          <Text color="neutral">
            <code>container</code> centra el contenido con max-width (<code>--navbar-max-w</code>,
            default 80rem) — aquí reducido a 32rem para verlo.
          </Text>
          <Navbar container border className={surface} style={{ '--navbar-max-w': '32rem' }}>
            <NavbarStart><NavbarBrand onclick={(e) => e.preventDefault()}>panda-ui</NavbarBrand></NavbarStart>
            <NavbarEnd><Button color="primary" size="sm">Get Started</Button></NavbarEnd>
          </Navbar>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">Responsive — toggle + drawer</Title>
          <Text color="neutral">
            <code>NavbarMenu</code> es el grupo de links de escritorio (oculto &lt;768px) y
            <code> NavbarToggle</code> es la hamburguesa solo móvil (oculta ≥768px). El patrón móvil de
            esta librería empareja el toggle con el <code>Drawer</code>. Prueba con el viewport en móvil.
          </Text>
          <Navbar className={surface} border>
            <NavbarStart>
              <NavbarToggle open={vnode.state.navOpen} onclick={() => { vnode.state.navOpen = true }} />
              <NavbarBrand onclick={(e) => e.preventDefault()}>panda-ui</NavbarBrand>
            </NavbarStart>
            <NavbarCenter>
              <NavbarMenu>
                <NavbarLink href="#!" active>Home</NavbarLink>
                <NavbarLink href="#!">Docs</NavbarLink>
                <NavbarLink href="#!">Blog</NavbarLink>
              </NavbarMenu>
            </NavbarCenter>
            <NavbarEnd>
              <Button color="primary" size="sm">Get Started</Button>
            </NavbarEnd>
          </Navbar>

          <Drawer
            position="start"
            size="xs"
            open={vnode.state.navOpen}
            onclose={() => { vnode.state.navOpen = false }}
          >
            <DrawerBox>
              <DrawerHeader><h3>Menu</h3></DrawerHeader>
              <DrawerBody>
                <Menu>
                  <MenuTitle>General</MenuTitle>
                  <MenuItem onclick={() => { vnode.state.navOpen = false }}>Home</MenuItem>
                  <MenuItem onclick={() => { vnode.state.navOpen = false }}>Docs</MenuItem>
                  <MenuItem onclick={() => { vnode.state.navOpen = false }}>Blog</MenuItem>
                </Menu>
              </DrawerBody>
            </DrawerBox>
            <DrawerBackdrop onclick={() => { vnode.state.navOpen = false }} />
          </Drawer>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <Tabs defaultActive="jsx" lifted size="lg">
            <Tab ref="jsx">Jsx</Tab>
            <Tab ref="js">Js</Tab>
            <TabContent ref="jsx">
              <CodeExample type="jsx" code={usageCodeJsx} />
            </TabContent>
            <TabContent ref="js">
              <CodeExample type="javascript" code={usageCodeJavascript} />
            </TabContent>
          </Tabs>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={tableToRows(table)} />
        </Block>
      </Stack>
    )
  }
}
