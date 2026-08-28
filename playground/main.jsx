import m from 'mithril'
import { css } from '../styled-system/css'
import './style.css'

import { Sidebar } from './components/Sidebar.jsx'
import { SearchModal } from './components/SearchModal.jsx'
import { t, currentLang, setLang } from './i18n/index.js'
import { Search, ExternalLink, Sun, Moon } from 'lucide-mithril'
// Alias Pum*: Button/Kbd/Swap colisionan con los imports de páginas de abajo.
import {
  Navbar, NavbarStart, NavbarCenter, NavbarEnd, NavbarBrand, NavbarToggle,
  Button as PumButton, Kbd as PumKbd, Swap as PumSwap, setLocale as PumSetLocale
} from '../src/index.js'
// Named exports (these pages use export const, not export default)
import { Landing } from './pages/landing/index.jsx'
import { ComponentPage } from './pages/componentpage/index.jsx'

// Default exports (these pages use export default)
import Accordion from './pages/accordion/index.jsx'
import Alert from './pages/alert/index.jsx'
import Aura from './pages/aura/index.jsx'
import Avatar from './pages/avatar/index.jsx'
import Badge from './pages/badge/index.jsx'
import BlockPage from './pages/block/index.jsx'
import BoxPage from './pages/box/index.jsx'
import Breadcrumbs from './pages/breadcrumbs/index.jsx'
import ButtonGroup from './pages/buttongroup/index.jsx'
import ButtonClose from './pages/buttonclose/index.jsx'
import ButtonCopy from './pages/buttoncopy/index.jsx'
import Button from './pages/button/index.jsx'
import Calendar from './pages/calendar/index.jsx'
import Card from './pages/card/index.jsx'
import Carousel from './pages/carousel/index.jsx'
import Chat from './pages/chat/index.jsx'
import Checkbox from './pages/checkbox/index.jsx'
import Collapse from './pages/collapse/index.jsx'
import ColumnPage from './pages/columns/index.jsx'
import ContainerPage from './pages/container/index.jsx'
import Countdown from './pages/countdown/index.jsx'
import Diff from './pages/diff/index.jsx'
import Divider from './pages/divider/index.jsx'
import Dropdown from './pages/dropdown/index.jsx'
import Drawer from './pages/drawer/index.jsx'
import FAB from './pages/fab/index.jsx'
import Fieldset from './pages/fieldset/index.jsx'
import FileInput from './pages/fileinput/index.jsx'
import Filter from './pages/filter/index.jsx'
import Footer from './pages/footer/index.jsx'
import GridPage from './pages/grid/index.jsx'
import Hero from './pages/hero/index.jsx'
import Indicator from './pages/indicator/index.jsx'
import Input from './pages/input/index.jsx'
import Join from './pages/join/index.jsx'
import Kbd from './pages/kbd/index.jsx'
import Label from './pages/label/index.jsx'
import Link from './pages/link/index.jsx'
import List from './pages/list/index.jsx'
import Loading from './pages/loading/index.jsx'
import Mask from './pages/mask/index.jsx'
import Megamenu from './pages/megamenu/index.jsx'
import Menu from './pages/menu/index.jsx'
import Modal from './pages/modal/index.jsx'
import NavbarPage from './pages/navbar/index.jsx'
import OTP from './pages/otp/index.jsx'
import Pagination from './pages/pagination/index.jsx'
import Progress from './pages/progress/index.jsx'
import RadialProgress from './pages/radialprogress/index.jsx'
import Radio from './pages/radio/index.jsx'
import Range from './pages/range/index.jsx'
import Rating from './pages/rating/index.jsx'
import RatingGroupPage from './pages/ratinggroup/index.jsx'
import Select from './pages/select/index.jsx'
import Skeleton from './pages/skeleton/index.jsx'
import Stack from './pages/stack/index.jsx'
import Stat from './pages/stat/index.jsx'
import Status from './pages/status/index.jsx'
import Steps from './pages/steps/index.jsx'
import Swap from './pages/swap/index.jsx'
import TagPage from './pages/tag/index.jsx'
import Table from './pages/table/index.jsx'
import Tabs from './pages/tabs/index.jsx'
import TextPage from './pages/text/index.jsx'
import Textarea from './pages/textarea/index.jsx'
import ThemeController from './pages/themecontroller/index.jsx'
import TitlePage from "./pages/title/index.jsx"
import Timeline from './pages/timeline/index.jsx'
import Toast from './pages/toast/index.jsx'
import Toggle from './pages/toggle/index.jsx'
import Tooltip from './pages/tooltip/index.jsx'



