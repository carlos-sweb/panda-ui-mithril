# panda-ui-mithril

> **[Demo en vivo →](https://carlos-sweb.github.io/panda-ui-mithril/)**

Biblioteca de componentes UI para [Mithril.js](https://mithril.js.org/) estilizados con [Panda CSS](https://panda-css.com/). Nombres de clases compatibles con [daisyUI](https://daisyui.com/). Iconos via [lucide-mithril](https://github.com/your-repo/lucide-mithril).

## Stack

- **Framework**: Mithril.js 2.3.8+
- **Estilos**: Panda CSS 0.53+ (atomic CSS, type-safe)
- **Build**: Bun
- **Iconos**: lucide-mithril
- **Tipografía**: Poppins (via @fontsource)

## Instalación

```bash
npm install panda-ui-mithril mithril
```

## Uso

Los componentes usan [Panda CSS](https://panda-css.com/) internamente, pero las clases que generan (`btn`, `card`, etc.) se resuelven en **build time**, no en runtime. Por eso el paquete no trae CSS-in-JS: trae una hoja de estilos ya compilada (`dist/styles.css`) que hay que importar **una sola vez**, en el entrypoint de tu app — sin importar si tu proyecto usa Panda CSS o no:

```js
import 'panda-ui-mithril/styles.css'
```

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

### Si el proyecto padre también usa Panda CSS

`dist/styles.css` es una hoja de estilos **estática y autocontenida** — las clases (`btn`, `card-body`, `badge-primary`, etc.) ya vienen resueltas desde el build de esta librería. Esto tiene una consecuencia importante para tu configuración:

#### No agregues esta librería al `include` de tu `panda.config.ts`

Panda genera CSS analizando **código fuente** (llamadas a `css()`, `cva()`, JSX con `styled-system`) — no puede extraer nada útil de `node_modules/panda-ui-mithril/dist/index.js`, porque ese archivo es un bundle minificado, no el código fuente con los patrones que el analizador estático de Panda necesita reconocer. Apuntar tu `include` ahí no generaría CSS adicional, solo haría más lento tu escaneo. Tu Panda y el de esta librería son **dos instancias completamente independientes**, cada una con su propio `styled-system/`; no necesitan saber una de la otra.

Un `panda.config.ts` del proyecto padre normal, sin ningún cambio especial para esta librería, es suficiente:

```ts
// panda.config.ts (proyecto padre)
import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  preflight: true,
  include: ['./src/**/*.{js,jsx,ts,tsx}'], // solo TU código — no toques esto por panda-ui-mithril
  exclude: [],
  outdir: 'styled-system',
  theme: {
    extend: {
      // tus propios tokens/recipes
    },
  },
})
```

#### Dónde importar el CSS

Importa `panda-ui-mithril/styles.css` una sola vez en el entrypoint de tu app, **antes** de tu propio CSS generado por Panda (`styled-system/styles.css`) — el orden de carga importa para la resolución de tokens (ver abajo):

```js
// main.js / entry point
import 'panda-ui-mithril/styles.css'
import './styled-system/styles.css'   // el tuyo, generado por tu propio panda codegen/cssgen
```

Con Vite, webpack, Parcel, etc. ese `import` de un `.css` desde `node_modules` funciona igual que cualquier otro paquete que publique CSS (Bootstrap, Bulma, etc.) — no requiere loader especial más allá del soporte de CSS que ya tenga tu bundler.

Ambas hojas declaran las mismas capas (`@layer reset, base, tokens, recipes, utilities`), así que **se fusionan por capa** en vez de pisarse por completo — la primera hoja que carga fija el orden de las capas, la segunda solo agrega reglas dentro de ellas.

#### Colisión de tokens semánticos

La única fricción real son los **tokens con el mismo nombre**: esta librería sigue la convención de daisyUI (`primary`, `secondary`, `accent`, `base-100`, `base-content`, etc. — ver [Tema](#tema)). Si tu proyecto define esos mismos nombres en su propio `panda.config.ts` con otros valores, gana el `:root`/`[data-theme]` que se cargue **después** en el DOM. Dos formas de resolverlo, de más a menos recomendada:

1. **Reusa los tokens de la librería en vez de duplicarlos.** Esta librería expone sus colores como custom properties reales (`--colors-primary`, `--colors-base-100`, ...) que cambian solas con `data-theme`. En tu propio `panda.config.ts` puedes referenciarlas directamente en vez de declarar tus propios valores hardcodeados:

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

Todos los componentes soportan variantes daisyUI: `color`, `size`, `variant`.

## Comandos

```bash
# Desarrollo (playground)
npm run dev

# Build de la biblioteca (para publicar en npm)
npm run build:lib

# Build del playground (sitio estatico)
npm run build

# Regenerar styled-system de Panda CSS
npm run codegen

# Verificar tipos TypeScript
npm run typecheck
```

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

Soporta modo claro/oscuro via `data-theme`. Tokens semanticos compatibles con daisyUI:

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
