import m from 'mithril'
import { css } from '../../../styled-system/css'
import {
  Stack, Title, Text, Button, Card, CardBody, Columns, Column, Block, Alert, ColorPicker,
} from '../../../src/index.js'

/**
 * Página Colors — editor de los colores del theme.
 *
 * Carga los valores actuales desde GET /api/theme, los muestra en un
 * formulario (ColorPicker por token, botón-trigger con swatch + valor) y al
 * guardar envía los edits vía POST /api/theme (el servidor reescribe
 * pum/theme/colors.ts) y dispara el rebuild.
 */

// Ancho fijo para el nombre del token en la fila (columnas alineadas).
const tokenName = css({
  fontFamily: 'monospace',
  fontSize: '0.8125rem',
})

// Cuadradito de color dentro del botón-trigger del ColorPicker: muestra el
// color REAL del token (base o dark) — el preview vive dentro del botón.
// 1rem como en el demo del playground (cabe dentro del Button size sm).
// borderColor usa el color nombrado 'base-300' (el matcher lo resuelve a
// var(--colors-base-300); el macro token() no se resuelve en este outdir).
const pickerValueSwatch = css({
  width: '1rem',
  height: '1rem',
  borderRadius: '0.25rem',
  border: '1px solid',
  borderColor: 'base-300',
  flexShrink: '0',
})

// Botón-trigger: Button de la librería (outline = borde visible), compacto,
// con el swatch del color + el valor.
const pickerValueBtn = css({
  gap: '0.375rem',
  fontFamily: 'monospace',
  fontSize: '0.75rem',
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
                <Columns gap="md">
                  <Column width={2}><Text weight="bold">Token</Text></Column>
                  <Column><Text weight="bold">Light (base)</Text></Column>
                  <Column><Text weight="bold">Dark</Text></Column>
                </Columns>

                {names.map((name) => {
                  const c = s.colors[name] || { base: '', dark: '' }
                  return (
                    <Columns key={name} gap="md">
                      <Column width={2}>
                        <Text weight="bold" className={tokenName}>{name}</Text>
                      </Column>
                      <Column>
                        <ColorPicker
                          value={toHex(c.base)}
                          onchange={(h) => setValue(name, 'base', h)}
                          copy={false}
                          trigger={m(Button, {
                            variant: 'outline',
                            size: 'sm',
                            className: pickerValueBtn,
                            'aria-label': `Pick base color for ${name}`,
                          }, [
                            m('span', { className: pickerValueSwatch, style: { backgroundColor: c.base || 'transparent' } }),
                            c.base || '—',
                          ])}
                        />
                      </Column>
                      <Column>
                        <ColorPicker
                          value={toHex(c.dark)}
                          onchange={(h) => setValue(name, 'dark', h)}
                          copy={false}
                          trigger={m(Button, {
                            variant: 'outline',
                            size: 'sm',
                            className: pickerValueBtn,
                            'aria-label': `Pick dark color for ${name}`,
                          }, [
                            m('span', { className: pickerValueSwatch, style: { backgroundColor: c.dark || 'transparent' } }),
                            c.dark || '—',
                          ])}
                        />
                      </Column>
                    </Columns>
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
