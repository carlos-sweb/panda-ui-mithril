import m from 'mithril'
import { css } from '../../styled-system/css'
import { Search, ArrowRight, X } from 'lucide-mithril'

const allComponents = [
  { name: 'button', category: 'Actions', route: '/button' },
  { name: 'fab', category: 'Actions', route: '/fab' },
  { name: 'link', category: 'Actions', route: '/link' },
  { name: 'swap', category: 'Actions', route: '/swap' },
  { name: 'filter', category: 'Actions', route: '/filter' },
  { name: 'themectrl', category: 'Actions', route: '/themectrl' },
  { name: 'badge', category: 'Data Display', route: '/badge' },
  { name: 'avatar', category: 'Data Display', route: '/avatar' },
  { name: 'card', category: 'Data Display', route: '/card' },
  { name: 'list', category: 'Data Display', route: '/list' },
  { name: 'table', category: 'Data Display', route: '/table' },
  { name: 'stat', category: 'Data Display', route: '/stat' },
  { name: 'timeline', category: 'Data Display', route: '/timeline' },
  { name: 'countdown', category: 'Data Display', route: '/countdown' },
  { name: 'chat', category: 'Data Display', route: '/chat' },
  { name: 'mask', category: 'Data Display', route: '/mask' },
  { name: 'kbd', category: 'Data Display', route: '/kbd' },
  { name: 'navbar', category: 'Navigation', route: '/navbar' },
  { name: 'breadcrumbs', category: 'Navigation', route: '/breadcrumbs' },
  { name: 'menu', category: 'Navigation', route: '/menu' },
  { name: 'tabs', category: 'Navigation', route: '/tabs' },
  { name: 'pagination', category: 'Navigation', route: '/pagination' },
  { name: 'steps', category: 'Navigation', route: '/steps' },
  { name: 'megamenu', category: 'Navigation', route: '/megamenu' },
  { name: 'footer', category: 'Navigation', route: '/footer' },
  { name: 'alert', category: 'Feedback', route: '/alert' },
  { name: 'toast', category: 'Feedback', route: '/toast' },
  { name: 'modal', category: 'Feedback', route: '/modal' },
  { name: 'tooltip', category: 'Feedback', route: '/tooltip' },
  { name: 'loading', category: 'Feedback', route: '/loading' },
  { name: 'skeleton', category: 'Feedback', route: '/skeleton' },
  { name: 'progress', category: 'Feedback', route: '/progress' },
  { name: 'radialprogress', category: 'Feedback', route: '/radialprogress' },
  { name: 'status', category: 'Feedback', route: '/status' },
  { name: 'indicator', category: 'Feedback', route: '/indicator' },
  { name: 'aura', category: 'Feedback', route: '/aura' },
  { name: 'input', category: 'Data Input', route: '/input' },
  { name: 'textarea', category: 'Data Input', route: '/textarea' },
  { name: 'select', category: 'Data Input', route: '/select' },
  { name: 'checkbox', category: 'Data Input', route: '/checkbox' },
  { name: 'radio', category: 'Data Input', route: '/radio' },
  { name: 'toggle', category: 'Data Input', route: '/toggle' },
  { name: 'range', category: 'Data Input', route: '/range' },
  { name: 'fileinput', category: 'Data Input', route: '/fileinput' },
  { name: 'otp', category: 'Data Input', route: '/otp' },
  { name: 'rating', category: 'Data Input', route: '/rating' },
  { name: 'calendar', category: 'Data Input', route: '/calendar' },
  { name: 'fieldset', category: 'Data Input', route: '/fieldset' },
  { name: 'label', category: 'Data Input', route: '/label' },
  { name: 'hero', category: 'Layout', route: '/hero' },
  { name: 'divider', category: 'Layout', route: '/divider' },
  { name: 'stack', category: 'Layout', route: '/stack' },
  { name: 'join', category: 'Layout', route: '/join' },
  { name: 'accordion', category: 'Layout', route: '/accordion' },
  { name: 'collapse', category: 'Layout', route: '/collapse' },
  { name: 'carousel', category: 'Layout', route: '/carousel' },
  { name: 'diff', category: 'Layout', route: '/diff' },
]

