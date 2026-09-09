# Auditoría técnica — panda-ui-mithril

Auditoría de código de los **72 componentes** (`src/components/`) y **68 recipes**
(`src/recipes/`, excluyendo los barrels `index.ts`/`index.d.ts`) contra las buenas
prácticas de **Panda CSS** y **JavaScript/Mithril**. Alcance: solo calidad técnica
de código (bugs, inconsistencias, deuda) — **no** evalúa superficie de API ni
features de los componentes.

Fase 1 (2026-08-02): CSS/Panda únicamente, 55 recipes / 56 componentes.
Fase 2 (2026-09-08): re-validación de Fase 1 + auditoría JS/Mithril, 68 recipes / 72 componentes.

## Resumen ejecutivo

| Métrica | Fase 1 (ago) | Fase 2 (sep) | Estado |
|---|---|---|---|
| Recipes | 55 | 68 | — |
| Componentes | 56 | 72 | — |
| `var(--colors-*)` crudo (en vez de `token()`) | 39/55 | **0/68** | ✅ resuelto |
| Colisión con custom property global | 2 (`button`, `radialProgress`) | **1** (`button`: `--border`/`--fontsize`) | 🚨 parcial |
| Recipes con `defaultVariants` | 16/55 | 44/68 | ⚠️ mejora (24 sin) |
| Recipe vacía (`themeController`) | 1 | 0 | ✅ resuelto (eliminada) |
| Componentes `.jsx` con sintaxis JSX | 1 (`Button`) | **0** | ✅ resuelto (este sprint) |
| Bug de `children` destructuring (`vnode.attrs`) | — | 0/72 | ✅ sin instancias |
| Listeners nativos sin cleanup en `onremove` | — | 0/3 (Drawer/Modal/Dropdown) | ✅ sin instancias |
| Clases Tailwind-literal prohibidas | — | 0/72 | ✅ sin instancias |
| `console.log`/`debugger` residual | — | 0 (2 `console.warn` intencionales) | ✅ sin instancias |
| `.map()` sin `key` en array dinámico | — | 1 (`ChatBubble` reactions) | 🚨 bug |
| `include` de `panda.config.ts` apuntando a 0 archivos | — | 1 (`src/components/*/*.jsx`) | ⚠️ config muerta |
| `stylelint` configurado pero sin script que lo ejecute | — | sí | ⚠️ tooling muerto |
| `tsconfig` sin `noUnusedLocals`/`noUnusedParameters` | — | sí | ℹ️ recomendación |

## Hallazgos por severidad (Fase 2)

### 🚨 Bug — `ChatBubble` reactions sin `key`

`src/components/ChatBubble/index.js:130`, dentro del componente que renderiza
`reactions.map(r => m('button', {...}))`, ningún `button` lleva `key`. El mismo
archivo sí lo hace correctamente en su `emojis.map` (línea ~406, `key: emoji`).
Como `reactions` es un array que cambia (toggle de `reacted`, `count` que sube/baja,
posible reordenamiento por el consumidor), el diffing no-keyed de Mithril puede
reutilizar el nodo DOM equivocado entre renders — exactamente la clase de bug que
`AGENTS.md` documenta en "Keyed fragments". Fix trivial: `key: r.emoji` (o el
identificador que use el consumidor), siguiendo el patrón ya presente en el mismo
archivo.

### 🚨 Riesgo — colisión de custom property global sin resolver en `button.ts`

La Fase 1 detectó y corrigió `--size` → `--btn-size` en `button.ts` y `radialProgress.ts`.
Quedó sin corregir el mismo patrón para **otras dos** propiedades que `button.ts`
sigue sombreando dentro de su variante `size`/`borderWidth`:

- `src/recipes/button.ts:153-157` — variante `size` define `'--fontsize': ...`
  (xs..xl), sombreando el `--fontsize: '.875rem'` global de `preset.ts:182`.
- `src/recipes/button.ts:178-182` — variante `borderWidth` define `'--border': '1px'/'2px'/'3px'`,
  sombreando el `--border: '1px'` global de `preset.ts:180`.

Cualquier descendiente dentro de un `<button>` (icono, `Badge`, `Kbd` anidado) que
lea `var(--fontsize)` o `var(--border)` esperando el valor global recibirá el valor
local del botón. Fix: renombrar a `--btn-fontsize`/`--btn-border-width` (ya hay
precedente exacto en el mismo archivo con `--btn-size`), actualizar los 2 usos
internos (`fontSize: 'var(--fontsize, 0.875rem)'` línea 42, `borderWidth: 'var(--border, 1px)'`
línea 24) y regenerar CSS.

### ⚠️ Mejora — `ColorPicker` mezcla el patrón de custom property con `style` crudo

