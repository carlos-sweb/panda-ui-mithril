import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Title, Swap, Stack, Text, Block, Badge } from '../../../src/index.js'
import { Sun, Moon } from 'lucide-mithril'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const heading = css({ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 })
const stateBadge = css({
  padding: '0.5rem 1rem',
  background: 'token(colors.base-300)',
  borderRadius: 'var(--radius-box)',
  fontSize: '0.875rem',
  marginTop: '0.5rem',
})

const usageCode = `<Swap on="On" off="Off" style="rotate" />
<Swap on="☀️" off="🌙" style="flip" />
<Swap on={<Sun size={20} />} off={<Moon size={20} />} style="rotate" />`

const controlledCode = `<Swap
  on={<Sun size={20} />}
  off={<Moon size={20} />}
  style="rotate"
  checked={state}
  onchange={(checked, e) => { state = checked }}
/>`

const classRows = [
  { className: 'swap', prop: '<Swap on={...} off={...}>', type: 'Component', description: 'Swap container' },
  { className: 'swap-on', prop: 'on={...}', type: 'Part', description: 'The child element that should be visible when checkbox is checked or when swap is active' },
  { className: 'swap-off', prop: 'off={...}', type: 'Part', description: 'The child element that should be visible when checkbox is not checked or when swap is not active' },
  { className: 'swap-indeterminate', type: 'Part', description: 'The child element that should be visible when checkbox is indeterminate — not supported by this component' },
  { className: 'swap-active', prop: 'active', type: 'Modifier', description: 'Activates the swap (no need for checkbox)' },
  { className: 'swap-rotate', prop: 'style="rotate"', type: 'Style', description: 'Adds rotate effect to swap' },
  { className: 'swap-flip', prop: 'style="flip"', type: 'Style', description: 'Adds flip effect to swap' },
  { className: 'swap-xs', prop: 'size="xs"', type: 'Size', description: 'Extra small size' },
  { className: 'swap-sm', prop: 'size="sm"', type: 'Size', description: 'Small size' },
  { className: 'swap-md', prop: 'size="md" (default)', type: 'Size', description: 'Medium size', isDefault: true },
  { className: 'swap-lg', prop: 'size="lg"', type: 'Size', description: 'Large size' },
  { className: 'swap-xl', prop: 'size="xl"', type: 'Size', description: 'Extra large size' },
  { className: '—', prop: 'checked', type: 'Prop', description: 'Controlled state of the checkbox' },
  { className: '—', prop: 'onchange', type: 'Prop', description: 'Callback on toggle: (checked, e) => void' },
]

export default {
  name: 'Swap',
  category: 'Actions',
  description: 'Swap elements with a transition animation.',

  oninit(vnode) {
    loadPageI18n('swap')
    vnode.state.swapChecked = false
  },
  view(vnode) {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Swap</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Stack direction="row" gap="sm">
          <Swap on="On" off="Off" style="rotate" />
          <Swap on="On" off="Off" style="flip" />
          <Swap on={<Sun size={20} />} off={<Moon size={20} />} style="rotate" />
          <Swap>
            <span>Manual (children)</span>
          </Swap>
        </Stack>
        <Text size="sm" color="neutral">
          Click to toggle — the swap works with a hidden native checkbox (like the reference implementation), no
          JS state required. Pass an icon component to <code>on</code>/<code>off</code> the same
          way you'd pass text.
        </Text>

        <Title as="h3" size="5">Sizes</Title>
        <Text size="sm" color="neutral" className={heading}>XS · SM · MD · LG · XL</Text>
        <Stack direction="row" gap="sm">
          <Swap size="xs" on="XS" off="XS" style="flip" />
          <Swap size="sm" on="SM" off="SM" style="flip" />
          <Swap size="md" on="MD" off="MD" style="flip" />
          <Swap size="lg" on="LG" off="LG" style="flip" />
          <Swap size="xl" on="XL" off="XL" style="flip" />
        </Stack>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('controlledTitle')}</Title>
          <Text size="sm" color="neutral" className={css({ marginBottom: '0.75rem' })}>
            {t('controlledDescription')}
          </Text>
          <Stack direction="row" gap="sm" alignItems="center">
            <Swap
              on={<Sun size={20} />}
              off={<Moon size={20} />}
              style="rotate"
              checked={vnode.state.swapChecked}
              onchange={(checked) => { vnode.state.swapChecked = checked }}
            />
            <Text size="sm">State: {vnode.state.swapChecked ? 'on' : 'off'}</Text>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <CodeExample code={usageCode} />
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('controlledTitle')}</Title>
          <CodeExample code={controlledCode} />
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={classRows} />
        </Block>
      </Stack>
    )
  }
}
