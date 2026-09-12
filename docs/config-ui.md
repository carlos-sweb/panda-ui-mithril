# Config UI (theme editor) — `bunx panda-ui-mithril config`

Detalle de implementación del editor de theme (`config-ui/`). **Este archivo
complementa la sección "Config UI" de [`../AGENTS.md`](../AGENTS.md)**, que
conserva la resolución del target, las guards y las invariantes por sección;
aquí está la mecánica completa: endpoints, formatos en disco, reglas de
serialización y el porqué de cada decisión.

Léelo antes de tocar `config-ui/*.ts`, `panda-config-ui.config.ts`, o de
escribir una sección nueva del editor.

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
- `--dir <ruta>` / `--dir=<ruta>` / `-d <ruta>` / `-d=<ruta>` (read from
  `process.argv`): explicit base. Ambas formas; una ruta relativa se
  resuelve contra el cwd, así que `config --dir=src/pages/login` apunta al
  sub-proyecto (con su propio `pum/` + `panda.config.ts`) y no a la raíz.
  Accepts a project root (`pum/theme` → `src/theme` → `theme` subdirs are
  tried inside it), or a theme dir directly (has `colors.ts`).
- `--port <n>` / `--port=<n>` / `-p <n>` (read from `process.argv`): server
  port (default **1234**).
- `--no-open` (o `BROWSER=none`): NO abre el navegador del sistema al arrancar
  (la URL se imprime igual en stdout). Para revisiones repetidas / scripts /
  CI: sin esto cada reinicio abre una pestaña nueva.
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
- **El theme debe pertenecer al proyecto que se recompila**
  (`themeOwnedByProject` en `resolveTheme`, expuesto por `GET /api/theme`): el
  proyecto es el directorio con `panda.config.ts`, y su config importa SU
  `pum/preset`. Un `--dir` cuyo dir tiene `pum/theme` pero **no** su propio
  `panda.config.ts` (p. ej. un SPA anidado sin `init`) resuelve como
  projectRoot el ancestro: editarlo no tendría efecto y el CSS se escribiría
  en el ancestro, en silencio. Todos los `POST /api/*` (y `/api/rebuild`)
  ahora lo **rechazan** con `themeOwnershipError` + hint
  `bunx panda-ui-mithril init --dir=<ruta-del-spa>`. Un SPA independiente
  necesita su propio `pum/` + `panda.config.ts` (`init --dir=<spa>`); así
  `config --dir=<spa>` edita y compila SOLO ese sub-proyecto (verificado: dos
  SPAs anidados con temas y CSS distintos, y la raíz intacta).

## `config --init`
(`scripts/cli.ts`, mismo `--dir`) inicializa y abre en un
paso: si el dir apuntado **no** es todavía un proyecto (sin theme en
`pum/theme`, `src/theme`, `theme` ni el legacy `pum/theme.ts`) llama a
`scaffoldProject()` — el MISMO cuerpo que usa `init` — y luego abre el editor;
si ya lo es, **no toca nada** y solo abre. Es la única forma combinada y es
aditiva por construcción (`force: false` siempre), porque la vía destructiva
sigue siendo exclusiva de `init --force` (que sobrescribe `pum/theme/*.ts` con
los defaults del paquete). `scaffoldProject(cwd, { force, printNextSteps })` es
el cuerpo compartido: `init` imprime los "Next steps" y `config --init` no
(acaba de abrir el editor).

## `init` now shares the same `--dir`/`-d` flag
(`scripts/cli.ts`,
`dirFromArgv` — literal copy of `config`'s `themeDirFromArgv` parsing:
`--dir <ruta>`/`--dir=<ruta>`/`-d <ruta>`, resuelto a absoluto contra cwd). Unlike `config --dir` (which only READS an existing project),
`init --dir <ruta>` WRITES everything there — `pum/`, `panda.config.ts`,
`tsconfig.json`, `postcss.config.cjs`, `pum/index.css` — creating `<ruta>`
first via `mkdirSync(..., { recursive: true })` if it doesn't exist yet.
Deliberately symmetric with `config --dir`: `init --dir mi-app` then later
`config --dir mi-app` land on the same project root. Without `--dir`, `init`
still resolves everything against `process.cwd()`, unchanged. Caveat carried
over either way: the generated `panda.config.ts`'s `include` glob
(`./src/**/*...`) is relative to wherever `panda.config.ts` itself ends up —
if the consumer's real `src/` isn't a sibling of `<ruta>`, `include` needs a
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

