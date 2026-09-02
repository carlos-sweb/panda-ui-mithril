import m from 'mithril'
import { css } from '../../../styled-system/css'
import {
  Stack, Title, Text, Button, Card, CardBody, TextInput, Alert, Block,
} from '../../../src/index.js'
import { t, loadPageI18n } from '../../i18n/index.js'

/**
 * Página Spacing — edita la escala de espaciado extra (tokens.spacing).
 * GET /api/theme → { spacing: { '128': '32rem', ... } }
 * POST /api/theme → { spacing: {...} } reescribe pum/theme/spacing.ts
 */

const fieldRow = css({
  display: 'grid',
  gridTemplateColumns: '200px 1fr',
  gap: '0.75rem',
  alignItems: 'center',
  '@media (max-width: 768px)': { gridTemplateColumns: '1fr' },
})

const page = {
  oninit(vnode) {
    loadPageI18n('spacing')
    vnode.state.loading = true
    vnode.state.saving = false
    vnode.state.error = null
    vnode.state.saved = false
    vnode.state.spacing = {}

    fetch('/api/theme')
      .then((r) => r.json())
      .then((data) => {
        if (data && data.ok === false) {
          vnode.state.loading = false
          vnode.state.error = data.error || 'Theme not found'
          m.redraw()
          return
        }
        vnode.state.themeRel = data.themeRel || 'pum/theme'
        vnode.state.spacing = JSON.parse(JSON.stringify(data.spacing || {}))
        vnode.state.loading = false
        m.redraw()
      })
      .catch((e) => {
        vnode.state.loading = false
        vnode.state.error = String(e)
        m.redraw()
      })
  },

  view(vnode) {
    const s = vnode.state
    const names = Object.keys(s.spacing)

    const save = () => {
      s.saving = true
      s.saved = false
      fetch('/api/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spacing: s.spacing }),
      })
        .then((r) => r.json())
        .then(async (res) => {
          if (!res.ok) throw new Error(res.error || 'Save failed')
          await fetch('/api/rebuild', { method: 'POST' })
          s.saving = false
          s.saved = true
          m.redraw()
        })
        .catch((e) => { s.saving = false; s.error = String(e); m.redraw() })
    }

    return (
      <Stack gap="lg">
        <Title as="h1" size="2">{t('title')}</Title>
        <Text color="neutral">{t('introPre')} <code>{s.themeRel}/spacing.ts</code>.</Text>

        {s.loading && <Alert color="info">{t('loadingTheme')}</Alert>}
        {s.error && <Alert color="error">{t('errorPrefix')}{s.error}</Alert>}
        {s.saved && !s.saving && <Alert color="success">{t('savedAndRebuilt')}</Alert>}

        {!s.loading && !s.error && (
          <Card>
            <CardBody>
              <Stack gap="md">
                {names.map((name) => (
                  <div key={name} className={fieldRow}>
                    <Text weight="bold" className={css({ fontFamily: 'monospace', fontSize: '0.8125rem' })}>{name}</Text>
                    <TextInput
                      value={s.spacing[name] || ''}
                      placeholder={t('placeholder')}
                      oninput={(e) => { s.spacing[name] = e.target.value }}
                    />
                  </div>
                ))}
                <Block spacing="sm" />
                <Stack direction="row" gap="sm">
                  <Button color="primary" onclick={save} disabled={s.saving}>{s.saving ? t('saving') : t('save')}</Button>
                  <Button variant="ghost" onclick={() => location.reload()}>{t('reload')}</Button>
                </Stack>
              </Stack>
            </CardBody>
          </Card>
        )}
      </Stack>
    )
  }
}

export default page
