import m from 'mithril'
import { css } from '../../styled-system/css'
import { Search, ArrowRight, X } from 'lucide-mithril'
import { Modal, ModalBox, ModalBackdrop, Button } from '../../src/index.js'
import { t } from '../i18n/index.js'

const allComponents = [
  { name: 'accordion', category: 'Layout', route: '/accordion' },
  { name: 'alert', category: 'Feedback', route: '/alert' },
  { name: 'aura', category: 'Feedback', route: '/aura' },
  { name: 'avatar', category: 'Data Display', route: '/avatar' },
  { name: 'badge', category: 'Data Display', route: '/badge' },
  { name: 'breadcrumbs', category: 'Navigation', route: '/breadcrumbs' },
  { name: 'button', category: 'Actions', route: '/button' },
  { name: 'calendar', category: 'Data Input', route: '/calendar' },
  { name: 'card', category: 'Data Display', route: '/card' },
  { name: 'carousel', category: 'Layout', route: '/carousel' },
  { name: 'chat', category: 'Data Display', route: '/chat' },
  { name: 'checkbox', category: 'Data Input', route: '/checkbox' },
  { name: 'collapse', category: 'Layout', route: '/collapse' },
  { name: 'countdown', category: 'Data Display', route: '/countdown' },
  { name: 'diff', category: 'Layout', route: '/diff' },
  { name: 'divider', category: 'Layout', route: '/divider' },
  { name: 'fab', category: 'Actions', route: '/fab' },
  { name: 'fieldset', category: 'Data Input', route: '/fieldset' },
  { name: 'fileinput', category: 'Data Input', route: '/fileinput' },
  { name: 'filter', category: 'Actions', route: '/filter' },
  { name: 'footer', category: 'Navigation', route: '/footer' },
  { name: 'hero', category: 'Layout', route: '/hero' },
  { name: 'indicator', category: 'Feedback', route: '/indicator' },
  { name: 'input', category: 'Data Input', route: '/input' },
  { name: 'join', category: 'Layout', route: '/join' },
  { name: 'kbd', category: 'Data Display', route: '/kbd' },
  { name: 'label', category: 'Data Input', route: '/label' },
  { name: 'link', category: 'Actions', route: '/link' },
  { name: 'list', category: 'Data Display', route: '/list' },
  { name: 'loading', category: 'Feedback', route: '/loading' },
  { name: 'mask', category: 'Data Display', route: '/mask' },
  { name: 'megamenu', category: 'Navigation', route: '/megamenu' },
  { name: 'menu', category: 'Navigation', route: '/menu' },
  { name: 'modal', category: 'Feedback', route: '/modal' },
  { name: 'navbar', category: 'Navigation', route: '/navbar' },
  { name: 'otp', category: 'Data Input', route: '/otp' },
  { name: 'pagination', category: 'Navigation', route: '/pagination' },
  { name: 'progress', category: 'Feedback', route: '/progress' },
  { name: 'radialprogress', category: 'Feedback', route: '/radialprogress' },
  { name: 'radio', category: 'Data Input', route: '/radio' },
  { name: 'range', category: 'Data Input', route: '/range' },
  { name: 'rating', category: 'Data Input', route: '/rating' },
  { name: 'select', category: 'Data Input', route: '/select' },
  { name: 'skeleton', category: 'Feedback', route: '/skeleton' },
  { name: 'stack', category: 'Layout', route: '/stack' },
  { name: 'stat', category: 'Data Display', route: '/stat' },
  { name: 'status', category: 'Feedback', route: '/status' },
  { name: 'steps', category: 'Navigation', route: '/steps' },
  { name: 'swap', category: 'Actions', route: '/swap' },
  { name: 'table', category: 'Data Display', route: '/table' },
  { name: 'tabs', category: 'Navigation', route: '/tabs' },
  { name: 'tag', category: 'Data Display', route: '/tag' },
  { name: 'textarea', category: 'Data Input', route: '/textarea' },
  { name: 'themectrl', category: 'Actions', route: '/themectrl' },
  { name: 'timeline', category: 'Data Display', route: '/timeline' },
  { name: 'toast', category: 'Feedback', route: '/toast' },
  { name: 'toggle', category: 'Data Input', route: '/toggle' },
  { name: 'tooltip', category: 'Feedback', route: '/tooltip' },
]

const categoryKey = (cat) => {
  const map = { 'Actions': 'sidebar.categories.actions', 'Data Display': 'sidebar.categories.dataDisplay', 'Navigation': 'sidebar.categories.navigation', 'Feedback': 'sidebar.categories.feedback', 'Data Input': 'sidebar.categories.dataInput', 'Layout': 'sidebar.categories.layout', 'Mockup': 'sidebar.categories.mockup' }
  return map[cat] || cat
}

const modalBox = css({
  width: '100%',
  maxWidth: '560px',
  maxHeight: '70vh',
  padding: '0',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
})