const overlay = css({
  position: 'fixed',
  inset: 0,
  background: 'oklch(0% 0 0 / 50%)',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  paddingTop: '15vh',
  zIndex: 100,
})

const modal = css({
  background: 'base-100',
  borderRadius: '1rem',
  boxShadow: '0 25px 50px -12px oklch(0% 0 0 / 25%)',
  width: '100%',
  maxWidth: '560px',
  maxHeight: '70vh',
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
  borderColor: 'base-300',
})

const input = css({
  flex: 1,
  border: 'none',
  background: 'transparent',
  outline: 'none',
  fontSize: '1rem',
  color: 'base-content',
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
  color: 'base-content',
  transition: 'background 0.1s',
  _hover: { background: 'base-200' },
})

const categoryBadge = css({
  fontSize: '0.6875rem',
  padding: '0.125rem 0.5rem',
  borderRadius: '9999px',
  background: 'base-200',
  color: 'base-content',
  opacity: 0.6,
})

const emptyState = css({
  padding: '3rem 1.5rem',
  textAlign: 'center',
  color: 'base-content',
  opacity: 0.5,
})

export const SearchModal = {
  oninit(vnode) {
    vnode.state.query = ''
    vnode.state.selectedIndex = 0
  },

  view(vnode) {
    const { onclose } = vnode.attrs
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
      <div className={overlay} onclick={(e) => { if (e.target === e.currentTarget) onclose() }}>
        <div className={modal}>
          <div className={searchInput}>
            <Search size={20} className={css({ opacity: 0.5 })} />
            <input
              className={input}
              type="text"
              placeholder="Search components..."
              autofocus
              oninput={(e) => { vnode.state.query = e.target.value; vnode.state.selectedIndex = 0 }}
              onkeydown={(e) => {
                if (e.key === 'Escape') onclose()
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
            <button
              className={css({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '1.75rem',
                height: '1.75rem',
                borderRadius: '0.375rem',
                border: 'none',
                background: 'base-200',
                cursor: 'pointer',
                color: 'base-content',
                _hover: { background: 'base-300' },
              })}
              onclick={onclose}
            >
              <X size={14} />
            </button>
          </div>

          <div className={resultsList}>
            {filtered.length === 0 ? (
              <div className={emptyState}>No components found</div>
            ) : (
              Object.entries(grouped).map(([category, items]) => (
                <div key={category}>
                  <div className={css({ padding: '0.5rem 1rem 0.25rem', fontSize: '0.6875rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.4 })}>
                    {category}
                  </div>
                  {items.map((comp) => {
                    const globalIndex = filtered.indexOf(comp)
                    return (
                      <a
                        key={comp.name}
                        href={`#${comp.route}`}
                        className={resultItem}
                        style={globalIndex === vnode.state.selectedIndex ? css({ background: 'base-200' }) : ''}
                        onclick={(e) => {
                          e.preventDefault()
                          m.route.set(comp.route)
                          onclose()
                        }}
                      >
                        <span style={css({ fontWeight: '500' })}>{comp.name.charAt(0).toUpperCase() + comp.name.slice(1)}</span>
                        <ArrowRight size={14} className={css({ opacity: 0.3 })} />
                      </a>
                    )
                  })}
                </div>
              ))
            )}
          </div>

          <div className={css({ padding: '0.75rem 1.25rem', borderTop: '1px solid', borderColor: 'base-300', display: 'flex', gap: '1rem', fontSize: '0.75rem', opacity: 0.5 })}>
            <span>↑↓ Navigate</span>
            <span>↵ Open</span>
            <span>esc Close</span>
          </div>
        </div>
      </div>
    )
  }
}