`src/components/ColorPicker/index.js` usa correctamente el patrón sancionado
(`style={{ '--colorpicker-track': ... }}`, `'--colorpicker-hue': ...`) en varios
puntos, pero en el mismo archivo cae a valores inline crudos que no pasan por
ninguna custom property ni por el recipe:

- L259, L300: `style: { left: ... }` / `{ left, top }` — posición del thumb/cursor.
- L319, L431: `style: { backgroundColor: hex }` — swatch de color dinámico.
- L459: `style: { transform: state.menuOpen ? 'rotate(180deg)' : undefined }` — rotación del chevron.

Ninguno rompe nada (son valores genuinamente dinámicos, no expresables como
variante), pero son inconsistentes con el propio patrón que el archivo ya usa para
casos equivalentes. Recomendado: exponer estos valores como custom properties
component-scoped (`--colorpicker-thumb-left`, `--colorpicker-swatch-color`,
`--colorpicker-chevron-rotate`) consumidas desde `colorpicker.ts`, igual que
`--colorpicker-track`/`--colorpicker-hue`.

*(No se marcan como bug `Table` L192/228 ni `Drawer` L173: son estilos inline
sobre datos verdaderamente arbitrarios del consumidor —ancho/alineación de columna,
tamaño custom del drawer vía `--drawer-size`— imposibles de enumerar como variantes.
`Drawer` ya lo hace vía custom property y lo documenta en un comentario; `Table` es
el único caso legítimo de estilo posicional directo sin custom property, aceptable
dado que son valores por-columna ilimitados.)*

### ⚠️ Config muerta — `panda.config.ts` `include` no apunta a nada

```ts
include: ['./src/components/*/*.jsx', './playground/**/*.{js,jsx}'],
```

Tras la migración de `Button`/`Alert` a `.js` (este sprint) el patrón
`./src/components/*/*.jsx` no matchea ningún archivo. Y aunque matcheara, es
irrelevante: ningún componente llama a `css()` directamente (verificado, 0/72) —
todos los estilos de componente pasan por recipes ya registradas en `pumPreset` y
emitidas incondicionalmente vía `staticCss: { recipes: '*' }`. El `include` de
`src/components` no aportaba nada ni antes ni ahora. Limpieza recomendada:
eliminar esa entrada del array (dejar solo `'./playground/**/*.{js,jsx}'`, que sí
es necesario para la extracción estática de estilos ad-hoc del playground).

### ⚠️ Tooling muerto — `stylelint` instalado pero nunca ejecutado

`.stylelintrc.json` (extiende `stylelint-config-standard`) y la dependencia
`stylelint`/`stylelint-config-standard` están presentes, y sí hay CSS real que
lintear (`playground/style.css`, `config-ui/*.css`), pero `package.json` no tiene
ningún script `lint` ni se invoca desde ningún otro script. Es tooling instalado
sin efecto — o se conecta (`"lint:css": "stylelint '**/*.css'"`) o se elimina la
dependencia y config para no sugerir una garantía inexistente.

### ⚠️ Mejora — 24/68 recipes sin `defaultVariants`

Heredado de Fase 1 (bajó de 39/55 a 24/68 — mejora real). Los valores por defecto
siguen viviendo solo en `base` en: `accordion`, `diff`, `filter`, `breadcrumbs`,
`join`, `radialProgress`, `drawer`, `fab`, `calendar`, `label`, `list`, `fieldset`,
`divider`, `buttonGroup`, `hero`, `link`, `footer`, `indicator`, `ratingGroup`,
`mask`, `progress`, `skeleton`, `modal`, `countdown`. Hacerlos explícitos vía
`defaultVariants` los expone en `panda spec` y evita que un valor por defecto quede
implícito solo en `base`.

### ℹ️ Recomendación — tooling de TypeScript

Ni `tsconfig.json` ni `tsconfig.lib.json` habilitan `noUnusedLocals`/
`noUnusedParameters`. `strict: false` en ambos. El barrido manual de imports no
usados en `src/components/*/index.js` no encontró casos reales, pero sin el flag
`tsc --noEmit` no lo va a detectar automáticamente si aparecen en el futuro —
barato de activar, sin código a corregir hoy (0 hallazgos actuales).

### 🧹 Limpieza — duplicación cosmética de clase base