// Build routes - only page components, no layout wrapper
const routes = {
  '/': Landing,
  '/accordion': Accordion,
  '/alert': Alert,
  '/aura': Aura,
  '/avatar': Avatar,
  '/badge': Badge,
  '/block': BlockPage,
  '/box': BoxPage,
  '/breadcrumbs':Breadcrumbs,
  '/button':Button,
  '/buttonclose':ButtonClose,
  '/buttoncopy':ButtonCopy,
  '/buttongroup':ButtonGroup,
  '/calendar':Calendar,
  '/card':Card,
  '/carousel':Carousel,
  '/chat':Chat,
  '/checkbox':Checkbox,
  '/collapse':Collapse,
  '/columns':ColumnPage,
  '/container':ContainerPage,
  '/componentpage':ComponentPage,
  '/countdown':Countdown,
  '/diff':Diff,
  '/divider':Divider,
  '/dropdown':Dropdown,
  '/drawer':Drawer,
  '/fab':FAB,
  '/fieldset':Fieldset,
  '/fileinput':FileInput,
  '/filter':Filter,
  '/footer':Footer,
  '/grid': GridPage,
  '/hero':Hero,
  '/indicator':Indicator,
  '/input':Input,
  '/join':Join,
  '/kbd':Kbd,
  '/label':Label,
  '/link':Link,
  '/list':List,
  '/loading':Loading,
  '/mask':Mask,
  '/megamenu':Megamenu,
  '/menu':Menu,
  '/modal':Modal,
  '/navbar':NavbarPage,
  '/otp':OTP,
  '/pagination':Pagination,
  '/progress':Progress,
  '/radialprogress':RadialProgress,
  '/radio':Radio,
  '/range': Range,
  '/rating': Rating,
  '/ratinggroup': RatingGroupPage,
  '/select': Select,
  '/skeleton': Skeleton,
  '/stack': Stack,
  '/stat': Stat,
  '/status': Status,
  '/steps': Steps,
  '/swap': Swap,
  '/tag': TagPage,
  '/table': Table,
  '/tabs': Tabs,
  '/text': TextPage,
  '/textarea': Textarea,
  '/themectrl': ThemeController,
  '/title': TitlePage,
  '/timeline': Timeline,
  '/toast': Toast,
  '/toggle': Toggle,
  '/tooltip': Tooltip,
}

routes['/:component...'] = {
  render: () => m(Landing)
}

// Theme persistence
const getSavedTheme = () => localStorage.getItem('panda-ui-theme') || 'light'
const setSavedTheme = (theme) => localStorage.setItem('panda-ui-theme', theme)

// Apply saved theme before mount
const savedTheme = getSavedTheme()
document.documentElement.setAttribute('data-theme', savedTheme)

// Scroll container for the routed page content. Kept in Panda css() so the
// layout lives with the Layout component; the id is the m.route mount target.
// All padding (incl. the bottom space) lives on the inner content wrapper, not
// on this scroller: Firefox excludes a scroll container's own padding from the
// scrollable overflow, but a plain block's padding is content everywhere.
const mainStyles = css({
  flex: '1',
  overflowY: 'auto',
  marginLeft: '260px',
  marginTop: '64px',
  minHeight: 'calc(100vh - 64px)',
  '@media (max-width: 768px)': {
    marginLeft: '0',
  },
})

// Inner wrapper that receives the routed page; its padding is scrollable
// content in every engine (unlike scroll-container padding in Firefox).
const contentStyles = css({
  padding: '2rem 3rem 3rem',
  '@media (max-width: 768px)': {
    padding: '1.5rem 1.5rem 3rem',
  },
})

