# panda-ui-mithril

> **[Demo en vivo →](https://carlos-sweb.github.io/panda-ui-mithril/)**

Biblioteca de componentes UI para [Mithril.js](https://mithril.js.org/) estilizados con [Panda CSS](https://panda-css.com/). Convención de nombres inspirada por [daisyUI](https://daisyui.com/) (MIT); el resto de decisiones de diseño toman lo mejor de varias librerías de componentes UI. Iconos via [lucide-mithril](https://github.com/your-repo/lucide-mithril).

## Stack

- **Framework**: Mithril.js 2.3.8+
- **Estilos**: Panda CSS 0.53+ (atomic CSS, type-safe)
- **Build**: Bun
- **Iconos**: lucide-mithril
- **Tipografía**: Poppins (via @fontsource)

## Instalación

> **El paquete npm puede estar desactualizado.** La fuente recomendada es el
> repositorio de GitHub (rama `master`):

```bash
bun add -d @pandacss/dev @pandacss/preset-panda        # primero (ver nota)
bun add https://github.com/carlos-sweb/panda-ui-mithril.git mithril
```

> **Orden importante**: instala `@pandacss/dev` **antes** que la librería. El
> paquete tiene un script `prepare: panda codegen` que Bun ejecuta al instalar
> desde git; que el binario `panda` exista evita fallos en el lifecycle. (Si
> Bun bloquea el postinstall por no confiar en la dependencia, es inofensivo:
> el repositorio ya trae `styled-system/` generado en git.)

**Panda CSS y Mithril.js son requisitos del proyecto padre.** Esta librería no publica CSS precompilado: los estilos los genera el Panda de tu proyecto, configurado con el preset de la librería (ver [Uso](#uso)).

## Uso

Los componentes usan [Panda CSS](https://panda-css.com/) internamente: las clases que generan (`btn`, `card`, etc.) se resuelven en **build time**, no en runtime. Por eso el paquete no trae CSS-in-JS ni una hoja de estilos precompilada. **Panda CSS y Mithril.js son requisitos del proyecto padre**: para que los componentes tengan estilos, tu proyecto debe estar configurado con Panda CSS y usar el preset de esta librería (`pumPreset`). Tu propio Panda genera el CSS de los componentes que realmente importas, dentro de tu `styled-system/`.

```jsx
import m from 'mithril'
import { Button, Card, CardBody, CardTitle, Alert } from 'panda-ui-mithril'

const App = {
  view() {
    return (
      <Card border>
        <CardBody>
          <CardTitle>Hola mundo</CardTitle>
          <Alert color="success">Componente instalado correctamente</Alert>
          <Button color="primary" size="md">Click aqui</Button>
        </CardBody>
      </Card>
    )
  }
}
```

### Configura tu propio Panda con el preset

Esta es la forma de consumir la librería: **tu** Panda genera las recipes y los
tokens dentro de tu propio `styled-system/`. Para ello, la librería publica una
sola pieza:

- **`panda-ui-mithril/preset`**: un preset de Panda (`pumPreset`) con los
  tokens semánticos (`primary`, `base-100`, `info`, etc.), condiciones de
  tema, keyframes, `globalCss`, `globalVars` **y todas las recipes de los
  componentes** (registradas en `theme.recipes` / `theme.slotRecipes`).

Tu `panda.config.ts` se configura así:

```ts
// panda.config.ts (proyecto padre)
import { defineConfig } from '@pandacss/dev'
import pandaPreset from '@pandacss/preset-panda'
import { pumPreset } from 'panda-ui-mithril/preset'

export default defineConfig({
  presets: [pandaPreset, pumPreset],
  include: [
    './src/**/*.{js,jsx,ts,tsx}', // solo tu código
  ],
  staticCss: {
    recipes: '*', // emite todas las recipes del preset
  },
  outdir: 'styled-system', // ← OBLIGATORIO, ver footguns
})
```

Con este modelo importas los componentes desde `panda-ui-mithril` como siempre,
y tu propio Panda (`bunx panda codegen` + `bunx panda cssgen`) genera el CSS en
`styled-system/styles.css`. Las recipes no se apuntan en el `include` (como en
modelos anteriores): vienen incluidas en `pumPreset` y `staticCss: { recipes:
'*' }` las emite todas.

Para que funcione, tres detalles:

- **El preset es obligatorio.** Sin `pumPreset`, las referencias a tokens (`token(spacing.4)`, `var(--colors-primary)`, etc.) se emiten como literales rotos que el navegador ignora, **en silencio**, sin error de build.
- **`staticCss: { recipes: '*' }` es obligatorio.** Es lo que hace que `cssgen` emita el CSS de las recipes del preset; sin él, `styles.css` queda solo con tokens/base y los componentes se ven sin estilo.
- **`outdir: 'styled-system'` es obligatorio.** Ahí se generan los helpers y el `styles.css` que linkea tu `index.html`; si usas otro `outdir`, ajusta el `<link>` (y los imports de `styled-system/` en tu código).

#### Personalizar los colores de marca (`--pum-*`)

`primary`, `secondary`, `accent` y `neutral` (y sus `-content`) son colores de **marca** — se espera que cada proyecto los redefina, a diferencia de `info`/`success`/`warning`/`error`, que son colores **semánticos de estado** y se mantienen fijos sin importar el tema. Para sobreescribir los de marca, no necesitas tocar Panda ni conocer el nombre interno del token — cada uno tiene un hook con fallback (`var(--pum-primary, <valor por defecto>)`), así que basta con declarar la custom property en el `:root` de tu app: en tu propio `globalCss`, en tu propia hoja de estilos, o generado dinámicamente por un selector de color en runtime.

```css
:root {
  --pum-primary: oklch(55% 0.2 250);
  --pum-primary-content: white;
  --pum-secondary: #d946ef;
  --pum-secondary-content: white;
  --pum-accent: ...;
  --pum-neutral: ...;
}
```

No hace falta declarar los cuatro — cualquiera que dejes sin definir usa el valor por defecto de la librería. Si tu app ya tiene un selector de color en runtime (ej. clases `.primary-{color}` que cambian una custom property propia), simplemente enlázalo:

```css
:root {
  --pum-primary: var(--primary-500); /* tu propia escala reactiva */
}
```

#### Colisión de tokens semánticos

Si además quieres que **tu propio** `css()`/`cva()` (no solo los componentes de esta librería) resuelva `primary`/`base-100`/etc. al mismo valor — por ejemplo para pintar tu propio UI con el mismo color de marca — hay dos formas, de más a menos recomendada:

1. **Reusa los tokens del preset en vez de duplicarlos.** El preset expone los colores de la librería como custom properties reales (`--colors-primary`, `--colors-base-100`, ...) que cambian solas con `data-theme`. En tu propio `panda.config.ts` puedes referenciarlas directamente en vez de declarar tus propios valores hardcodeados:

   ```ts
   // panda.config.ts (proyecto padre)
   theme: {
     extend: {
       semanticTokens: {
         colors: {
           primary: { value: 'var(--colors-primary)' },
           'base-100': { value: 'var(--colors-base-100)' },
           // ...el resto que necesites
         },
       },
     },
   },
   ```

   Así tu propio Panda genera utilidades (`css({ color: 'primary' })`, `<div bg="base-100">`) que quedan sincronizadas con el theme de la librería — una sola fuente de verdad, sin duplicar valores ni arriesgar que diverjan.

2. **Usa nombres de token distintos** en tu propio config (`brand` en vez de `primary`, por ejemplo) si prefieres mantener tu paleta totalmente separada de la de la librería.

## Empezar desde cero (bun)

Si quieres crear un proyecto nuevo y ver un componente funcionando de punta a punta, esta es la ruta verificada con [bun](https://bun.sh/). Son 8 pasos.

1. **Crea el proyecto e inicialízalo**:

   ```bash
   mkdir mi-app && cd mi-app && bun init -y
   ```

   `bun init -y` crea `package.json`, `tsconfig.json` e `index.ts` sin preguntar nada.

2. **Instala Panda primero y luego la librería desde GitHub**, en dos comandos separados:

   ```bash
   bun add -d @pandacss/dev @pandacss/preset-panda
   bun add https://github.com/carlos-sweb/panda-ui-mithril.git mithril
   ```

   La librería soporta la última versión de Panda CSS (0.53.x y 1.x); `bun add -d` instalará la latest, que es la soportada. El orden importa: el paquete tiene un `prepare: panda codegen` que necesita el binario `panda` ya instalado.

3. **Crea `panda.config.ts`** en la raíz con el preset de la librería:

   ```ts
   // panda.config.ts
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

   El `include` solo lista tu propio código: las recipes de la librería ya vienen dentro de `pumPreset` y `staticCss: { recipes: '*' }` hace que `cssgen` las emita todas.

4. **Genera los helpers y el CSS**:

   ```bash
   bunx panda codegen && bunx panda cssgen
   ```

   `codegen` genera los helpers (`css()`, recipes, tokens) en `styled-system/`; `cssgen` es el que produce `styled-system/styles.css` leyendo tu `include` + `staticCss`.

5. **Crea `index.html`** en la raíz:

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

6. **Crea `src/main.js`** (el equivalente al getting-started de Mithril, con el `Button` como hermano del `h1`, no anidado):

   ```js
   import m from 'mithril'
   import { Button } from 'panda-ui-mithril/button'

   var root = document.body

   m.mount(root, {
     view: function() {
       return [
         m("h1", "Try me out"),
         m(Button, { color: 'primary', size: 'md' }, "try me")
       ]
     }
   })
   ```

   El import usa el subpath en minúscula kebab (`panda-ui-mithril/button`), igual que el resto de componentes (`panda-ui-mithril/alert`, `panda-ui-mithril/card`, ...).

   **Requisito JSX para `Button` y `Alert`**: `Button` y `Alert` son los únicos componentes escritos como `.jsx` (los otros 66 son `.js` con hyperscript directo). Para usarlos, tu proyecto debe transpilar su JSX con la factory de Mithril. El `bun init -y` por defecto deja `"jsx": "react-jsx"` en `tsconfig.json`, así que el arranque falla con `Cannot find module 'react/jsx-dev-runtime'`. Crea un `bunfig.toml` en la raíz con la misma config JSX que usa esta librería:

   ```toml
   # bunfig.toml — JSX clásico con factory de Mithril
   jsx = "react"
   jsxFactory = "m"
   jsxFragmentFactory = "m.Fragment"
   ```

   (O los mismos tres campos en `compilerOptions` de `tsconfig.json`.) Los 66 componentes `.js` restantes no requieren esta configuración.

7. **Arranca el dev server y abre el navegador**:

   ```bash
   bun index.html
   ```

   Sirve la app en http://localhost:3000.

Para que el flujo funcione tienen que cumplirse los tres requisitos de [Configura tu propio Panda con el preset](#configura-tu-propio-panda-con-el-preset): el preset `pumPreset`, `staticCss: { recipes: '*' }` y `outdir: 'styled-system'`. Si algo se ve sin estilos, es uno de esos tres.

> **Nota**: las recipes generan el CSS como utilidades atómicas. No busques una regla `.btn-primary` en `styles.css`: `btn` es la clase base hook y cada variante (color, tamaño, estilo) se aplica como clases atómicas separadas.

## Componentes

56 componentes organizados por categoria:

| Categoria | Componentes |
|-----------|-------------|
| **Actions** | Button, FAB, Link |
| **Data Entry** | Checkbox, FileInput, Radio, Range, Rating, Select, Textarea, TextInput, Toggle, OTP, Calendar |
| **Data Display** | Card, Table, List, Stat, Timeline, Steps, Avatar, Badge, Kbd, Skeleton, Status, Countdown |
| **Layout** | Divider, Stack, Join, Indicator, Mask |
| **Navigation** | Menu, Navbar, Breadcrumbs, Pagination, Tabs |
| **Feedback** | Alert, Toast, Loading, Progress, RadialProgress, Tooltip, Modal |
| **Misc** | Accordion/Collapse, Carousel, ChatBubble, Diff, Filter, Footer, Hero, Megamenu, Swap, ThemeController, Fieldset, Label |

Todos los componentes soportan variantes de color, tamaño y estilo: `color`, `size`, `variant`.

## Comandos

```bash
# Desarrollo (playground)
npm run dev

# Build del playground (sitio estatico)
npm run build

# Regenerar styled-system de Panda CSS
npm run codegen

# Verificar tipos TypeScript
npm run typecheck
```

> **Nota (fresh clone)**: `styled-system/styles.css` es un artefacto generado y está en `.gitignore` (CI lo regenera en cada deploy con `bun run build`). En un clon fresco, corre `npm run codegen` + `bun run scripts/build-css.ts` antes del primer `npm run dev` (o directamente `npm run build`, que genera el CSS en su paso 1).

> **Publicar en npm**: el paquete se publica como source (`src/` + `styled-system/`), sin build previo. `npm publish` ejecuta automáticamente `panda codegen && panda cssgen` (script `prepublishOnly`). No existe `build:lib`.

## Estructura

```
panda-ui-mithril/
├── src/
│   ├── components/       # 56 componentes (index.js por componente)
│   ├── recipes/          # Recipes de Panda CSS (cva/sva) en TypeScript
│   ├── utils/            # Utilidades (cx)
│   ├── index.js          # Barrel file de exportaciones
│   └── index.d.ts        # Tipos principales
├── playground/           # Sitio de demostracion
│   ├── components/       # Componentes del playground (Navbar, Sidebar)
│   └── pages/            # 59 paginas de demostracion
├── styled-system/        # Auto-generado por Panda CSS (no editar)
└── scripts/              # Build scripts (Bun)
```

## Tema

Soporta modo claro/oscuro via `data-theme`. Tokens semánticos inspirados por daisyUI:

- **Colores base**: `base-100`, `base-200`, `base-300`, `base-content`
- **Colores tematicos**: `primary`, `secondary`, `accent`, `neutral`
- **Colores de estado**: `info`, `success`, `warning`, `error`

Cada color tiene su variante `-content` para texto accesible.

## Playground

El playground es un sitio estatico con demos interactivas de todos los componentes. Incluye:

- Navegacion lateral con busqueda (`Cmd+K`)
- Toggle de tema claro/oscuro
- Demos de todas las variantes por componente

Para verlo localmente:

```bash
npm run dev
```

## Estado

**Alpha (0.1.0)** - 56 componentes implementados y funcionales. Pendiente:

- Tests automatizados
- Documentacion API por componente
- CI/CD

## Licencia

MIT
