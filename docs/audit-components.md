# Auditoría CSS — panda-ui-mithril

Auditoría de los 55 recipes y 56 componentes contra las buenas prácticas de Panda CSS
(recetas, tokens, custom properties, slots). Filosofía aplicada: la misma usada para
ordenar `Rating` (migración a `sva`, `token()`, `defaultVariants`, custom props sin
colisiones con variables globales).

Fecha: 2026-08-02 · Fase 1 del plan de mejora.

## Resumen ejecutivo

| Métrica | Valor | Estado |
|---|---|---|
| Recipes | 55 (54 `cva` + 1 `sva`) | — |
| Componentes multi-slot con `cva` separados (candidatos `sva`) | 26 | ⚠️ convención interna (AGENTS.md) |
| Recipes con `var(--colors-*)` crudo (en vez de `token()`) | 39/55 | ⚠️ mejora |
| Recipes con `defaultVariants` | 16/55 | ⚠️ mejora |
| Recipes con variante `color` (bloque daisy de 8) | 20 | 🔁 duplicación |
| Recipes con variante `size` (xs..xl) | 22 | 🔁 duplicación |
| Colisión con variable global `:root` | 2 (`button`, `radialProgress`) | 🚨 riesgo |
| Escala de tokens spacing/sizes | 0 | 🚧 decisión tomada: crear |
| Componentes con `style=` inline | 0 | ✅ |
| Recipes totalmente vacías | 1 (`themeController`) | 🧹 limpieza |

## Criterios de auditoría

1. **Recipes**: `cva` para un solo elemento, `sva` para multi-slot (regla de AGENTS.md).
2. **Tokens**: consumir tokens con `token('colors.x')` o referencia `{colors.x}`,
   no `var(--colors-x)` crudo (no tipado; error si el token se renombra).
3. **Custom properties ad-hoc**: nombres con prefijo del componente (`--btn-*`,
   `--rating-*`) y sin colisionar con las variables globales de `:root`
   (`--size`, `--size-field`, `--radius-*`, `--border`, `--fontsize`, `--depth`, `--noise`, `--fx-noise`).
4. **defaultVariants**: los valores por defecto declarados como variante, no solo en `base`.
5. **Valores mágicos**: preferir tokens de spacing/sizes a `rem`/`px` literales.
6. **Variantes vacías** (`foo: {}`): solo como estado intencional documentado; si no aportan, se eliminan.
7. **Duplicación**: el bloque de 8 colores daisy y la escala xs..xl repetidos entre recipes
   (candidatos a compartirse vía tokens semánticos o un grupo común).

## Hallazgos por severidad

### 🚨 Riesgo — colisión con variable global `--size`

`panda.config.ts` declara `--size` global en `:root` (`calc(var(--size-field,.25rem) * 10)`)
usado por el sistema de campos. Estas recipes la ensombrecen dentro de su subárbol
(las descendientes que lean `--size` esperando el valor global recibirán otro):

- **`src/recipes/button.ts`** — variantes `size` definen `--size` 1.5–3.5rem → renombrar a `--btn-size`.
- **`src/recipes/radialProgress.ts`** — base define `--size: 5rem` → renombrar a `--rprogress-size`.

*(`Rating` ya fue corregido a `--rating-size`.)*

### ⚠️ Mejora — `token()` en vez de `var(--colors-*)` crudo

39 recipes usan `var(--colors-*)` directamente. El swap a `'token(colors.x)'` es
comportamiento idéntico (Panda lo resuelve en build-time a la misma variable) pero
tipado y resistente a renombrados. Afecta también fallbacks anidados
(`var(--x, var(--colors-y))` → `var(--x, token(colors.y))`).

> **Hallazgo pre-existente (no de las recipes):** en esta versión de Panda la
> referencia directa de token como valor (`color: 'base-content'`,
> `borderColor: 'base-content/20%'` en `playground/components/Navbar.jsx`) **no
> resuelve** en `css()` — emite el literal (CSS inválido, ignorado en silencio).
> Solo la forma string `'token(path.to.token)'` resuelve. Cualquier uso directo
> en playground/componentes debe migrar a la forma `token()` (seguimiento).

### ⚠️ Mejora — `defaultVariants` ausente en 39 recipes

Los defaults viven en `base`; moverlos a `defaultVariants` los hace explícitos y
aparecen en los specs generados (`panda spec`).

### ⚠️ Convención — 26 componentes multi-slot usan `cva` separados

Candidatos claros a `sva` (~18): Card, Stat, Tabs, Menu, Modal, List, Calendar, Hero,
Navbar, Megamenu, ChatBubble, Diff, Footer, Steps, Timeline, Table, Pagination, Avatar.

Accesorios (segundo slot sin identidad visual propia, se mantienen `cva`):
Accordion, Fieldset, Join, Indicator, Carousel, Countdown, Filter, ThemeController.

### 🔁 Duplicación — bloques de variantes repetidos

- Bloque `color` daisy (8 colores → `--x-color: var(--colors-y)`) en 20 recipes
  (al menos 6 con el bloque completo: badge, button, divider, otp, radio, tooltip).
- Escala `size` xs..xl en 22 recipes.
- Candidatos a: compartir vía un grupo de variantes común, o migrar a tokens
  semánticos si el bloque varía solo el custom property.

### 🧹 Limpieza

- **`src/recipes/themeController.ts`** — recipe completamente vacía
  (`base: {}, variants: {}`): el componente compone `toggleStyles` + `checkboxStyles`.
  Evaluar eliminar la recipe y el import, o darle contenido real.
- Variantes vacías intencionales (se documentan, no se tocan): `divider.horizontal`,
  `link.false`, `tabs.lift/box/border`, `rating.full`, `aura.default`.
- `label.base: {}`, `table.base: {}`, `list.base: {}` — `base` vacío (los estilos
  viven en variantes); se pueden eliminar o dejar como documentación.

### ℹ️ Notas de composición

- `Pagination` y `FAB` importan `buttonStyles`/`joinStyles` de otras recipes
  (composición inter-recipe) — patrón válido; tenerlo en cuenta al migrar a `sva`.
- `Accordion` exporta alias `Collapse*` — mismo recipe, dos nombres públicos.
- `tabs.ts` documenta el desvío deliberado de daisyUI (JS state en vez de
  `input[radio]`/label CSS) — mismo enfoque que el rediseño de `Rating`.

## Plan de mejora (fases aprobadas)

1. **Riesgo primero**: renombrar `--size` → `--btn-size` (button) y
   `--rprogress-size` (radialProgress); regenerar CSS y verificar en navegador.
2. **Tokens de spacing/sizes**: crear escala en `panda.config.ts`; migrar literales
   `rem`/`px` de las recipes a `token('spacing.x')` / `token('sizes.x')`.
3. **token() + defaultVariants**: swap `var(--colors-*)` en las 39 recipes restantes;
   completar `defaultVariants`; limpiar recipes/variantes muertas.
4. **Migración sva**: los ~18 multi-slot claros (recipe + componente), por tandas.
5. **Verificación global**: barrido en navegador (Chromium + Firefox), `typecheck`,
   `cssgen`; actualizar AGENTS.md si cambia la convención; commits por fase.

## Metodología de verificación

- `npm run typecheck` (tsc --noEmit).
- `npx panda cssgen` + `grep` del CSS generado (resolución de `token()`, sin
  `var(--colors-` crudo fuera de tokens).
- Navegador real (playwright-core): Chromium y Firefox (build descargado en
  `~/.cache/ms-playwright/firefox-1532`) sobre las páginas del playground —
  renders, estados, 0 errores de consola.