const searchInput = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  padding: '1rem 1.25rem',
  borderBottom: '1px solid',
  borderColor: 'token(colors.base-300)',
})

const input = css({
  flex: 1,
  border: 'none',
  background: 'transparent',
  outline: 'none',
  fontSize: '1rem',
  color: 'token(colors.base-content)',
  fontFamily: 'inherit',
})

const resultsList = css({
  flex: 1,
  overflowY: 'auto',
  padding: '0.5rem',
})

const resultItem = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0.75rem 1rem',
  borderRadius: '0.5rem',
  cursor: 'pointer',
  textDecoration: 'none',
  color: 'token(colors.base-content)',
  transition: 'background 0.1s',
  _hover: { background: 'token(colors.base-200)' },
})

const categoryBadge = css({
  fontSize: '0.6875rem',
  padding: '0.125rem 0.5rem',
  borderRadius: '9999px',
  background: 'token(colors.base-200)',
  color: 'token(colors.base-content)',
  opacity: 0.6,
})

const emptyState = css({
  padding: '3rem 1.5rem',
  textAlign: 'center',
  color: 'token(colors.base-content)',
  opacity: 0.5,
})

export const SearchModal = {
  oninit(vnode) {
    vnode.state.query = ''
    vnode.state.selectedIndex = 0
    vnode.state.wasOpen = vnode.attrs.open
  },

  onbeforeupdate(vnode) {
    // Reset search state whenever the modal transitions from closed -> open,
    // since it now stays mounted permanently (driven by `open`) instead of
    // being created fresh each time it's shown.
    if (vnode.attrs.open && !vnode.state.wasOpen) {
      vnode.state.query = ''
      vnode.state.selectedIndex = 0
    }
    vnode.state.wasOpen = vnode.attrs.open
  },

  view(vnode) {
    const { open, onclose } = vnode.attrs
    const query = vnode.state.query.toLowerCase()
    const filtered = query
      ? allComponents.filter(c => c.name.includes(query) || c.category.toLowerCase().includes(query))
      : allComponents

    const grouped = {}
    filtered.forEach(c => {
      if (!grouped[c.category]) grouped[c.category] = []
      grouped[c.category].push(c)
    })

    return (
      <Modal open={open} onclose={onclose}>
        <ModalBox className={modalBox}>
          <div className={searchInput}>
            <Search size={20} className={css({ opacity: 0.5 })} />
            <input
              className={input}
              type="text"
              placeholder={t('common.searchPlaceholder')}
              autofocus
              value={vnode.state.query}
              oninput={(e) => { vnode.state.query = e.target.value; vnode.state.selectedIndex = 0 }}
              onkeydown={(e) => {
                if (e.key === 'ArrowDown') {
                  e.preventDefault()
                  vnode.state.selectedIndex = Math.min(vnode.state.selectedIndex + 1, filtered.length - 1)
                }
                if (e.key === 'ArrowUp') {
                  e.preventDefault()
                  vnode.state.selectedIndex = Math.max(vnode.state.selectedIndex - 1, 0)
                }
                if (e.key === 'Enter' && filtered[vnode.state.selectedIndex]) {
                  m.route.set(filtered[vnode.state.selectedIndex].route)
                  onclose()
                }
              }}
            />
            <Button variant="ghost" square size="sm" onclick={onclose}>
              <X size={14} />
            </Button>
          </div>

          <div className={resultsList}>
            {filtered.length === 0 ? (
              <div className={emptyState}>{t('common.noResults')}</div>
            ) : (
              Object.entries(grouped).map(([category, items]) => (
                <div key={category}>
                  <div className={css({ padding: '0.5rem 1rem 0.25rem', fontSize: '0.6875rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.4 })}>
                    {t(categoryKey(category))}
                  </div>
                  {items.map((comp) => {
                    const globalIndex = filtered.indexOf(comp)
                    return (
                      <a
                        key={comp.name}
                        href={`#${comp.route}`}
                        className={globalIndex === vnode.state.selectedIndex ? `${resultItem} ${css({ background: 'token(colors.base-200)' })}` : resultItem}
                        onclick={(e) => {
                          e.preventDefault()
                          m.route.set(comp.route)
                          onclose()
                        }}
                      >
                        <span className={css({ fontWeight: '500' })}>{comp.name.charAt(0).toUpperCase() + comp.name.slice(1)}</span>
                        <ArrowRight size={14} className={css({ opacity: 0.3 })} />
                      </a>
                    )
                  })}
                </div>
              ))
            )}
          </div>

          <div className={css({ padding: '0.75rem 1.25rem', borderTop: '1px solid', borderColor: 'token(colors.base-300)', display: 'flex', gap: '1rem', fontSize: '0.75rem', opacity: 0.5 })}>
            <span>{t('common.searchNavigate')}</span>
            <span>{t('common.searchOpen')}</span>
            <span>{t('common.searchClose')}</span>
          </div>
        </ModalBox>
        <ModalBackdrop onclick={onclose} />
      </Modal>
    )
  }
}
