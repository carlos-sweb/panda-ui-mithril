# panda-ui-mithril

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