## Fonts API — fuentes por paquetes npm @fontsource
(`config-ui/server.ts`
+ `config-ui/fonts-api.ts`, proveedor por defecto `https://fontsource.org/`):
- **Flujo (sin paso intermedio de "instalar")**: el catálogo de Fontsource solo
  sirve para BUSCAR; "Add" ejecuta **`bun add @fontsource/{id}`** en el
  projectRoot y la fuente queda DISPONIBLE en `node_modules`; **"Assign" es la
  ÚNICA operación que carga la fuente al sistema** (escribe el token en
  `pum/theme/fonts.ts` + emite los `@font-face` de esa familia) — el CSS solo
  contiene familias asignadas y usadas (prune automático contra los tokens).
- **Estado del editor** (derivado de `dirname(themeDir)` → `pum/` o `src/`):
  `{raiz}/fonts-loaded.json` (familias cargadas: id → family/weights/styles/
  subsets; clave `v:`+id para @fontsource-variable). Los paquetes disponibles
  se escanean en `node_modules/@fontsource/*` Y `node_modules/@fontsource-variable/*`
  (metadata.json: id/family/weights/styles/defSubset/version/license).
  `pum/theme/fonts.ts` = qué token usa cada familia.
- **Fuentes variable (@fontsource-variable/{id})**: se añaden con
  `bun add @fontsource-variable/{id}` (`variable: true` en add/assign/
  available/unassign/remove/file). Un woff2 por subset×estilo cubre TODO el
  rango de pesos: la family del CSS es `'{Familia} Variable'` (se lee del css
  del paquete con `variableFontInfo`), el @font-face emitido usa
  `font-weight: '100 900'` (rango) + `format('woff2-variations')` y el archivo
  `{id}-{subset}-wght-{style}.woff2` (eje wght). El assign de una variable NO
  ofrece selección de pesos (un solo archivo).
- **Carga = vía nativa de Panda**: el editor escribe la clave **`globalFontface`**
  (nivel superior de `defineConfig`, f minúscula — la `theme.globalFontFace`
  mayúscula NO emite nada en Panda 1.12, verificado) en el `panda.config.ts`
  del consumidor bajo el marker `/* pum:fontfaces */`
  (`buildFontfaceSource`/`writeFontfaceConfig`/`syncBlock` en fonts-api),
  y corre `codegen + cssgen` automáticamente (`runRebuild` en server.ts).
  cssgen emite los `@font-face` DENTRO de `{projectRoot}/{outdir}/styles.css`
  — la app ya linkea ese CSS, no se toca el HTML. El `url()` de cada src es
  relativo al styles.css generado y apunta al woff2 del paquete:
  `node_modules/@fontsource/{id}/files/{id}-{subset}-{peso}-{estilo}.woff2`
  (naming CON prefijo del id; el bundler de Bun lo resuelve e inlinea).
- **Asignación (sin pasos manuales)**: "Assign" (fuente + token + pesos/
  estilos/subsets) → fonts.ts con `'"Family", system-ui, sans-serif'` (token
  `mono` → `'"Family", monospace'`) + bloque + rebuild. Unassign resetea los
  tokens a stack genérico (`system-ui, sans-serif` / `monospace`).
- **Migración legacy**: instalaciones self-hosted antiguas (`{raiz}/fonts/{id}`
  con metadata.json) se migran solas al abrir el editor: `bun add` + registro
  en fonts-loaded.json con los pesos del legacy + borrado del dir y
  `{raiz}/fonts.css`.
