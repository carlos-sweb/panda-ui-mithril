# vite-to-bun-migration - Work Plan

## TL;DR (For humans)

Migrar el proyecto de Vite a Bun como runtime y bundler. Esto cubre el dev server del playground, el build estático del playground (→ `dist-playground/`), y el build de la librería npm (→ `dist/`). Bun soporta HTML nativamente, JSX/TSX sin configuración, y CSS bundling. La principal dificultad es reemplazar `import.meta.glob` (Vite-only) con imports estáticos. Panda CSS funciona igual: codegen primero, Bun empaqueta el CSS generado.

**Lo que cambiará:** `package.json` scripts, se crea `bunfig.toml` y `scripts/build.ts`, se elimina `vite.config.js` y la dependencia `vite`.
**Lo que NO cambiará:** `src/`, `styled-system/`, `playground/components/`, `playground/pages/`, contenido de componentes.
**Riesgo bajo:** Bun 1.3 tiene HTML bundling estable. El cambio es mecánico, no hay lógica nueva.

## Scope

### IN
- Dev server del playground → `bun playground/index.html`
- Build del playground → `bun build` → `dist-playground/`
- Build de la librería npm → `Bun.build()` → `dist/`
- Reemplazo de `import.meta.glob` en `playground/main.jsx`
- Creación de `bunfig.toml` para alias y configuración
- Creación de `scripts/build.ts` para build programático
- Eliminación de `vite.config.js` y `postcss.config.mjs`
- Eliminación de `vite` de `devDependencies`

### OUT
- Contenido de componentes (`src/components/`)
- Contenido de páginas del playground (`playground/pages/`)
- Configuración de Panda CSS (`panda.config.ts`)
- Contenido de `styled-system/` (auto-generado)
- Tests (no existen actualmente)

## Verification strategy

Cada todo se verifica con:
1. **Happy path**: El comando/acción funciona sin errores
2. **Build output**: Los archivos de salida existen y son válidos
3. **Dev server**: El sitio carga correctamente en el navegador
4. **Diagnostics**: `lsp_diagnostics` limpio en archivos modificados
5. **Typecheck**: `bun run typecheck` pasa

## Execution strategy

**Onda 1** (preparación): Crear archivos de configuración Bun, modificar imports en main.jsx
**Onda 2** (core): Actualizar package.json, eliminar archivos Vite
**Onda 3** (verificación): Probar dev server, ambos builds, y typecheck

## Todos

### Onda 1 — Preparación

- [ ] 1. Crear `bunfig.toml` con configuración de aliases y JSX
  - Referencias: `vite.config.js` (líneas 6-10 para aliases), `tsconfig.json` (líneas 13-16 para paths)
  - Acceptance: Archivo `bunfig.toml` existe con aliases `[resolve]` para `panda-ui-mithril` → `./src/index.js` y `panda-ui` → `./styled-system`
  - QA happy: `cat bunfig.toml` muestra secciones `[resolve]` correctas
  - QA failure: Si Bun no lee el toml, el dev server falla al resolver imports
  - Commit: `feat: add bunfig.toml with resolve aliases`

- [ ] 2. Reemplazar `import.meta.glob` en `playground/main.jsx` con imports estáticos
  - Referencias: `playground/main.jsx:14` (`import.meta.glob('./pages/*.jsx', { eager: true })`), listar `playground/pages/*.jsx` (59 archivos)
  - Acceptance: Se importan manualmente los 59 archivos de páginas, se construye el objeto `routes` con la misma lógica que antes
  - QA happy: `bun build playground/main.jsx --outdir /tmp/test-build` no falla por import.meta.glob
  - QA failure: Si algún import falla, el build rompe
  - Commit: `refactor: replace import.meta.glob with static imports in main.jsx`

