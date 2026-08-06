import m from 'mithril'
import { css } from '../styled-system/css'
import '@fontsource/ubuntu/400.css'
import '@fontsource/ubuntu/500.css'
import '@fontsource/ubuntu/700.css'
import '@fontsource/ubuntu/400-italic.css'
import '@fontsource/ubuntu-mono/400.css'
import 'highlight.js/styles/atom-one-dark-reasonable.css'
import './style.css'

import { Navbar } from './components/Navbar.jsx'
import { Sidebar } from './components/Sidebar.jsx'
import { SearchModal } from './components/SearchModal.jsx'
import { t, currentLang, setLang } from './i18n/index.js'
// Named exports (these pages use export const, not export default)
import { Landing } from './pages/landing/index.jsx'
import { ComponentPage } from './pages/componentpage/index.jsx'

// Default exports (these pages use export default)
import Accordion from './pages/accordion/index.jsx'
import Alert from './pages/alert/index.jsx'
import Aura from './pages/aura/index.jsx'
import Avatar from './pages/avatar/index.jsx'
import Badge from './pages/badge/index.jsx'
import Breadcrumbs from './pages/breadcrumbs/index.jsx'
import ButtonGroup from './pages/buttongroup/index.jsx'
import ButtonClose from './pages/buttonclose/index.jsx'
import Button from './pages/button/index.jsx'
import Calendar from './pages/calendar/index.jsx'
import Card from './pages/card/index.jsx'
import Carousel from './pages/carousel/index.jsx'
import Chat from './pages/chat/index.jsx'
import Checkbox from './pages/checkbox/index.jsx'
import Collapse from './pages/collapse/index.jsx'
import Countdown from './pages/countdown/index.jsx'
import Diff from './pages/diff/index.jsx'
import Divider from './pages/divider/index.jsx'
import FAB from './pages/fab/index.jsx'
import Fieldset from './pages/fieldset/index.jsx'
import FileInput from './pages/fileinput/index.jsx'
import Filter from './pages/filter/index.jsx'
import Footer from './pages/footer/index.jsx'
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
import Textarea from './pages/textarea/index.jsx'
import ThemeController from './pages/themecontroller/index.jsx'
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
  '/breadcrumbs':Breadcrumbs,
  '/button':Button,
  '/buttonclose':ButtonClose,
  '/buttongroup':ButtonGroup,
  '/calendar':Calendar,
  '/card':Card,
  '/carousel':Carousel,
  '/chat':Chat,
  '/checkbox':Checkbox,
  '/collapse':Collapse,
  '/componentpage':ComponentPage,
  '/countdown':Countdown,
  '/diff':Diff,
  '/divider':Divider,
  '/fab':FAB,
  '/fieldset':Fieldset,
  '/fileinput':FileInput,
  '/filter':Filter,
  '/footer':Footer,
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
  '/textarea': Textarea,
  '/themectrl': ThemeController,
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

// Layout component - mounted once on body, persists across route changes
const Layout = {
  oninit(vnode) {
    vnode.state.isMobileOpen = false
    vnode.state.isSearchOpen = false
    vnode.state.isDark = getSavedTheme() === 'dark'
  },

  oncreate(vnode) {
    m.route.prefix = '#!'
    m.route(document.getElementById('view-dynamic-content'), '/', routes)

    // Ensure language param exists in the URL
    const lang = currentLang()
    if (!m.route.param('lang')) {
      m.route.set(m.route.get(), {}, { ...m.route.param(), lang })
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
    return (
      <div className={css({ display: 'flex', height: '100vh', overflow: 'hidden' })}>
        <Sidebar
          isMobileOpen={vnode.state.isMobileOpen}
          onMobileClose={() => { vnode.state.isMobileOpen = false }}
        />

        <div className={css({ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 })}>
          <Navbar
            onSearchOpen={() => { vnode.state.isSearchOpen = true }}
            onToggleSidebar={() => { vnode.state.isMobileOpen = !vnode.state.isMobileOpen }}
            isDark={vnode.state.isDark}
            onToggleTheme={(theme) => {
              const next = theme || 'light'
              vnode.state.isDark = next === 'dark'
              document.documentElement.setAttribute('data-theme', next)
              setSavedTheme(next)
            }}
          />

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