- **Endpoints**: `GET /api/fonts/search?q=` (proxy de `api.fontsource.org/v1/fonts`
  con caché en memoria de 30 min del listado ~540 KB, ranking por family/id),
  `POST /api/fonts/add` (bun add), `GET /api/fonts/available` (paquetes +
  estado cargado + wired + migrated), `POST /api/fonts/assign`,
  `POST /api/fonts/unassign`, `POST /api/fonts/remove` (bun remove),
  `GET /api/fonts/file/{id}/{file}` (woff2 del paquete con guard de traversal,
  preview local). Mismo contrato de error que `/api/theme` (`legacy` / sin theme).
  `POST /api/theme` con `fonts` dispara el prune del bloque (syncBlock).
- **Reglas críticas**: los ids se validan con `/^[a-z0-9-]+$/`; el bloque y
  fonts-loaded.json son fuente de verdad del editor (reconstruibles); el
  `:root` del preset usa `font-family: var(--fonts-sans)` (el token manda).
  NUNCA escribas `*/` dentro de un JSDoc en
  estos archivos (p. ej. rutas con `fonts/` dentro de un comentario): cierra
  el comentario y rompe el bundle de la SPA en silencio.

## Postcss section — plugins de PostCSS por paquetes npm
(`config-ui/server.ts`
+ `config-ui/postcss-api.ts` + `config-ui/postcss-schemas.ts` + página
`config-ui/pages/postcss/`): gestiona el pipeline postcss del proyecto
(modelo Panda-as-Plugin, ver la sección "Consumer preset/source model" en
[`../AGENTS.md`](../AGENTS.md)):
- **Viñeta Install**: catálogo OFICIAL de `postcss.org/docs/postcss-plugins`
  (scrapeado del HTML server-rendered, 13 categorías/~353 plugins, caché 30
  min). "Install" ejecuta `bun add {paquete}` en el projectRoot (paquete npm
  RESUELTO contra la registry con candidatos del href: npmjs.com/package,
  último segmento github, nombre, `postcss-`+nombre; caché 1 h).
  **`EXTRA_PLUGINS`** (`config-ui/postcss-api.ts`): lista curada para plugins
  que postcss.org NO lista (viven solo en GitHub) pero queremos ofrecer igual;
  hoy contiene `postcss-prune-var`
  (https://github.com/tomasklaen/postcss-prune-var, que sí tiene esquema en
  `postcss-schemas.ts`). Se fusionan con el scrapeo vía `withExtras()` bajo la
  categoría `extras` ("Extras (not listed on postcss.org)") y se deduplican
  por `name` — si algún día postcss.org lo lista, gana la entrada oficial. El
  `npm` va fijado a mano (no hay href de npmjs del que deducir candidatos).
  Añadir un plugin aquí es editar ese array; no hace falta tocar el scrapeo.
- **Viñeta Available**: plugins del catálogo (oficial + extras) presentes en
  node_modules (con flag `configurable` si hay esquema curado). Ojo: un plugin
  puede estar instalado y **no** declarado en `package.json`/`bun.lock` (el
  caso real de `example-pum1`: autoprefixer, cssnano y postcss-prune-var
  entraron a node_modules el mismo día y ninguno figura como dependencia) —
  `availablePlugins` mira node_modules, así que igual aparece; pero
  "Remove package" (`bun remove`) sobre un paquete no declarado reescribe
  `package.json`/`bun.lock` sin borrar la carpeta.
- **Viñeta Configure** (fuente = `postcss.config.cjs` del projectRoot):
  `readPipelineConfig`/`writePipelineConfig` reescriben SOLO el bloque entre
  los markers `/* pum:postcss */` … `/* /pum:postcss */` (plugins manuales
  fuera del bloque se conservan); `'@pandacss/dev/postcss'` (base, de
  `postcss-schemas.ts` → `PANDA_PLUGIN_ID`) SIEMPRE primero y no removible;
  `enabled: false` se omite al escribir. El editor de opciones se genera de
  los esquemas curados (`postcss-schemas.ts`): tipos string/number/boolean/
  enum (value+label)/array/regex/json; opciones FUNCIÓN → `editable:false` +
  `notes`. Sin esquema → editor JSON libre. Build entry/output (defaults
  `pum/index.css` → `styled-system/styles.css`) se guardan en
  `{raiz}/postcss.build.json` (`readBuildConfig`/`writeBuildConfig`).