- [ ] 3. Crear `scripts/build.ts` para build programático del playground
  - Referencias: `vite.config.js` (líneas 32-41 para playground build config), `bun build --help` (flags disponibles)
  - Acceptance: Script que ejecuta `Bun.build()` con `entrypoints: ['playground/index.html']`, `outdir: 'dist-playground'`, `minify: true`, `plugins` para TailwindCSS si disponible
  - QA happy: `bun run scripts/build.ts` genera archivos en `dist-playground/`
  - QA failure: Si el script falla, revisar paths de entrypoints
  - Commit: `feat: add build.ts script for playground static build`

- [ ] 4. Crear `scripts/build-lib.ts` para build de la librería npm
  - Referencias: `vite.config.js` (líneas 15-30 para library build config), `src/index.js` (entrypoint)
  - Acceptance: Script que ejecuta `Bun.build()` con `entrypoints: ['src/index.js']`, `outdir: 'dist'`, `format: 'esm'`, `external: ['mithril']`, `splitting: true`, `minify: true`
  - QA happy: `bun run scripts/build-lib.ts` genera `dist/index.js` y `dist/index.d.ts`
  - QA failure: Si mithril no se externaliza correctamente, el bundle lo incluye
  - Commit: `feat: add build-lib.ts script for npm library build`

### Onda 2 — Core

- [ ] 5. Actualizar `package.json` scripts y dependencias
  - Referencias: `package.json` (líneas 18-24 para scripts, 33-38 para devDependencies)
  - Acceptance:
    - Scripts: `dev` → `bun playground/index.html`, `build` → `bun run scripts/build.ts`, `build:lib` → `bun run scripts/build-lib.ts`, `codegen` → `panda codegen`, `prepare` → `panda codegen`, `typecheck` → `tsc --noEmit --project tsconfig.lib.json`
    - Eliminar `vite` de devDependencies
    - Agregar `bun` como peer dependency o devDependency si es necesario
  - QA happy: `bun run dev` inicia el server, `bun run build` genera dist-playground/
  - QA failure: Si `bun` no está en PATH, los scripts fallan
  - Commit: `feat: migrate package.json scripts from vite to bun`

- [ ] 6. Eliminar `vite.config.js`
  - Referencias: `vite.config.js` (archivo completo, 42 líneas)
  - Acceptance: Archivo `vite.config.js` eliminado del repositorio
  - QA happy: `ls vite.config.js` retorna "No such file or directory"
  - QA failure: Si algún script todavía referencia vite.config.js, falla
  - Commit: `chore: remove vite.config.js`

- [ ] 7. Eliminar `postcss.config.mjs`
  - Referencias: `postcss.config.mjs` (5 líneas, plugin `@pandacss/dev/postcss`)
  - Acceptance: Archivo `postcss.config.mjs` eliminado. Panda CSS codegen sigue funcionando sin PostCSS config (genera CSS estático)
  - QA happy: `panda codegen` ejecuta sin errores
  - QA failure: Si Panda necesita PostCSS para codegen, restaurar el archivo
  - Commit: `chore: remove postcss.config.mjs (panda codegen generates static CSS)`

- [ ] 8. Eliminar `@pandacss/dev/postcss` de devDependencies si ya no se usa
  - Referencias: `package.json:35` (`@pandacss/dev`)
  - Acceptance: `@pandacss/dev` sigue en devDependencies (necesario para `panda codegen`), pero se verifica que no se necesita para bundling
  - QA happy: `bun run codegen` funciona
  - QA failure: Si `panda codegen` falla sin el paquete, mantenerlo
  - Commit: (incluido en todo 5)

### Onda 3 — Verificación

- [ ] 9. Verificar dev server con `bun playground/index.html`
  - Referencias: `playground/index.html`, `playground/main.jsx`, `playground/style.css`
  - Acceptance: El server inicia en `http://localhost:3000/`, la página carga sin errores en consola, los componentes se renderizan
  - QA happy: `timeout 5 bun playground/index.html` muestra "ready in" sin errores
  - QA failure: Si falla al resolver imports o CSS, revisar aliases en bunfig.toml
  - Commit: N/A (verificación)

