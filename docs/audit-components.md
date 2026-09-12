# Technical audit — panda-ui-mithril

Code audit of the **72 components** (`src/components/`) and **68 recipes**
(`src/recipes/`, excluding the `index.ts`/`index.d.ts` barrels) against the best
practices of **Panda CSS** and **JavaScript/Mithril**. Scope: code technical
quality only (bugs, inconsistencies, debt) — it does **not** evaluate the API
surface or the components' features.

Phase 1 (2026-08-02): CSS/Panda only, 55 recipes / 56 components.
Phase 2 (2026-09-08): re-validation of Phase 1 + JS/Mithril audit, 68 recipes / 72 components.

## Executive summary

| Metric | Phase 1 (Aug) | Phase 2 (Sep) | Status |
|---|---|---|---|
| Recipes | 55 | 68 | — |
| Components | 56 | 72 | — |
| Raw `var(--colors-*)` (instead of `token()`) | 39/55 | **0/68** | ✅ resolved |
| Collision with a global custom property | 2 (`button`, `radialProgress`) | **1** (`button`: `--border`/`--fontsize`) | 🚨 partial |
| Recipes with `defaultVariants` | 16/55 | 44/68 | ⚠️ improvement (24 without) |
| Empty recipe (`themeController`) | 1 | 0 | ✅ resolved (removed) |
| `.jsx` components with JSX syntax | 1 (`Button`) | **0** | ✅ resolved (this sprint) |
| `children` destructuring bug (`vnode.attrs`) | — | 0/72 | ✅ no instances |
| Native listeners without cleanup in `onremove` | — | 0/3 (Drawer/Modal/Dropdown) | ✅ no instances |
| Forbidden Tailwind-literal classes | — | 0/72 | ✅ no instances |
| Residual `console.log`/`debugger` | — | 0 (2 intentional `console.warn`) | ✅ no instances |
| `.map()` without `key` in a dynamic array | — | 1 (`ChatBubble` reactions) | 🚨 bug |
| `include` of `panda.config.ts` pointing to 0 files | — | 1 (`src/components/*/*.jsx`) | ⚠️ dead config |
| `stylelint` configured but with no script running it | — | yes | ⚠️ dead tooling |
| `tsconfig` without `noUnusedLocals`/`noUnusedParameters` | — | yes | ℹ️ recommendation |

## Findings by severity (Phase 2)

### 🚨 Bug — `ChatBubble` reactions without `key`

`src/components/ChatBubble/index.js:130`, inside the component that renders
`reactions.map(r => m('button', {...}))`, no `button` carries a `key`. The same
file does do it correctly in its `emojis.map` (line ~406, `key: emoji`).
Since `reactions` is an array that changes (`reacted` toggle, `count` going
up/down, possible reordering by the consumer), Mithril's unkeyed diffing can
reuse the wrong DOM node between renders — exactly the class of bug that
`AGENTS.md` documents under "Keyed fragments". Trivial fix: `key: r.emoji` (or
whatever identifier the consumer uses), following the pattern already present in
the same file.

### 🚨 Risk — unresolved global custom property collision in `button.ts`

Phase 1 detected and fixed `--size` → `--btn-size` in `button.ts` and `radialProgress.ts`.
The same pattern was left unfixed for **two other** properties that `button.ts`
still shadows inside its `size`/`borderWidth` variant:

- `src/recipes/button.ts:153-157` — the `size` variant defines `'--fontsize': ...`
  (xs..xl), shadowing the global `--fontsize: '.875rem'` from `preset.ts:182`.
- `src/recipes/button.ts:178-182` — the `borderWidth` variant defines
  `'--border': '1px'/'2px'/'3px'`, shadowing the global `--border: '1px'` from
  `preset.ts:180`.

Any descendant inside a `<button>` (icon, nested `Badge`, `Kbd`) that reads
`var(--fontsize)` or `var(--border)` expecting the global value will receive the
button's local value. Fix: rename to `--btn-fontsize`/`--btn-border-width` (there
is already an exact precedent in the same file with `--btn-size`), update the 2
internal usages (`fontSize: 'var(--fontsize, 0.875rem)'` line 42,
`borderWidth: 'var(--border, 1px)'` line 24) and regenerate the CSS.

### ⚠️ Improvement — `ColorPicker` mixes the custom property pattern with raw `style`