- **Runner**: `config-ui/postcss-runner.cjs` ejecuta el pipeline declarado en
  el `postcss.config.cjs` del proyecto (require de `postcss` y de cada plugin
  desde el node_modules del PROYECTO vía createRequire; soporta objeto
  name→opts, arrays [name, opts] y funciones). Para el plugin de Panda fija
  SIEMPRE `configPath`/`cwd` explícitos: si no vienen en el bloque, usa
  `{ configPath: <projectRoot>/panda.config.ts, cwd: <projectRoot> }` (igual
  que build-css.ts); si vienen relativos, los resuelve contra projectRoot —
  así se puede apuntar a un config file panda distinto (esquema del plugin
  con `configPath`/`cwd`, persistidos por serializeManagedBlock).
  `runRebuild` lo usa cuando `hasPostcssConfig(projectRoot)` (tras `panda
  codegen`); si no, `cssgen`.
- **Endpoints**: `GET/POST /api/postcss/config` (plugins del .cjs + build
  config), `GET /api/postcss/catalog?q=`, `GET /api/postcss/available`,
  `POST /api/postcss/install|remove`. Mismo contrato de error que /api/theme.
- **Tamaño del CSS de salida**: `GET /api/postcss/config` devuelve `outputStat`
  y `POST /api/rebuild` devuelve `output` — `{ path, bytes, gzipBytes, mtime }`,
  o `null` si el archivo todavía no existe. `outputCssStat()` (`server.ts`)
  resuelve la ruta desde `postcss.build.json` cuando el proyecto tiene pipeline
  postcss, o desde el `outdir` del `panda.config.ts` (default `styled-system`)
  + `styles.css` en el flujo clásico `codegen + cssgen`; el gzip se calcula del
  propio archivo porque es lo que realmente viaja por la red. La página lo
  muestra bajo el campo "Output CSS" y en la alerta del rebuild
  (`formatBytes`/`outputSizeLabel` en `config-ui/pages/postcss/index.jsx`). Los
  rebuilds de otras páginas (theme/fonts) ignoran el campo — es aditivo.
- **Reglas críticas**: NUNCA escribas `*/` dentro de un JSDoc (cierra el
  comentario y rompe el bundle de la SPA en silencio). El bloque gestionado se
  serializa con `JSON.stringify` por entrada (claves con comillas dobles,
  válido como JS y parseable envolviéndolo en `({ ... })`); el interior del
  par de markers se evalúa con `new Function('return ({ ' + src + ' })')`.
  La CABECERA del archivo gestionado NO debe contener los literales de los
  markers (`/* pum:postcss */` / `/* /pum:postcss */`) — ni siquiera en un
  comentario — o `indexOf`/`findManagedBlock` apuntarían al comentario y el
  editor insertaría plugins fuera de `module.exports`. `findManagedBlock`
  localiza el par tras `module.exports`; `writePipelineConfig` regenera el
  archivo desde el scaffold si no es CJS válido (`isValidCjs`); y en la rama
  con markers el reemplazo usa el STRING serializado (`managed`), nunca el
  objeto de índices de `findManagedBlock` (sombreado de `block` → bug
  `[object Object]`, corregido).
  `postcss-schemas.ts` NO importa node (se bundlea en la SPA); `postcss-api.ts`
  y `server.ts` sí. El runner nunca se ejecuta contra el propio repo por
  defecto: el repo no tiene `postcss.config.cjs` (usa `scripts/build-css.ts`).

