# Config UI (theme editor) — `bunx panda-ui-mithril config`

Implementation detail of the theme editor (`config-ui/`). **This file
complements the "Config UI" section of [`../AGENTS.md`](../AGENTS.md)**, which
keeps the target resolution, the guards and the per-section invariants; here
is the full mechanics: endpoints, on-disk formats, serialization rules and the
why behind each decision.

Read it before touching `config-ui/*.ts`, `panda-config-ui.config.ts`, or
writing a new editor section.

---

`config-ui/` is a **client of the core like the playground** (NOT inside
`src/`): it reuses the playground shell (navbar + sidebar + routes + i18n) and
consumes only `panda-ui-mithril` components. The editor is an **Elysia**
(https://elysiajs.com/) server on **:1234** (`config-ui/server.ts`, dependency
`elysia` in `package.json`) that bundles the SPA with `Bun.build` in
runtime and serves its own generated CSS (`config-ui/config-ui.css`, built by
`bun run build:config-ui` / `scripts/build-config-ui.ts` with a **dedicated
Panda config** — `panda-config-ui.config.ts`, outdir `styled-system-config-ui`,
so it never clobbers the playground's `styled-system/`).

## Theme target resolution
(`config-ui/server.ts` → `resolveTheme`):
- `--dir <path>` / `--dir=<path>` / `-d <path>` / `-d=<path>` (read from
  `process.argv`): explicit base. Both forms; a relative path is resolved
  against the cwd, so `config --dir=src/pages/login` points at the
  sub-project (with its own `pum/` + `panda.config.ts`) and not at the root.
  Accepts a project root (`pum/theme` → `src/theme` → `theme` subdirs are
  tried inside it), or a theme dir directly (has `colors.ts`).
- `--port <n>` / `--port=<n>` / `-p <n>` (read from `process.argv`): server
  port (default **1234**).
- `--no-open` (or `BROWSER=none`): does NOT open the system browser on start
  (the URL is still printed to stdout). For repeated reviews / scripts / CI:
  without this, every restart opens a new tab.
- On start the server **opens the URL in the system browser** (best-effort:
  `xdg-open`/`open`/`start`, spawned detached + unref'd — a failure never
  kills the server; the URL is always printed to stdout).
- Without a flag: **upward search** from `process.cwd()` (up to 10 levels),
  trying `pum/theme` (consumer) then `src/theme` (this repo).
- Returns `{ themeDir, projectRoot, legacy }`; `projectRoot` = dir containing
  `panda.config.ts` (found by walking up) — `POST /api/rebuild` regenerates the
  CSS in **`projectRoot`**, never in `process.cwd()` (postcss-aware: see the
  pipeline block below).
- `GET /api/theme` also returns `themeRel` (e.g. `pum/theme` or `src/theme`)
  so the pages show the real edited path instead of a hardcoded one.
- **The theme must belong to the project being rebuilt**
  (`themeOwnedByProject` in `resolveTheme`, exposed by `GET /api/theme`): the
  project is the directory with `panda.config.ts`, and its config imports ITS
  `pum/preset`. A `--dir` whose dir has `pum/theme` but **no** own
  `panda.config.ts` (e.g. a nested SPA without `init`) resolves the ancestor
  as projectRoot: editing it would have no effect and the CSS would be written
  to the ancestor, silently. All `POST /api/*` (and `/api/rebuild`) now
  **reject** it with `themeOwnershipError` + hint
  `bunx panda-ui-mithril init --dir=<spa-path>`. An independent SPA
  needs its own `pum/` + `panda.config.ts` (`init --dir=<spa>`); that way
  `config --dir=<spa>` edits and compiles ONLY that sub-project (verified: two
  nested SPAs with different themes and CSS, and the root untouched).

## `config --init`
(`scripts/cli.ts`, same `--dir`) initializes and opens in one
step: if the pointed dir is **not** yet a project (no theme in
`pum/theme`, `src/theme`, `theme` nor the legacy `pum/theme.ts`) it calls
`scaffoldProject()` — the SAME body `init` uses — and then opens the editor;
if it already is, it **touches nothing** and only opens. It is the only
combined form and it is additive by construction (`force: false` always),
because the destructive path remains exclusive to `init --force` (which
overwrites `pum/theme/*.ts` with the package defaults).
`scaffoldProject(cwd, { force, printNextSteps })` is
the shared body: `init` prints the "Next steps" and `config --init` does not
(it has just opened the editor).

## `init` now shares the same `--dir`/`-d` flag
(`scripts/cli.ts`,
`dirFromArgv` — literal copy of `config`'s `themeDirFromArgv` parsing:
`--dir <path>`/`--dir=<path>`/`-d <path>`, resolved to absolute against cwd). Unlike `config --dir` (which only READS an existing project),
`init --dir <path>` WRITES everything there — `pum/`, `panda.config.ts`,
`tsconfig.json`, `postcss.config.cjs`, `pum/index.css` — creating `<path>`
first via `mkdirSync(..., { recursive: true })` if it doesn't exist yet.
Deliberately symmetric with `config --dir`: `init --dir my-app` then later
`config --dir my-app` land on the same project root. Without `--dir`, `init`
still resolves everything against `process.cwd()`, unchanged. Caveat carried
over either way: the generated `panda.config.ts`'s `include` glob
(`./src/**/*...`) is relative to wherever `panda.config.ts` itself ends up —
if the consumer's real `src/` isn't a sibling of `<path>`, `include` needs a
manual edit after `init`.

## Legacy layout migration
(critical): consumers initialized with an OLD
`init` have `pum/theme.ts` as a single file (no `pum/theme/` folder). The
editor cannot edit that layout: `GET/POST /api/theme` respond
`{ ok: false, legacy: true, hint: 'bunx panda-ui-mithril init' }`. The CLI
`init` detects `isLegacyTheme` (theme.ts file exists, no `theme/` dir) and
**migrates automatically**: it parses the legacy values with
`config-ui/theme-io.ts` (`extractBalanced`/`extractCategory` +
`parseColors`/`parseFlat`), copies the new layout, then re-applies the values
via `writeColorsSrc`/`writeFlatSrc` (no-op for tokens the legacy lacks, so
package defaults stay). Verified: 29 values preserved (20 colors + 2 raw +
2 fonts + 4 spacing + 1 radii). `init` skips the "already exists" check for
legacy layouts because migration is exactly what the user needs. `--force`
keeps its full-regeneration semantics. `theme-io.ts` regex rules: `parseFlat`
must NOT require a second closing brace (that bug silently dropped all but the
last token per category); `extractBalanced` must match `marker` followed by
`(` or `=` so `import { defineTokens }` is ignored.

## Fonts API — fonts from npm @fontsource packages
(`config-ui/server.ts`
+ `config-ui/fonts-api.ts`, default provider `https://fontsource.org/`):
- **Flow (no intermediate "install" step)**: the Fontsource catalog only
  serves to SEARCH; "Add" runs **`bun add @fontsource/{id}`** in the
  projectRoot and the font becomes AVAILABLE in `node_modules`; **"Assign" is
  the ONLY operation that loads the font into the system** (it writes the token
  in `pum/theme/fonts.ts` + emits that family's `@font-face`) — the CSS only
  contains assigned and used families (automatic prune against the tokens).
- **Editor state** (derived from `dirname(themeDir)` → `pum/` or `src/`):
  `{root}/fonts-loaded.json` (loaded families: id → family/weights/styles/
  subsets; key `v:`+id for @fontsource-variable). The available packages
  are scanned in `node_modules/@fontsource/*` AND `node_modules/@fontsource-variable/*`
  (metadata.json: id/family/weights/styles/defSubset/version/license).
  `pum/theme/fonts.ts` = which token each family uses.
- **Variable fonts (@fontsource-variable/{id})**: added with
  `bun add @fontsource-variable/{id}` (`variable: true` in add/assign/
  available/unassign/remove/file). One woff2 per subset×style covers the WHOLE
  weight range: the CSS family is `'{Family} Variable'` (read from the
  package's css with `variableFontInfo`), the emitted @font-face uses
  `font-weight: '100 900'` (range) + `format('woff2-variations')` and the file
  `{id}-{subset}-wght-{style}.woff2` (wght axis). The assign of a variable does
  NOT offer weight selection (a single file).
- **Loading = Panda's native path**: the editor writes the key **`globalFontface`**
  (top level of `defineConfig`, lowercase f — the capitalized
  `theme.globalFontFace` emits NOTHING in Panda 1.12, verified) in the
  consumer's `panda.config.ts` under the marker `/* pum:fontfaces */`
  (`buildFontfaceSource`/`writeFontfaceConfig`/`syncBlock` in fonts-api),
  and runs `codegen + cssgen` automatically (`runRebuild` in server.ts).
  cssgen emits the `@font-face` INSIDE `{projectRoot}/{outdir}/styles.css`
  — the app already links that CSS, the HTML is not touched. The `url()` of
  each src is relative to the generated styles.css and points at the package's
  woff2:
  `node_modules/@fontsource/{id}/files/{id}-{subset}-{weight}-{style}.woff2`
  (naming WITH the id prefix; Bun's bundler resolves and inlines it).
- **Assignment (no manual steps)**: "Assign" (font + token + weights/
  styles/subsets) → fonts.ts with `'"Family", system-ui, sans-serif'` (token
  `mono` → `'"Family", monospace'`) + block + rebuild. Unassign resets the
  tokens to a generic stack (`system-ui, sans-serif` / `monospace`).
- **Legacy migration**: old self-hosted installs (`{root}/fonts/{id}`
  with metadata.json) migrate on their own when the editor opens: `bun add` +
  registration in fonts-loaded.json with the legacy weights + deletion of the
  dir and `{root}/fonts.css`.
- **Endpoints**: `GET /api/fonts/search?q=` (proxy of `api.fontsource.org/v1/fonts`
  with a 30 min in-memory cache of the ~540 KB listing, ranking by family/id),
  `POST /api/fonts/add` (bun add), `GET /api/fonts/available` (packages +
  loaded + wired + migrated state), `POST /api/fonts/assign`,
  `POST /api/fonts/unassign`, `POST /api/fonts/remove` (bun remove),
  `GET /api/fonts/file/{id}/{file}` (package woff2 with a traversal guard,
  local preview). Same error contract as `/api/theme` (`legacy` / no theme).
  `POST /api/theme` with `fonts` triggers the block prune (syncBlock).
- **Critical rules**: ids are validated with `/^[a-z0-9-]+$/`; the block and
  fonts-loaded.json are the editor's source of truth (rebuildable); the
  preset's `:root` uses `font-family: var(--fonts-sans)` (the token wins).
  NEVER write `*/` inside a JSDoc in
  these files (e.g. paths with `fonts/` inside a comment): it closes
  the comment and silently breaks the SPA bundle.

## Postcss section — PostCSS plugins from npm packages
(`config-ui/server.ts`
+ `config-ui/postcss-api.ts` + `config-ui/postcss-schemas.ts` + page
`config-ui/pages/postcss/`): manages the project's postcss pipeline
(Panda-as-Plugin model, see the "Consumer preset/source model" section in
[`../AGENTS.md`](../AGENTS.md)):
- **Install tab**: OFFICIAL catalog from `postcss.org/docs/postcss-plugins`
  (scraped from the server-rendered HTML, 13 categories/~353 plugins, 30
  min cache). "Install" runs `bun add {package}` in the projectRoot (npm
  package RESOLVED against the registry with candidates from the href:
  npmjs.com/package, last github segment, name, `postcss-`+name; 1 h cache).
  **`EXTRA_PLUGINS`** (`config-ui/postcss-api.ts`): curated list for plugins
  postcss.org does NOT list (they live only on GitHub) but we still want to
  offer; today it contains `postcss-prune-var`
  (https://github.com/tomasklaen/postcss-prune-var, which does have a schema in
  `postcss-schemas.ts`). They are merged with the scrape via `withExtras()`
  under the `extras` category ("Extras (not listed on postcss.org)") and
  deduplicated by `name` — if postcss.org ever lists it, the official entry
  wins. Its `npm` is hardcoded by hand (there is no npmjs href to deduce
  candidates from). Adding a plugin here means editing that array; the scrape
  does not need to be touched.
- **Available tab**: catalog plugins (official + extras) present in
  node_modules (with a `configurable` flag if a curated schema exists). Note: a
  plugin can be installed and **not** declared in `package.json`/`bun.lock`
  (the real case of `example-pum1`: autoprefixer, cssnano and
  postcss-prune-var entered node_modules the same day and none of them appears
  as a dependency) — `availablePlugins` looks at node_modules, so it shows up
  anyway; but "Remove package" (`bun remove`) on an undeclared package rewrites
  `package.json`/`bun.lock` without deleting the folder.
- **Configure tab** (source = the projectRoot's `postcss.config.cjs`):
  `readPipelineConfig`/`writePipelineConfig` rewrite ONLY the block between
  the markers `/* pum:postcss */` … `/* /pum:postcss */` (manual plugins
  outside the block are preserved); `'@pandacss/dev/postcss'` (base, from
  `postcss-schemas.ts` → `PANDA_PLUGIN_ID`) ALWAYS first and not removable;
  `enabled: false` is omitted when writing. The options editor is generated
  from the curated schemas (`postcss-schemas.ts`): types string/number/boolean/
  enum (value+label)/array/regex/json; FUNCTION options → `editable:false` +
  `notes`. No schema → free JSON editor. Build entry/output (defaults
  `pum/index.css` → `styled-system/styles.css`) are stored in
  `{root}/postcss.build.json` (`readBuildConfig`/`writeBuildConfig`).
- **Runner**: `config-ui/postcss-runner.cjs` runs the pipeline declared in
  the project's `postcss.config.cjs` (require of `postcss` and of each plugin
  from the PROJECT's node_modules via createRequire; supports name→opts
  object, [name, opts] arrays and functions). For the Panda plugin it ALWAYS
  sets explicit `configPath`/`cwd`: if they are not in the block, it uses
  `{ configPath: <projectRoot>/panda.config.ts, cwd: <projectRoot> }` (same
  as build-css.ts); if they are relative, it resolves them against projectRoot
  — so it can point at a different panda config file (plugin schema
  with `configPath`/`cwd`, persisted by serializeManagedBlock).
  `runRebuild` uses it when `hasPostcssConfig(projectRoot)` (after `panda
  codegen`); if not, `cssgen`.
- **Endpoints**: `GET/POST /api/postcss/config` (plugins from the .cjs + build
  config), `GET /api/postcss/catalog?q=`, `GET /api/postcss/available`,
  `POST /api/postcss/install|remove`. Same error contract as /api/theme.
- **Output CSS size**: `GET /api/postcss/config` returns `outputStat`
  and `POST /api/rebuild` returns `output` — `{ path, bytes, gzipBytes, mtime }`,
  or `null` if the file does not exist yet. `outputCssStat()` (`server.ts`)
  resolves the path from `postcss.build.json` when the project has a postcss
  pipeline, or from the `outdir` of `panda.config.ts` (default `styled-system`)
  + `styles.css` in the classic `codegen + cssgen` flow; gzip is computed from
  the file itself because that is what actually travels over the network. The
  page shows it under the "Output CSS" field and in the rebuild alert
  (`formatBytes`/`outputSizeLabel` in `config-ui/pages/postcss/index.jsx`).
  Rebuilds from other pages (theme/fonts) ignore the field — it is additive.
- **Critical rules**: NEVER write `*/` inside a JSDoc (it closes the
  comment and silently breaks the SPA bundle). The managed block is
  serialized with `JSON.stringify` per entry (double-quoted keys,
  valid as JS and parseable by wrapping it in `({ ... })`); the interior of the
  marker pair is evaluated with `new Function('return ({ ' + src + ' })')`.
  The HEADER of the managed file must NOT contain the marker literals
  (`/* pum:postcss */` / `/* /pum:postcss */`) — not even in a
  comment — or `indexOf`/`findManagedBlock` would point at the comment and the
  editor would insert plugins outside `module.exports`. `findManagedBlock`
  locates the pair after `module.exports`; `writePipelineConfig` regenerates
  the file from the scaffold if it is not valid CJS (`isValidCjs`); and in the
  branch with markers the replacement uses the serialized STRING (`managed`),
  never the index object from `findManagedBlock` (shadowing of `block` → bug
  `[object Object]`, fixed).
  `postcss-schemas.ts` does NOT import node (it is bundled into the SPA);
  `postcss-api.ts` and `server.ts` do. The runner never runs against the repo
  itself by default: the repo has no `postcss.config.cjs` (it uses
  `scripts/build-css.ts`).

## Lightningcss section — NATIVE Panda support, NOT a PostCSS plugin
(`config-ui/lightningcss-api.ts` + page `config-ui/pages/lightningcss/`):
manages 3 top-level fields of `panda.config.ts` — `lightningcss:
boolean`, `browserslist: string[]`, `minify: boolean` — verified against the
installed source code (`@pandacss/node`, `@pandacss/core`, version 1.12.0):
- **Why it does NOT live in the PostCSS pipeline**: `lightningcss` is not a
  PostCSS plugin. When `lightningcss: true`, Panda auto-registers internally
  `@pandacss/plugin-lightningcss` (`@pandacss/node`'s `applyAutoPlugins`,
  called from `loadConfigAndCreateContext`) for its own internal hook
  `css:optimize` (`@pandacss/core`'s `optimizeCss`) — the final step where
  Panda polishes the CSS it emits (nesting unwrap, dedup, minify/prettify).
  That hook is invoked the same way via `panda cssgen` (CLI) as inside
  `@pandacss/dev/postcss` (the `Builder.emit()` the Postcss page uses),
  so enabling lightningcss **does not require touching `runRebuild` or
  `postcss-runner.cjs`** — the existing rebuild already respects it.
- **Zero install**: `@pandacss/plugin-lightningcss`, `lightningcss`
  (native binary) and `browserslist` are DIRECT dependencies of
  `@pandacss/node` (see its `package.json`) — they come transitively with
  any already installed `@pandacss/dev`, `bun add` is never needed.
- **"Targets" = browserslist queries**, not lightningcss's raw `Targets`
  object: the real implementation of `@pandacss/plugin-lightningcss`
  does `browserslistToTargets(browserslist(config.browserslist))` — same
  format as `autoprefixer`'s `overrideBrowserslist` in the curated
  Postcss schema. The editor reuses the same array widget as that page.
- **Resolved targets preview** (`GET /api/lightningcss/preview`): resolves
  the **consumer project's** `browserslist`/`lightningcss` (never config-ui's)
  via `require.resolve('@pandacss/plugin-lightningcss/package.json',
  { paths: [projectRoot] })` — it does not assume hoisting, it works with
  nested node_modules. The real `Targets` object (verified at runtime against
  lightningcss 1.31.1) carries 3 more keys than the 9 documented in its `.d.ts`
  (`and_chr`, `and_ff`, `op_mob` — mobile variants); decoded
  version of the lightningcss integer (`major<<16 | minor<<8 | patch`).
- **Managed block** (`/* pum:lightningcss */` … `/* /pum:lightningcss */`)
  inside `defineConfig({...})` in `panda.config.ts` — same marker
  mechanism as `/* pum:fontfaces */` (`fonts-api.ts`), they coexist without
  conflict because each uses its own unique marker. `enabled: false` deletes
  the whole block (config.ts is left clean), just like `writeFontfaceConfig`
  when there are no faces to emit.
- If `autoprefixer`/`cssnano` are still active in the PostCSS pipeline, the
  page warns (text only, it does not touch their config) that they may be
  redundant — lightningcss already prefixes (per targets) and minifies.

## Static Css Recipes section
(`config-ui/staticcss-scan-api.ts` + page
`config-ui/pages/staticcss/`): reduces `staticCss.recipes` from `'*'` (Panda's
default — it generates ALL the library's recipes, ~157 KB in a project
that only uses `Button`) to only those the consumer actually uses.
- **Package graph, computed live, never shipped**: `buildComponentGraph(libRoot)`
  parses `src/index.js` (barrel: exported symbol → folder, it supports a
  folder exporting several symbols like `CardBody`/`CardTitle` → `Card`),
  `package.json`'s `exports` (kebab subpath → folder), and each
  `src/components/*/index.js` (which recipes it imports + which OTHER folders
  it depends on). `libRoot` is `PKG_DIR` from `server.ts` itself — config-ui
  runs FROM the package to be scanned, it does not need to be resolved
  separately.
- **Transitive closure of wrappers** (`closureRecipes`): 10 of the 72
  components import other library components, not just their own
  recipe — verified, not hypothetical: `ButtonClose→Button`,
  `ButtonCopy→Button,Tooltip`, `ColorPicker→Button,ButtonClose,Dropdown,Menu`,
  `Drawer→ButtonClose`, `Dropdown→Button`, `List→Skeleton`,
  `Modal→ButtonClose`, `Navbar→Button,Link`, `RatingGroup→Rating`,
  `Table→Pagination,Select,Skeleton`. Real example: if the consumer only
  imports `Table`, the correct closure is `table, tableOverflow, pagination,
  select, skeleton, button` (the last one because `Pagination` in turn uses
  `button`) — a non-transitive closure would leave parts of the table unstyled,
  silently.
- **Consumer scan** reuses the same `include` glob its
  `panda.config.ts` already has (via `fast-glob`, resolved with `require.resolve`
  from `@pandacss/node` — same pattern robust to nested node_modules as
  `lightningcss-api.ts`), looking for `import {...} from 'panda-ui-mithril'`
  (resolved symbol by symbol against the barrel) and `from
  'panda-ui-mithril/{subpath}'` (resolved against the exports map).
- **Manual recipes** (`{root}/staticcss.json`, same pattern as
  `postcss.build.json`/`fonts-loaded.json`) — **the Scan never touches or
  deletes them**: they are the answer to "how do I add my own custom recipe, or
  something static analysis cannot see (dynamic import, indirect re-export
  through the consumer's own barrel)?". The final value written
  in `staticCss.recipes` is always `scan ∪ manual`, never just one of the
  two.
- **Surgical write of `panda.config.ts`**: `writeStaticCssRecipes`
  locates `staticCss: {...}` by balanced-brace scan (same technique as
  `writeFontfaceConfig` in `fonts-api.ts`) and replaces ONLY the value of
  `recipes:` inside that span — it never touches `css`/`patterns`/`themes` if
  the consumer already has them configured. `enabled: false` restores the
  literal `'*'` string (reverts everything to Panda's safe default, one click).
- **VALID forms of `staticCss.recipes` (verified against Panda 1.12 with
  `panda cssgen` on a clean consumer)**: `'*'` → all the recipes; object
  `{ tag: ['*'] }` → that recipe complete (base + ALL the variants). The two
  "natural" forms people write by hand are **silently broken**:
  `recipes: ['tag']` (array) → Panda does `{...['tag']}` = `{0:'tag'}` and emits
  NOTHING; `recipes: {}` → it emits nothing either. In both cases the
  components are left with no CSS and the most visible symptom is **Tag with
  no padding**, because its padding is not in the `.tag` base but in the size
  variant (`.tag--size_md { padding-inline: … }`): it serves as a canary.
  Diagnosis on a consumer: `grep -o '\.tag--size_md{[^}]*}' styled-system/styles.css`.
- **Editor guards** (added after reproducing the above): the empty list
  with `enabled: true` **is rejected** (`{}` = no recipe; to disable there is
  `'*'`); `findRecipesValueSpan` also understands the array form, so
  `readStaticCssRecipes` reads it (before it reported it as `'*'`, lying in the
  UI) and on save it is rewritten in the canonical form; and if `recipes` exists
  with an unrecognizable form (a variable, a call) an **error is thrown** in
  place of inserting a SECOND `recipes:` key — before that left the old value
  winning (in JS the last key wins) and broke the CSS right after saving
  from the editor.
- **Explicit risk, not hidden**: unlike fonts/postcss/lightningcss
  (additive, reverting is just deleting a block), this replaces the value of
  a field that ALREADY EXISTED with working content — an incomplete static
  analysis means broken CSS in production (component with no style, silently).
  That is why the toggle is `enabled: false` by default, the Scan
  always shows a preview (detected components + resulting recipes)
  before saving, and the manual field exists as an explicit safety net.

## Advanced section
(`config-ui/advanced-config-api.ts` + page
`config-ui/pages/advanced/`): CURATED subset of top-level fields
of `defineConfig` that had no page of their own — `preflight`, `strictTokens`,
`strictPropertyValues`, `hash`, `clean` (additive block `/* pum:advanced */`,
same mechanism as `/* pum:lightningcss */`) + `include`/`exclude`
(surgical replacement, same balanced-brace scan as `staticCss.recipes` —
`include` ALREADY exists unmarked in `cli.ts`'s scaffold, so it cannot
be a new additive block). `polyfill` (Panda) lives on the
Lightningcss page instead of here — it is part of the same topic (old
browser targets) and, unlike `lightningcss`/`browserslist`/`minify`, it is
**independent** of whether lightningcss is active: `writeLightningcssConfig`
only adds the `lightningcss`/`browserslist`/`minify` lines when
`enabled` is `true`, but `polyfill` is always written when it is `true`, and the
whole block is only deleted when BOTH (`enabled` and `polyfill`) are at
their default — verified with a real `polyfill: true` + `enabled: false`
against `example-pum1`.
- **Deliberately excluded** from this page (see the file header
  for the full per-field reasoning): `jsxFramework`/`jsxFactory`
  (fixed to Mithril by the scaffold — exposing them breaks the package),
  `outdir` (already documented as a footgun if it is not `styled-system`),
  `layers`/`separator` (they need to regenerate `pum/index.css` too, which
  today hardcodes `@layer reset, base, tokens, recipes, utilities;`),
  `hooks`/`plugins`/`presets`/`eject` (JS functions or too structural,
  not serializable to a form), `studio` (a DIFFERENT visual tool
  that Panda already ships), custom `themes`/`utilities`/
  `patterns` (PUM already solves those cases with its own system).
- **`prefix` — SUSPENDED at the user's request** (`{ cssVar, className }`,
  NOT a single string even though Panda also accepts that short form): it was
  implemented, tested and then withdrawn from the UI/API after empirically
  verifying that the risk is **far more serious than a stray
  selector** — `prefix.className` breaks the **entire package**, not just the
  17 recipes that reference classes of OTHER components as a literal CSS
  selector (`'& > .button:not(:first-child)'` in `buttonGroup.ts`/
  `join.ts`, `'& > .drawer-box'` in `drawer.ts`, etc.). Root cause: each
  PUM component imports its recipe (class names included) from
  panda-ui-mithril's OWN `styled-system/recipes`, precompiled and
  frozen when the package is published to npm — the CONSUMER's
  `panda.config.ts` `prefix` can only re-prefix the CSS generated by the
  consumer's Panda run, never that already-compiled and
  distributed JS. Verified end-to-end against the real package installed in
  `example-pum1` (not against the panda-ui-mithril repo, whose own build
  would indeed stay consistent): with `prefix.className: 'pum'` saved and
  rebuilt via the real UI (Save → Rebuild CSS → `bunx panda codegen` +
  postcss pipeline), the generated CSS ends up with classes like
  `.pum-button--size_md{...}` and `.pum-button-group>.button:not(:first-
  child){margin-inline-start:...}`, but the `<button>` rendered by the
  `Button` imported from `node_modules/panda-ui-mithril` still has the class
  WITHOUT a prefix (`class="button button--size_md ..."`) — total mismatch, zero
  rules match, the component loses ALL its styling (not just
  `ButtonGroup`'s border merge). `cssVar` does NOT have this problem —
  every token consumption goes through the `token()` macro that Panda resolves
  at compile-time regardless of the prefix, so it correctly namespaces
  the custom properties (`--pum-colors-primary`) without touching
  any class name — if this field is picked up again in the future, it must be
  **cssVar-only**, never className.