`src/components/ColorPicker/index.js` correctly uses the sanctioned pattern
(`style={{ '--colorpicker-track': ... }}`, `'--colorpicker-hue': ...`) in several
places, but in the same file it falls back to raw inline values that go through
neither a custom property nor the recipe:

- L259, L300: `style: { left: ... }` / `{ left, top }` — thumb/cursor position.
- L319, L431: `style: { backgroundColor: hex }` — dynamic color swatch.
- L459: `style: { transform: state.menuOpen ? 'rotate(180deg)' : undefined }` —
  chevron rotation.

None of them breaks anything (they are genuinely dynamic values, not expressible
as a variant), but they are inconsistent with the very pattern the file already
uses for equivalent cases. Recommended: expose these values as component-scoped
custom properties (`--colorpicker-thumb-left`, `--colorpicker-swatch-color`,
`--colorpicker-chevron-rotate`) consumed from `colorpicker.ts`, just like
`--colorpicker-track`/`--colorpicker-hue`.

*(`Table` L192/228 and `Drawer` L173 are not flagged as bugs: they are inline
styles over truly arbitrary consumer data —column width/alignment, custom drawer
size via `--drawer-size`— impossible to enumerate as variants. `Drawer` already
does it via a custom property and documents it in a comment; `Table` is the only
legitimate case of direct positional styling without a custom property, acceptable
given that they are unlimited per-column values.)*

### ⚠️ Dead config — `panda.config.ts` `include` points to nothing

```ts
include: ['./src/components/*/*.jsx', './playground/**/*.{js,jsx}'],
```