## Lightningcss section — soporte NATIVO de Panda, NO un plugin PostCSS
(`config-ui/lightningcss-api.ts` + página `config-ui/pages/lightningcss/`):
gestiona 3 campos de nivel superior de `panda.config.ts` — `lightningcss:
boolean`, `browserslist: string[]`, `minify: boolean` — verificados contra el
código fuente instalado (`@pandacss/node`, `@pandacss/core`, versión 1.12.0):
- **Por qué NO vive en el pipeline PostCSS**: `lightningcss` no es un plugin
  PostCSS. Cuando `lightningcss: true`, Panda auto-registra internamente
  `@pandacss/plugin-lightningcss` (`@pandacss/node`'s `applyAutoPlugins`,
  llamada desde `loadConfigAndCreateContext`) para su propio hook interno
  `css:optimize` (`@pandacss/core`'s `optimizeCss`) — el paso final donde
  Panda pule el CSS que emite (unwrap de nesting, dedup, minify/prettify).
  Ese hook se invoca igual vía `panda cssgen` (CLI) que dentro de
  `@pandacss/dev/postcss` (el `Builder.emit()` que usa la página Postcss),
  así que activar lightningcss **no requiere tocar `runRebuild` ni
  `postcss-runner.cjs`** — el rebuild existente ya lo respeta.
- **Cero instalación**: `@pandacss/plugin-lightningcss`, `lightningcss`
  (binario nativo) y `browserslist` son dependencias DIRECTAS de
  `@pandacss/node` (ver su `package.json`) — vienen transitivamente con
  cualquier `@pandacss/dev` ya instalado, nunca hace falta `bun add`.
- **"Targets" = queries de browserslist**, no el objeto `Targets` crudo de
  lightningcss: la implementación real de `@pandacss/plugin-lightningcss`
  hace `browserslistToTargets(browserslist(config.browserslist))` — mismo
  formato que `overrideBrowserslist` de `autoprefixer` en el esquema curado
  de Postcss. El editor reusa el mismo widget de array que esa página.
- **Preview de targets resueltos** (`GET /api/lightningcss/preview`): resuelve
  el `browserslist`/`lightningcss` **del proyecto consumidor** (nunca los de
  config-ui) vía `require.resolve('@pandacss/plugin-lightningcss/package.json',
  { paths: [projectRoot] })` — no asume hoisting, funciona con node_modules
  anidado. El objeto `Targets` real (verificado en runtime contra
  lightningcss 1.31.1) trae 3 claves más de las 9 documentadas en su `.d.ts`
  (`and_chr`, `and_ff`, `op_mob` — variantes móviles); versión decodificada
  del entero de lightningcss (`major<<16 | minor<<8 | patch`).
- **Bloque gestionado** (`/* pum:lightningcss */` … `/* /pum:lightningcss */`)
  dentro de `defineConfig({...})` en `panda.config.ts` — mismo mecanismo de
  markers que `/* pum:fontfaces */` (`fonts-api.ts`), coexisten sin conflicto
  porque cada uno usa su propio marker único. `enabled: false` borra el
  bloque entero (config.ts queda limpio), igual que `writeFontfaceConfig`
  cuando no hay caras que emitir.
- Si `autoprefixer`/`cssnano` siguen activos en el pipeline PostCSS, la
  página avisa (solo texto, no toca su config) de que pueden ser redundantes
  — lightningcss ya prefija (según targets) y minifica.

## Static Css Recipes section
(`config-ui/staticcss-scan-api.ts` + página
`config-ui/pages/staticcss/`): reduce `staticCss.recipes` de `'*'` (default
de Panda — genera TODOS los recipes de la librería, ~157 KB en un proyecto
que solo usa `Button`) a solo los que el consumidor realmente usa.
- **Grafo del paquete, calculado en vivo, nunca shippeado**: `buildComponentGraph(libRoot)`
  parsea `src/index.js` (barrel: símbolo exportado → carpeta, soporta que una
  carpeta exporte varios símbolos como `CardBody`/`CardTitle` → `Card`),
  `package.json`'s `exports` (subpath kebab → carpeta), y cada
  `src/components/*/index.js` (qué recipes importa + de qué OTRAS carpetas
  depende). `libRoot` es `PKG_DIR` del propio `server.ts` — config-ui corre
  DESDE el paquete que hay que escanear, no hace falta resolverlo aparte.
- **Cierre transitivo de wrappers** (`closureRecipes`): 10 de los 72
  componentes importan otros componentes de la librería, no solo su propio
  recipe — verificado, no es hipotético: `ButtonClose→Button`,
  `ButtonCopy→Button,Tooltip`, `ColorPicker→Button,ButtonClose,Dropdown,Menu`,
  `Drawer→ButtonClose`, `Dropdown→Button`, `List→Skeleton`,
  `Modal→ButtonClose`, `Navbar→Button,Link`, `RatingGroup→Rating`,
  `Table→Pagination,Select,Skeleton`. Ejemplo real: si el consumidor solo
  importa `Table`, el cierre correcto es `table, tableOverflow, pagination,
  select, skeleton, button` (el último porque `Pagination` a su vez usa
  `button`) — un cierre no transitivo dejaría partes de la tabla sin estilo,
  en silencio.
- **Escaneo del consumidor** reusa el mismo glob `include` que ya tiene su
  `panda.config.ts` (vía `fast-glob`, resuelto con `require.resolve` desde
  `@pandacss/node` — mismo patrón robusto a node_modules anidado que
  `lightningcss-api.ts`), buscando `import {...} from 'panda-ui-mithril'`
  (resuelto símbolo a símbolo contra el barrel) y `from
  'panda-ui-mithril/{subpath}'` (resuelto contra el exports map).
- **Recipes manuales** (`{raiz}/staticcss.json`, mismo patrón que
  `postcss.build.json`/`fonts-loaded.json`) — **el Scan nunca los toca ni
  los borra**: son la respuesta a "¿cómo agrego mi propio recipe custom, o
  algo que el análisis estático no puede ver (import dinámico, re-export
  indirecto por un barrel propio del consumidor)?". El valor final escrito
  en `staticCss.recipes` es siempre `scan ∪ manual`, nunca solo uno de los
  dos.
- **Escritura quirúrgica de `panda.config.ts`**: `writeStaticCssRecipes`
  localiza `staticCss: {...}` por balanced-brace scan (mismo técnica que
  `writeFontfaceConfig` en `fonts-api.ts`) y reemplaza SOLO el valor de
  `recipes:` dentro de ese span — nunca toca `css`/`patterns`/`themes` si el
  consumidor ya los tiene configurados. `enabled: false` restaura el string
  `'*'` literal (revierte todo al default seguro de Panda, un click).
- **Formas VÁLIDAS de `staticCss.recipes` (verificado contra Panda 1.12 con
  `panda cssgen` en un consumidor limpio)**: `'*'` → todos los recipes; objeto
  `{ tag: ['*'] }` → ese recipe completo (base + TODAS las variantes). Las dos
  formas "naturales" que la gente escribe a mano están **rotas en silencio**:
  `recipes: ['tag']` (array) → Panda hace `{...['tag']}` = `{0:'tag'}` y no
  emite NADA; `recipes: {}` → tampoco emite nada. En ambos casos los
  componentes quedan sin CSS y el síntoma más visible es **Tag sin padding**,
  porque su padding no está en la base `.tag` sino en la variante de tamaño
  (`.tag--size_md { padding-inline: … }`): sirve de canario. Diagnóstico en un
  consumidor: `grep -o '\.tag--size_md{[^}]*}' styled-system/styles.css`.
- **Guardas del editor** (añadidas tras reproducir lo anterior): la lista vacía
  con `enabled: true` **se rechaza** (`{}` = ningún recipe; para desactivar está
  `'*'`); `findRecipesValueSpan` entiende también la forma array, así que
  `readStaticCssRecipes` la lee (antes la reportaba como `'*'`, mintiendo en la
  UI) y al guardar se reescribe en la forma canónica; y si `recipes` existe con
  una forma no reconocible (una variable, una llamada) se **lanza un error** en
  vez de insertar una SEGUNDA clave `recipes:` — antes eso dejaba el valor viejo
  ganando (en JS gana la última clave) y rompía el CSS justo después de guardar
  desde el editor.
- **Riesgo explícito, no oculto**: a diferencia de fonts/postcss/lightningcss
  (aditivos, revertir es solo borrar un bloque), esto reemplaza el valor de
  un campo que YA EXISTÍA con contenido funcional — un análisis estático
  incompleto significa CSS roto en producción (componente sin estilo, en
  silencio). Por eso el toggle es `enabled: false` por defecto, el Scan
  siempre muestra preview (componentes detectados + recipes resultantes)
  antes de guardar, y el campo manual existe como red de seguridad explícita.

## Advanced section
(`config-ui/advanced-config-api.ts` + página
`config-ui/pages/advanced/`): subconjunto CURADO de campos de nivel superior
de `defineConfig` que no tenían página propia — `preflight`, `strictTokens`,
`strictPropertyValues`, `hash`, `clean` (bloque aditivo `/* pum:advanced */`,
mismo mecanismo que `/* pum:lightningcss */`) + `include`/`exclude`
(reemplazo quirúrgico, mismo balanced-brace scan que `staticCss.recipes` —
`include` YA existe sin marcar en el scaffold de `cli.ts`, así que no puede
ser un bloque aditivo nuevo). `polyfill` (Panda) vive en la página
Lightningcss en vez de aquí — es del mismo tema (targets de navegadores
viejos) y, a diferencia de `lightningcss`/`browserslist`/`minify`, es
**independiente** de si lightningcss está activo: `writeLightningcssConfig`
solo agrega las líneas `lightningcss`/`browserslist`/`minify` cuando
`enabled` es `true`, pero `polyfill` se escribe siempre que sea `true`, y el
bloque entero solo se borra cuando AMBOS (`enabled` y `polyfill`) están en
su default — verificado con un `polyfill: true` + `enabled: false` real
contra `example-pum1`.
- **Deliberadamente excluidos** de esta página (ver el header del archivo
  para el razonamiento completo por campo): `jsxFramework`/`jsxFactory`
  (fijos a Mithril por el scaffold — exponerlos rompe el paquete),
  `outdir` (ya documentado como footgun si no es `styled-system`),
  `layers`/`separator` (necesitan regenerar `pum/index.css` también, que
  hoy hardcodea `@layer reset, base, tokens, recipes, utilities;`),
  `hooks`/`plugins`/`presets`/`eject` (funciones JS o demasiado estructural,
  no serializable a un formulario), `studio` (una herramienta visual
  DISTINTA que ya trae Panda), `themes`/`utilities`/
  `patterns` custom (PUM ya resuelve esos casos con su propio sistema).
- **`prefix` — SUSPENDIDO a pedido del usuario** (`{ cssVar, className }`,
  NO un string único aunque Panda también acepta esa forma corta): se
  implementó, se probó y luego se retiró de la UI/API tras verificar
  empíricamente que el riesgo es **mucho más grave que un selector
  suelto** — `prefix.className` rompe el **paquete completo**, no solo los
  17 recipes que referencian clases de OTROS componentes como selector CSS
  literal (`'& > .button:not(:first-child)'` en `buttonGroup.ts`/
  `join.ts`, `'& > .drawer-box'` en `drawer.ts`, etc.). Causa raíz: cada
  componente de PUM importa su recipe (nombres de clase incluidos) desde
  el `styled-system/recipes` PROPIO de panda-ui-mithril, precompilado y
  congelado al publicar el paquete en npm — el `prefix` del
  `panda.config.ts` del CONSUMIDOR solo puede reprefijar el CSS que genera
  la corrida de Panda del consumidor, nunca ese JS ya compilado y
  distribuido. Verificado end-to-end contra el paquete real instalado en
  `example-pum1` (no contra el repo de panda-ui-mithril, cuyo propio build
  sí quedaría consistente): con `prefix.className: 'pum'` guardado y
  reconstruido vía la UI real (Save → Rebuild CSS → `bunx panda codegen` +
  pipeline postcss), el CSS generado queda con clases como
  `.pum-button--size_md{...}` y `.pum-button-group>.button:not(:first-
  child){margin-inline-start:...}`, pero el `<button>` renderizado por el
  `Button` importado de `node_modules/panda-ui-mithril` sigue con la clase
  SIN prefijo (`class="button button--size_md ..."`) — desajuste total, cero
  reglas matchean, el componente pierde TODO su estilo (no solo el
  fusionado de bordes de `ButtonGroup`). `cssVar` NO tiene este problema —
  todo consumo de tokens pasa por el macro `token()` que Panda resuelve en
  compile-time independientemente del prefijo, así que namespacea
  correctamente las custom properties (`--pum-colors-primary`) sin tocar
  ningún nombre de clase — si se retoma este campo en el futuro, debe ser
  **cssVar-only**, nunca className.