// Navbar del shell — composición 100% con componentes de la librería
// (src/components/Navbar). El position fixed, z-index, tamaño y borde vienen
// de las variantes del recipe; aquí solo queda el look específico del shell
// (grid de 3 zonas, altura fija y fondo base-200).
const navbarFixed = css({
  height: '64px',
  minHeight: '64px',
  background: 'token(colors.base-200)',
  padding: '0 1rem',
})

const navbarGrid = { display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center' }

const themeLabel = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.375rem',
  padding: '0 0.375rem',
})

const searchButtonLabel = css({ fontFamily: 'monospace', fontWeight: '700', fontSize: '0.7rem' })

// Layout component - mounted once on body, persists across route changes
const Layout = {
  oninit(vnode) {
    vnode.state.isMobileOpen = false
    vnode.state.isSearchOpen = false
    vnode.state.isDark = getSavedTheme() === 'dark'
    vnode.state._prevRoute = null
  },

  oncreate(vnode) {
    m.route.prefix = '#!'
    m.route(document.getElementById('view-dynamic-content'), '/', routes)

    // Ensure language param exists in the URL
    const lang = currentLang()
    if (!m.route.param('lang')) {
      m.route.set(m.route.get(), {}, { ...m.route.param(), lang })
    }

    // Detect route changes; scroll to top and update title
    vnode.state._scrollOnRoute = () => {
      const current = m.route.get()
      if (vnode.state._prevRoute && vnode.state._prevRoute !== current) {
        const el = document.getElementById('view-dynamic')
        if (el) el.scrollTop = 0
      }
      vnode.state._prevRoute = current

      // Set document title based on route
      const pageTitles = {
        '/': 'PUM — Mithril.js UI Components',
        '/accordion': 'Accordion — PUM', '/alert': 'Alert — PUM',
        '/avatar': 'Avatar — PUM', '/badge': 'Badge — PUM', '/block': 'Block — PUM',
        '/box': 'Box — PUM', '/breadcrumbs': 'Breadcrumbs — PUM', '/button': 'Button — PUM',
        '/buttonclose': 'ButtonClose — PUM', '/buttongroup': 'ButtonGroup — PUM',
        '/buttoncopy': 'ButtonCopy — PUM',
        '/calendar': 'Calendar — PUM', '/card': 'Card — PUM', '/carousel': 'Carousel — PUM',
        '/chat': 'Chat — PUM', '/checkbox': 'Checkbox — PUM', '/collapse': 'Collapse — PUM',
        '/columns': 'Columns — PUM', '/container': 'Container — PUM',
        '/countdown': 'Countdown — PUM', '/diff': 'Diff — PUM', '/divider': 'Divider — PUM', '/dropdown': 'Dropdown — PUM', '/drawer': 'Drawer — PUM',
        '/fab': 'FAB — PUM', '/fieldset': 'Fieldset — PUM', '/fileinput': 'FileInput — PUM',
        '/filter': 'Filter — PUM', '/footer': 'Footer — PUM', '/grid': 'Grid — PUM',
        '/hero': 'Hero — PUM', '/indicator': 'Indicator — PUM', '/input': 'Input — PUM',
        '/join': 'Join — PUM', '/kbd': 'Kbd — PUM', '/label': 'Label — PUM',
        '/link': 'Link — PUM', '/list': 'List — PUM', '/loading': 'Loading — PUM',
        '/mask': 'Mask — PUM', '/megamenu': 'Megamenu — PUM', '/menu': 'Menu — PUM',
        '/modal': 'Modal — PUM', '/navbar': 'Navbar — PUM', '/otp': 'OTP — PUM',
        '/pagination': 'Pagination — PUM', '/progress': 'Progress — PUM',
        '/radialprogress': 'RadialProgress — PUM', '/radio': 'Radio — PUM',
        '/range': 'Range — PUM', '/rating': 'Rating — PUM', '/ratinggroup': 'RatingGroup — PUM',
        '/select': 'Select — PUM', '/skeleton': 'Skeleton — PUM', '/stack': 'Stack — PUM',
        '/stat': 'Stat — PUM', '/status': 'Status — PUM', '/steps': 'Steps — PUM',
        '/swap': 'Swap — PUM', '/tag': 'Tag — PUM', '/table': 'Table — PUM',
        '/tabs': 'Tabs — PUM', '/text': 'Text — PUM', '/textarea': 'Textarea — PUM', '/themectrl': 'ThemeController — PUM',
        '/title': 'Title — PUM', '/timeline': 'Timeline — PUM',
        '/toast': 'Toast — PUM', '/toggle': 'Toggle — PUM', '/tooltip': 'Tooltip — PUM',
      }
      document.title = pageTitles[current] || 'PUM — Mithril.js UI Components'
    }

    vnode.state.onKeydown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        vnode.state.isSearchOpen = true
        m.redraw()
      }
    }
    window.addEventListener('keydown', vnode.state.onKeydown)
  },

  onremove(vnode) {
    window.removeEventListener('keydown', vnode.state.onKeydown)
  },

  view(vnode) {
    vnode.state._scrollOnRoute?.()
    return (
      <div className={css({ display: 'flex', height: '100vh', overflow: 'hidden' })}>
        <Sidebar
          isMobileOpen={vnode.state.isMobileOpen}
          onMobileClose={() => { vnode.state.isMobileOpen = false }}
        />

        <div className={css({ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 })}>
          <Navbar position="fixed" size="md" border className={navbarFixed} style={navbarGrid}>
            <NavbarStart className={css({ gap: '0.5rem' })} style={{ width: 'auto' }}>
              <NavbarToggle
                open={vnode.state.isMobileOpen}
                onclick={() => { vnode.state.isMobileOpen = !vnode.state.isMobileOpen }}
              />
              <NavbarBrand
                href="#/"
                onclick={(e) => { e.preventDefault(); m.route.set('/') }}
              >
                PUM
              </NavbarBrand>
            </NavbarStart>

            <NavbarCenter className={css({ display: 'flex', justifyContent: 'center' })} style={{ width: 'auto' }}>
              <PumButton onclick={() => { vnode.state.isSearchOpen = true }}>
                <Search size={16} className={css({ opacity: 0.5 })} />
                <span>{t('common.searchPlaceholder')}&nbsp;&nbsp;&nbsp;</span>
                <PumKbd size="sm" className={css({ marginLeft: 'auto' })}>⌘K</PumKbd>
              </PumButton>
            </NavbarCenter>

            <NavbarEnd className={css({ gap: '0.25rem' })} style={{ width: 'auto' }}>
              <PumButton variant="ghost" size="sm" href="https://www.npmjs.com/package/panda-ui-mithril" target="_blank" className={css({ display: { base: 'none', md: 'inline-flex' } })}>
                npm <ExternalLink size={14} className={css({ opacity: 0.5 })} />
              </PumButton>

              <PumButton variant="ghost" size="sm" href="https://github.com/carlos-sweb/panda-ui-mithril" target="_blank" className={css({ display: { base: 'none', md: 'inline-flex' } })}>
                GitHub <ExternalLink size={14} className={css({ opacity: 0.5 })} />
              </PumButton>

              <label className={themeLabel} title={vnode.state.isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
                      <PumSwap
                  checked={vnode.state.isDark}
                  onchange={(checked) => {
                    const next = checked ? 'dark' : 'light'
                    vnode.state.isDark = checked
                    document.documentElement.setAttribute('data-theme', next)
                    setSavedTheme(next)
                  }}
                  on={<Sun size={24} />}
                  off={<Moon size={24} />}
                />
              </label>

                  <PumButton
                variant="ghost"
                size="sm"
                onclick={() => { const next = currentLang() === 'es' ? 'en' : 'es'; PumSetLocale(next); setLang(next) }}
                className={searchButtonLabel}
              >
                {currentLang() === 'es' ? 'EN' : 'ES'}
              </PumButton>
            </NavbarEnd>
          </Navbar>

          <main id="view-dynamic" className={mainStyles}>
            <div id="view-dynamic-content" className={contentStyles} />
          </main>
        </div>

        <SearchModal
          open={vnode.state.isSearchOpen}
          onclose={() => { vnode.state.isSearchOpen = false }}
        />
      </div>
    )
  }
}

// Mount layout once on body - never re-mounts
m.mount(document.body, Layout)
