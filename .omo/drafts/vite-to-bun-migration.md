# vite-to-bun-migration - Draft

## Intent
CLEAR — Migración de Vite a Bun bundler para playground estático y librería npm.

## Components
| ID | Component | Outcome | Status | Evidence |
|----|-----------|---------|--------|----------|
| C1 | Dev server | `bun playground/index.html` reemplaza `vite` | pending | vite.config.js, package.json |
| C2 | Playground build | `bun build` → dist-playground/ | pending | vite.config.js mode=playground |
| C3 | Library build | `bun build` → dist/ (ES module) | pending | vite.config.js mode=library |
| C4 | import.meta.glob | Reemplazo manual de rutas | pending | playground/main.jsx:14 |
| C5 | Panda CSS PostCSS | Funciona con bun (codegen first) | pending | postcss.config.mjs |
| C6 | Config files | Vite config eliminado, bunfig.toml creado | pending | vite.config.js |

## Decisions
- Panda CSS: codegen se ejecuta antes de bundling, Bun maneja CSS generado
- import.meta.glob: reemplazado con imports estáticos manuales
- Library build: Bun.build API con external: ['mithril'], format: 'esm'
- bunfig.toml: configuración mínima para dev server

## Status: awaiting-approval
## Next action: write .omo/plans/vite-to-bun-migration.md