`src/components/Label/index.js:17`:
```js
cx(floating ? 'floating-label' : 'label', label({ floating: !!floating }), className)
```
`labelRecipe` (`src/recipes/label.ts`) se registra con `className: 'label'`, y
Panda's `createRecipe` **ya incluye automáticamente** el nombre base en cada
llamada a `label(...)` (verificado en `styled-system/recipes/create-recipe.mjs`:
todo recipe incluye `{[name]: '__ignore__'}` → `className: name` siempre). Cuando
`floating` es falsy, el literal `'label'` duplica la clase que `label({...})` ya
emite — `class="label label ..."`. Sin efecto visual/funcional (clases duplicadas
son inocuas en HTML), pero es dead weight. Nota relacionada: el ejemplo canónico
de `AGENTS.md` (`cx('btn', button({...}), className)`) tampoco refleja esto —
la clase base real emitida por el recipe es `button` (no `btn`), y el propio
componente `Button` correctamente **omite** el literal redundante. Vale la pena
corregir ese ejemplo en `AGENTS.md` para que documente el comportamiento real
(el recipe ya aporta la clase base; solo hace falta un literal extra cuando es
una clase *distinta* a la del recipe, como en `Skeleton`'s `'skeleton-text'`).

## ✅ Resuelto desde Fase 1 (verificado, sin acción)

- **`var(--colors-*)` crudo**: 0/68 recipes — 100% migrado a `token(colors.x)`.
  Ninguna otra categoría (`--radii-`, `--fontSizes-`, `--spacing-`, `--sizes-`,
  `--fontWeights-`, `--shadows-`) tiene uso crudo tampoco.
- **`--size` global**: renombrado a `--btn-size`/`--rprogress-size` en su momento;
  confirmado sin regresión.
- **`themeController.ts`**: recipe vacía eliminada por completo (el archivo ya no existe).
- **`.jsx` en `src/components/`**: 0 (Button/Alert migrados a `.js` este sprint).
- **Bug de `children`**: 0/72 componentes destructuran `children` de `vnode.attrs`.
- **Cleanup de listeners nativos**: los 3 componentes que usan
  `document`/`window`.addEventListener` (`Drawer`, `Modal`, `Dropdown`) limpian
  correctamente en `onremove` o usan `{ once: true }`; `Dropdown` llama
  `m.redraw()` tras mutar estado desde el listener nativo, como exige `AGENTS.md`.
- **Clases Tailwind-literal prohibidas** (`shrink-0`, `font-bold`, etc.): 0 instancias.
- **`console.log`/`debugger`**: 0 residuales (solo 2 `console.warn` intencionales
  en `OTP`/`Rating`, guardas de dev-time documentadas, no debug leftover).
- **`export default`** / **`var` (legacy keyword)**: 0 instancias — 100% named exports, `const`/`let`.
- **Paridad barrel**: los 72 componentes tienen `index.d.ts` y están exportados desde `src/index.js`.
- **`!important`**: 0 instancias en recipes.

## Heredado de Fase 1 — aún abierto, no re-verificado en profundidad

Fuera del foco de esta pasada (requiere juicio de diseño por componente, no
detección mecánica de bugs):

- De los 18 candidatos a `defineSlotRecipe` (`sva`) listados en Fase 1 (Card,
  Stat, Tabs, Menu, Modal, List, Calendar, Hero, Navbar, Megamenu, ChatBubble,
  Diff, Footer, Steps, Timeline, Table, Pagination, Avatar), **15 ya migraron**
  (verificado: `card`, `stat`, `modal`, `list`, `calendar`, `hero`, `navbar`,
  `megamenu`, `chatBubble`, `diff`, `footer`, `steps`, `timeline`, `table`,
  `avatar` están en la lista actual de 22 `defineSlotRecipe`). Quedan **3
  abiertos**: `tabs.ts`, `menu.ts`, `pagination.ts` siguen en `defineRecipe`
  (`cva`) simple. De estos, `tabs.ts` documenta en el propio archivo que el
  desvío de la referencia clásica es deliberado (no es necesariamente un
  candidato real a slot-recipe); `pagination.ts` compone `buttonStyles` de otro
  recipe (patrón válido, no necesariamente slot); `menu.ts` es el único de los 3
  sin justificación documentada — candidato real más claro si se retoma esta fase.
- Duplicación estructural: bloque de 8 colores y escala `size` xs..xl repetidos
  entre recipes (refactor a variantes compartidas) — sigue presente, no
  cuantificado de nuevo en esta pasada.

## Metodología (Fase 2)

- Búsqueda estática (`grep`/`comm`) sobre los 68 `.ts` de `src/recipes/` y 72
  `index.js`/`index.d.ts` de `src/components/` — sin muestreo, cobertura 100% de
  archivos para los patrones mecánicos (regex) descritos arriba.
- Verificación de comportamiento real de Mithril (`node_modules/mithril/render/
  {hyperscriptVnode,vnode}.js`) antes de reportar un supuesto bug de `key` perdido
  en clonado de children (`Menu`/`Dropdown`) — descartado como falso positivo:
  Mithril conserva `key` dentro de `attrs` al clonar vía `{...child.attrs}`.
- Verificación de comportamiento real de Panda (`styled-system/recipes/*.mjs`,
  `create-recipe.mjs`) antes de reportar el hallazgo de clase base duplicada.
- `npm run typecheck` — limpio, sin errores.
- No se ejecutó `cssgen`/navegador en esta pasada (auditoría estática de código,
  no de render); recomendado antes de aplicar los fixes de `button.ts`.