- [ ] 10. Verificar build del playground → `dist-playground/`
  - Referencias: `scripts/build.ts`, `dist-playground/`
  - Acceptance: `bun run build` genera `dist-playground/` con `index.html`, archivos JS y CSS empaquetados, assets copiados
  - QA happy: `ls dist-playground/` muestra index.html, archivos .js, archivos .css
  - QA failure: Si el directorio está vacío o falta index.html, revisar entrypoints
  - Commit: N/A (verificación)

- [ ] 11. Verificar build de la librería → `dist/`
  - Referencias: `scripts/build-lib.ts`, `dist/`, `src/index.js`
  - Acceptance: `bun run build:lib` genera `dist/index.js` (ES module), `dist/index.d.ts` (tipos), mithril es external (no incluido en bundle)
  - QA happy: `head dist/index.js` no contiene código de mithril, `ls dist/` muestra index.js e index.d.ts
  - QA failure: Si mithril está en el bundle, revisar `external` en Bun.build()
  - Commit: N/A (verificación)

- [ ] 12. Verificar typecheck pasa
  - Referencias: `tsconfig.lib.json`, `src/index.d.ts`
  - Acceptance: `bun run typecheck` retorna exit code 0 sin errores
  - QA happy: `bun run typecheck` muestra "Found 0 errors"
  - QA failure: Si hay errores de tipo, revisar imports en archivos modificados
  - Commit: N/A (verificación)

- [ ] 13. Verificar que el sitio estático generado funciona
  - Referencias: `dist-playground/index.html`
  - Acceptance: Abrir `dist-playground/index.html` en navegador muestra el playground funcional con navegación, temas, y todos los componentes
  - QA happy: `bun ./dist-playground/index.html` sirve el sitio estático
  - QA failure: Si el sitio no carga, revisar paths de assets en HTML generado
  - Commit: N/A (verificación)

## Final verification wave

- [ ] F1. Plan compliance audit — Verificar que todos los todos fueron completados según las especificaciones
  - Acceptance: Cada todo tiene evidencia de ejecución (commits, archivos creados/eliminados)
  - QA: Revisar `git log --oneline -15` para confirmar commits, `ls` para archivos

- [ ] F2. Code quality review — Revisar calidad del código en archivos nuevos/modificados
  - Acceptance: Sin errores de linting, imports correctos, código consistente con el resto del proyecto
  - QA: `lsp_diagnostics` en `scripts/build.ts`, `scripts/build-lib.ts`, `bunfig.toml`, `playground/main.jsx`

- [ ] F3. Real manual QA — Probar manualmente el flujo completo
  - Acceptance: Dev server funciona, build playground funciona, build lib funciona, typecheck pasa
  - QA: Ejecutar cada comando y verificar resultados

- [ ] F4. Scope fidelity — Verificar que no se cambiaron cosas fuera del scope
  - Acceptance: `git diff --name-only` muestra solo archivos planificados, sin cambios en `src/components/`, `src/recipes/`, `playground/pages/`
  - QA: `git diff --stat` contra HEAD antes de empezar

## Commit strategy

Cada todo genera un commit atómico con mensaje descriptivo. Los commits de verificación (N/A) no generan commits sino que confirman el estado.

## Success criteria

1. `bun playground/index.html` inicia dev server sin errores
2. `bun run build` genera `dist-playground/` con HTML, JS, CSS
3. `bun run build:lib` genera `dist/index.js` (ES module, sin mithril empaquetado)
4. `bun run typecheck` pasa sin errores
5. El sitio estático generado funciona al abrirlo en navegador
6. `vite.config.js` y `postcss.config.mjs` eliminados
7. `vite` eliminado de devDependencies
8. Todos los componentes del playground siguen funcionando igual
