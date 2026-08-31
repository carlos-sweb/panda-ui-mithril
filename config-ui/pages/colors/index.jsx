import m from 'mithril'
import { css } from '../../../styled-system/css'
import {
  Stack, Title, Text, Button, Card, CardBody, CardTitle, TextInput, Select, Block, Alert,
} from '../../../src/index.js'

/**
 * Página Colors — editor de los colores del theme.
 *
 * Carga los valores actuales desde GET /api/theme, los muestra en un
 * formulario (color-picker + campo texto para oklch/hex) y al guardar
 * envía los edits vía POST /api/theme (el servidor reescribe
 * pum/theme/colors.ts) y dispara el rebuild.
 */

const colorRow = css({
  display: 'grid',
  gridTemplateColumns: '220px 1fr 1fr 120px',
  gap: '0.75rem',
  alignItems: 'center',
  '@media (max-width: 768px)': { gridTemplateColumns: '1fr' },
})

const swatch = css({
  width: '2rem',
  height: '2rem',
  borderRadius: '0.5rem',
  border: '1px solid',
  borderColor: 'token(colors.base-300)',
  flexShrink: '0',
})

const page = {
  oninit(vnode) {
    vnode.state.loading = true
    vnode.state.saving = false
    vnode.state.error = null
    vnode.state.saved = false
    vnode.state.colors = {}
    vnode.state.themeData = null

    fetch('/api/theme')
      .then((r) => r.json())
      .then((data) => {
        if (data && data.ok === false) {
          vnode.state.loading = false
          vnode.state.error = data.error || 'Theme not found'
          m.redraw()
          return
        }
        vnode.state.themeData = data
        vnode.state.themeRel = data.themeRel || 'pum/theme'
        // colors: { name: { base, dark } } — copia editable
        vnode.state.colors = JSON.parse(JSON.stringify(data.colors || {}))
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

    const setValue = (name, field, value) => {
      s.colors[name] = s.colors[name] || { base: '', dark: '' }
      s.colors[name][field] = value
    }

    const save = () => {
      s.saving = true
      s.saved = false
      s.error = null
      fetch('/api/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ colors: s.colors }),
      })
        .then((r) => r.json())
        .then(async (res) => {
          if (!res.ok) throw new Error(res.error || 'Save failed')
          // rebuild para que la preview refleje los cambios
          await fetch('/api/rebuild', { method: 'POST' })
          s.saving = false
          s.saved = true
          m.redraw()
        })
        .catch((e) => {
          s.saving = false
          s.error = String(e)
          m.redraw()
        })
    }

    const names = Object.keys(s.colors)

    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Colors</Title>
        <Text color="neutral">Edit the theme colors — changes are written to <code>{s.themeRel}/colors.ts</code>.</Text>

        {s.loading && <Alert color="info">Loading theme…</Alert>}
        {s.error && <Alert color="error">Error: {s.error}</Alert>}
        {s.saved && !s.saving && <Alert color="success">Saved and rebuilt ✓</Alert>}

        {!s.loading && !s.error && (
          <Card>
            <CardBody>
              <Stack gap="md">
                <div className={colorRow}>
                  <Text weight="bold">Token</Text>
                  <Text weight="bold">Light (base)</Text>
                  <Text weight="bold">Dark</Text>
                  <Text weight="bold">Preview</Text>
                </div>

                {names.map((name) => {
                  const c = s.colors[name] || { base: '', dark: '' }
                  return (
                    <div key={name} className={colorRow}>
                      <Text weight="bold" className={css({ fontFamily: 'monospace', fontSize: '0.8125rem' })}>{name}</Text>
                      <Stack direction="row" gap="sm" align="center">
                        <input
                          type="color"
                          value={toHex(c.base)}
                          oninput={(e) => setValue(name, 'base', e.target.value)}
                          className={css({ width: '2rem', height: '2rem', border: 'none', background: 'none', cursor: 'pointer' })}
                        />
                        <TextInput
                          value={c.base || ''}
                          placeholder="oklch(…) or #hex"
                          oninput={(e) => setValue(name, 'base', e.target.value)}
                          className={css({ flex: '1' })}
                        />
                      </Stack>
                      <Stack direction="row" gap="sm" align="center">
                        <input
                          type="color"
                          value={toHex(c.dark)}
                          oninput={(e) => setValue(name, 'dark', e.target.value)}
                          className={css({ width: '2rem', height: '2rem', border: 'none', background: 'none', cursor: 'pointer' })}
                        />
                        <TextInput
                          value={c.dark || ''}
                          placeholder="oklch(…) or #hex"
                          oninput={(e) => setValue(name, 'dark', e.target.value)}
                          className={css({ flex: '1' })}
                        />
                      </Stack>
                      <div
                        className={swatch}
                        style={{ backgroundColor: c.base || 'transparent' }}
                      />
                    </div>
                  )
                })}

                <Block spacing="sm" />
                <Stack direction="row" gap="sm">
                  <Button color="primary" onclick={save} disabled={s.saving}>
                    {s.saving ? 'Saving…' : 'Save'}
                  </Button>
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

/** Convierte un valor a algo que el color-picker acepte (#rrggbb). */
function toHex(value) {
  if (!value) return '#ffffff'
  if (/^#[0-9a-fA-F]{6}$/.test(value)) return value
  // oklch/hex corto → no convertible, el picker usa blanco (el texto guarda el valor real)
  return '#ffffff'
}

export default page