After the migration of `Button`/`Alert` to `.js` (this sprint) the pattern
`./src/components/*/*.jsx` matches no file. And even if it did match, it is
irrelevant: no component calls `css()` directly (verified, 0/72) — all component
styles go through recipes already registered in `pumPreset` and emitted
unconditionally via `staticCss: { recipes: '*' }`. The `include` for
`src/components` contributed nothing either before or now. Recommended cleanup:
remove that entry from the array (leaving only `'./playground/**/*.{js,jsx}'`,
which IS necessary for the static extraction of the playground's ad-hoc styles).

### ⚠️ Dead tooling — `stylelint` installed but never run

`.stylelintrc.json` (extends `stylelint-config-standard`) and the
`stylelint`/`stylelint-config-standard` dependency are present, and there IS real
CSS to lint (`playground/style.css`, `config-ui/*.css`), but `package.json` has no
`lint` script and it is not invoked from any other script either. It is installed
tooling with no effect — either wire it up (`"lint:css": "stylelint '**/*.css'"`)
or remove the dependency and config so as not to suggest a guarantee that does
not exist.

### ⚠️ Improvement — 24/68 recipes without `defaultVariants`

Inherited from Phase 1 (down from 39/55 to 24/68 — a real improvement). The
default values still live only in `base` in: `accordion`, `diff`, `filter`,
`breadcrumbs`, `join`, `radialProgress`, `drawer`, `fab`, `calendar`, `label`,
`list`, `fieldset`, `divider`, `buttonGroup`, `hero`, `link`, `footer`,
`indicator`, `ratingGroup`, `mask`, `progress`, `skeleton`, `modal`, `countdown`.
Making them explicit via `defaultVariants` exposes them in `panda spec` and
prevents a default value from staying implicit only in `base`.

### ℹ️ Recommendation — TypeScript tooling

Neither `tsconfig.json` nor `tsconfig.lib.json` enables `noUnusedLocals`/
`noUnusedParameters`. `strict: false` in both. The manual sweep of unused imports
in `src/components/*/index.js` found no real cases, but without the flag
`tsc --noEmit` will not detect them automatically if they appear in the future —
cheap to enable, with no code to fix today (0 current findings).

### 🧹 Cleanup — cosmetic duplication of the base class

`src/components/Label/index.js:17`:
```js
cx(floating ? 'floating-label' : 'label', label({ floating: !!floating }), className)
```
`labelRecipe` (`src/recipes/label.ts`) is registered with `className: 'label'`, and
Panda's `createRecipe` **already includes automatically** the base name in every
call to `label(...)` (verified in `styled-system/recipes/create-recipe.mjs`:
every recipe includes `{[name]: '__ignore__'}` → `className: name` always). When
`floating` is falsy, the literal `'label'` duplicates the class that `label({...})`
already emits — `class="label label ..."`. No visual/functional effect (duplicated
classes are harmless in HTML), but it is dead weight. Related note: the canonical
example in `AGENTS.md` (`cx('btn', button({...}), className)`) does not reflect
this either — the real base class emitted by the recipe is `button` (not `btn`),
and the `Button` component itself correctly **omits** the redundant literal. It is
worth fixing that example in `AGENTS.md` so that it documents the real behavior
(the recipe already provides the base class; an extra literal is only needed when
it is a *different* class from the recipe's, as in `Skeleton`'s `'skeleton-text'`).

## ✅ Resolved since Phase 1 (verified, no action)

- **Raw `var(--colors-*)`**: 0/68 recipes — 100% migrated to `token(colors.x)`.
  No other category (`--radii-`, `--fontSizes-`, `--spacing-`, `--sizes-`,
  `--fontWeights-`, `--shadows-`) has raw usage either.
- **Global `--size`**: renamed to `--btn-size`/`--rprogress-size` at the time;
  confirmed with no regression.
- **`themeController.ts`**: empty recipe removed entirely (the file no longer exists).
- **`.jsx` in `src/components/`**: 0 (Button/Alert migrated to `.js` this sprint).
- **`children` bug**: 0/72 components destructure `children` from `vnode.attrs`.
- **Native listener cleanup**: the 3 components that use
  `document`/`window`.addEventListener` (`Drawer`, `Modal`, `Dropdown`) clean up
  correctly in `onremove` or use `{ once: true }`; `Dropdown` calls
  `m.redraw()` after mutating state from the native listener, as `AGENTS.md`
  requires.
- **Forbidden Tailwind-literal classes** (`shrink-0`, `font-bold`, etc.): 0 instances.
- **`console.log`/`debugger`**: 0 residual (only 2 intentional `console.warn` in
  `OTP`/`Rating`, documented dev-time guards, not debug leftover).
- **`export default`** / **`var` (legacy keyword)**: 0 instances — 100% named exports, `const`/`let`.
- **Barrel parity**: all 72 components have an `index.d.ts` and are exported from `src/index.js`.
- **`!important`**: 0 instances in recipes.

## Inherited from Phase 1 — still open, not re-verified in depth

Outside the focus of this pass (it requires design judgment per component, not
mechanical bug detection):

- Of the 18 candidates for `defineSlotRecipe` (`sva`) listed in Phase 1 (Card,
  Stat, Tabs, Menu, Modal, List, Calendar, Hero, Navbar, Megamenu, ChatBubble,
  Diff, Footer, Steps, Timeline, Table, Pagination, Avatar), **15 have already
  migrated** (verified: `card`, `stat`, `modal`, `list`, `calendar`, `hero`,
  `navbar`, `megamenu`, `chatBubble`, `diff`, `footer`, `steps`, `timeline`,
  `table`, `avatar` are in the current list of 22 `defineSlotRecipe`). **3 remain
  open**: `tabs.ts`, `menu.ts`, `pagination.ts` are still plain `defineRecipe`
  (`cva`). Of these, `tabs.ts` documents in the file itself that the deviation
  from the classic reference is deliberate (it is not necessarily a real
  slot-recipe candidate); `pagination.ts` composes `buttonStyles` from another
  recipe (a valid pattern, not necessarily a slot); `menu.ts` is the only one of
  the 3 without documented justification — the clearest real candidate if this
  phase is picked up again.
- Structural duplication: the block of 8 colors and the `size` scale xs..xl
  repeated between recipes (refactor into shared variants) — still present, not
  quantified again in this pass.

## Methodology (Phase 2)

- Static search (`grep`/`comm`) over the 68 `.ts` files of `src/recipes/` and 72
  `index.js`/`index.d.ts` of `src/components/` — no sampling, 100% file coverage
  for the mechanical patterns (regex) described above.
- Verification of Mithril's real behavior (`node_modules/mithril/render/
  {hyperscriptVnode,vnode}.js`) before reporting an alleged bug of a lost `key`
  in children cloning (`Menu`/`Dropdown`) — dismissed as a false positive:
  Mithril preserves `key` inside `attrs` when cloning via `{...child.attrs}`.
- Verification of Panda's real behavior (`styled-system/recipes/*.mjs`,
  `create-recipe.mjs`) before reporting the duplicate base class finding.
- `npm run typecheck` — clean, no errors.
- No `cssgen`/browser was run in this pass (static code audit, not render);
  recommended before applying the `button.ts` fixes.
