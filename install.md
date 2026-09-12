# Instalación de panda-ui-mithril desde GitHub

Procedimiento empírico verificado para consumir `panda-ui-mithril` desde un
proyecto externo. **El paquete npm está desactualizado** — la fuente correcta
es el repositorio de GitHub (rama `master`):

```bash
bun add https://github.com/carlos-sweb/panda-ui-mithril.git
```

Verificado en `~/example-pum/example-pum1` con un hello world de Mithril +
`Button` (ver [Instalación paso a paso](#instalación-paso-a-paso)).

## Requisitos

- Bun 1.3+
- Mithril.js (`>=2.3.8`)
- Panda CSS (`@pandacss/dev` — el paquete exige `^0.53.0 || ^1.0.0`)

## Instalación paso a paso

### 1. Inicializa el proyecto

```bash
mkdir example-pum1 && cd example-pum1
bun init -y
```

### 2. Instala Panda primero (orden importante)

```bash
bun add -d @pandacss/dev @pandacss/preset-panda
```

> El paquete tiene un script `prepare: panda codegen` que Bun ejecuta al
> instalar desde git. Instalar `@pandacss/dev` **antes** de la librería
> garantiza que el binario `panda` exista. Si Bun bloquea el postinstall
> (dependencias no confiables), no pasa nada: el repositorio ya trae
> `styled-system/` generado en git y el bloqueo no afecta el consumo.

### 3. Instala la librería y Mithril

```bash
bun add https://github.com/carlos-sweb/panda-ui-mithril.git mithril
```

Verifica que quedó el clon de GitHub (no el npm viejo):

```bash
ls node_modules/panda-ui-mithril/src/components/ | grep -E "Navbar|Table"   # componentes recientes
ls node_modules/panda-ui-mithril/src/i18n.js                                 # i18n de la librería
```

### 4. Configura Panda

Crea `panda.config.ts`:

```ts
import { defineConfig } from '@pandacss/dev'
import pandaPreset from '@pandacss/preset-panda'
import { pumPreset } from 'panda-ui-mithril/preset'

export default defineConfig({
  presets: [pandaPreset, pumPreset],
  include: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  staticCss: {
    recipes: '*',
  },
  outdir: 'styled-system',
})
```

Dos puntos clave que se mezclan fácilmente:

1. **`presets: [pandaPreset, pumPreset]`** — al ejecutar `bunx panda codegen`
   se generan en `styled-system/` todos los recipes, patterns y tokens
   (estáticos). En nuestro caso solo usamos recipes.
2. **Un `style.css` con `@layer reset, base, tokens, recipes, utilities;`
   sirve para el pipeline de postcss** (con el plugin de Panda en
   `postcss.config.js`). **Aquí no es necesario** — solo ejecutamos
   `bunx panda cssgen`, que genera `styled-system/styles.css` leyendo los
   archivos/directorios del `include`.

> **No hace falta apuntar el `include` a `node_modules/panda-ui-mithril/src/recipes/*.ts`**:
> las recipes ya se crearon en la raíz con `bunx panda codegen`. El `include`
> solo lista el código del consumidor, y `staticCss: { recipes: '*' }` fuerza a
> cssgen a emitir todas las recipes de la librería.

### 5. Genera los helpers y el CSS

```bash
bunx panda codegen
bunx panda cssgen
```

Verifica que el CSS trae las recipes (no solo tokens):

```bash
grep -c "\.btn\b\|--btn-p" styled-system/styles.css   # > 0
grep -c "var(--colors-primary)" styled-system/styles.css  # > 0 (token del preset)
```

### 6. JSX clásico de Mithril

Ningún componente requiere un transform especial — todos son `.js` con
hyperscript `m()`; el transform JSX con la factory de Mithril solo lo necesitas
tú si escribes JSX en tu app (el `bun init -y` deja `jsx: react-jsx` y rompe
con `Cannot find module 'react/jsx-dev-runtime'`). Crea `bunfig.toml`:

```toml
jsx = "react"
jsxFactory = "m"
jsxFragmentFactory = "m.Fragment"
```

### 7. Hello world

`index.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="./styled-system/styles.css">
</head>
<body>
  <script type="module" src="./src/main.js"></script>
</body>
</html>
```

`src/main.js` (el import usa el subpath en minúscula kebab):

```js
import m from 'mithril'
import { Button } from 'panda-ui-mithril/button'

m.mount(document.body, {
  view: () => [
    m('h1', 'Try me out'),
    m(Button, { color: 'primary', size: 'md' }, 'try me'),
  ],
})
```

### 8. Arranca el dev server

```bash
bun index.html
```

Abre **`http://localhost:3000/`** (Bun escucha en `localhost`, no en
`127.0.0.1`).

## CLI (`init` y `config`)

El paquete trae dos comandos. **Ambos aceptan `--dir`** (y la forma
`--dir=<ruta>`); una ruta relativa se resuelve contra el directorio desde el
que lanzas el comando.

| Comando | Qué hace |
|---|---|
| `bunx panda-ui-mithril init` | Crea `pum/` (preset + theme editable), `panda.config.ts`, los campos JSX de `tsconfig.json` y el pipeline postcss (`postcss.config.cjs` + `pum/index.css`). |
| `init --dir <ruta>` · `--dir=<ruta>` | Lo mismo pero en `<ruta>` (la crea si no existe). |
| `init --force` | Regenera un proyecto existente. ⚠️ **Sobrescribe `pum/theme/*.ts`** con los valores del paquete: pierdes tus colores/fuentes. |
| `bunx panda-ui-mithril config` | Abre el editor de theme (servidor Elysia) en `http://localhost:1234`. |
| `config --dir=<ruta>` | Apunta el editor a ese proyecto (o sub-proyecto). |
| `config --init --dir=<ruta>` | Inicializa el proyecto si falta **y** abre el editor en un paso. Nunca sobrescribe: si ya existe, solo lo abre. |
| `config --port 5000` · `--port=5000` · `-p 5000` | Sirve el editor en otro puerto. |
| `config --no-open` | Arranca **sin abrir el navegador** (la URL se imprime igual). Útil para revisiones repetidas, scripts y CI. También vale `BROWSER=none`. |

### Varias SPAs independientes (login, dashboard por rol)

Si tu app tiene SPAs separadas que comparten repo, dale a **cada una su propio
proyecto** — así cada SPA tiene su `pum/theme`, su `panda.config.ts` y su
`styled-system/styles.css`, y el editor trabaja solo sobre la que le indiques:

```bash
bunx panda-ui-mithril config --init --dir=src/pages/login
bunx panda-ui-mithril config --init --dir=src/pages/dashboard
```

Cada SPA necesita su `panda.config.ts`: es el archivo que define `include`,
`staticCss` y `outdir`. Si una SPA solo tiene `pum/theme` pero **no** su
`panda.config.ts`, su theme no lo usa nadie y un rebuild acabaría escribiendo
en el proyecto padre; el editor **se niega a escribir** en ese caso y te
recuerda ejecutar `init --dir=<ruta>`.

## Verificación en el navegador

El botón debe computar estilos reales del preset (no un botón sin estilo):

```js
getComputedStyle(document.querySelector('button')).backgroundColor
// oklch(0.45 0.24 277.023)  → token primary del preset pumPreset
// borderRadius: 4px          → token --radii-btn
// className: "button button--size_md button--borderWidth_1 button--color_primary"
```

## Errores conocidos

| Síntoma | Causa / solución |
|---|---|
| `Cannot find module 'react/jsx-dev-runtime'` | Falta `bunfig.toml` (paso 6) |
| Botón sin estilos (tokens sí, recipes no) | Falta `staticCss: { recipes: '*' }`, o el `include` apunta a las recipes del paquete en vez de a `./src/**` |
| Postinstall bloqueado por Bun | Inofensivo (el repo trae `styled-system/` en git) |
| `127.0.0.1:3000` no conecta | Usar `http://localhost:3000/` |
| `config --dir=<spa>` rechaza escribir ("no es el del proyecto que se recompila") | Esa SPA no tiene `panda.config.ts` propio: ejecuta `bunx panda-ui-mithril init --dir=<spa>` |
