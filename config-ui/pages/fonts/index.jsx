import m from 'mithril'
import { css } from '../../../styled-system/css'
import {
  Stack, Title, Text, Button, Card, CardBody, TextInput, Alert, Block,
} from '../../../src/index.js'

/**
 * Página Fonts — edita las tipografías del theme (tokens.fonts).
 * GET /api/theme → { fonts: { sans: '...', mono: '...' } }
 * POST /api/theme → { fonts: {...} } reescribe pum/theme/fonts.ts
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
    vnode.state.loading = true
    vnode.state.saving = false
    vnode.state.error = null
    vnode.state.saved = false
    vnode.state.fonts = {}

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
        vnode.state.fonts = JSON.parse(JSON.stringify(data.fonts || {}))
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
    const names = Object.keys(s.fonts)

    const save = () => {
      s.saving = true
      s.saved = false
      fetch('/api/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fonts: s.fonts }),
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
        <Title as="h1" size="2">Fonts</Title>
        <Text color="neutral">Edit the theme fonts — changes are written to <code>{s.themeRel}/fonts.ts</code>.</Text>

        {s.loading && <Alert color="info">Loading theme…</Alert>}
        {s.error && <Alert color="error">Error: {s.error}</Alert>}
        {s.saved && !s.saving && <Alert color="success">Saved and rebuilt ✓</Alert>}

        {!s.loading && !s.error && (
          <Card>
            <CardBody>
              <Stack gap="md">
                {names.map((name) => (
                  <div key={name} className={fieldRow}>
                    <Text weight="bold" className={css({ fontFamily: 'monospace', fontSize: '0.8125rem' })}>{name}</Text>
                    <TextInput
                      value={s.fonts[name] || ''}
                      placeholder="font-family stack"
                      oninput={(e) => { s.fonts[name] = e.target.value }}
                    />
                  </div>
                ))}
                <Block spacing="sm" />
                <Stack direction="row" gap="sm">
                  <Button color="primary" onclick={save} disabled={s.saving}>{s.saving ? 'Saving…' : 'Save'}</Button>
                  <Button variant="ghost" onclick={() => location.reload()}>Reload</Button>
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
