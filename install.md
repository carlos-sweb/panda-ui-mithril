# Installing panda-ui-mithril from GitHub

Verified, empirical procedure for consuming `panda-ui-mithril` from an external
project. **The npm package is out of date** — the correct source is the GitHub
repository (`master` branch):

```bash
bun add https://github.com/carlos-sweb/panda-ui-mithril.git
```

Verified in `~/example-pum/example-pum1` with a Mithril + `Button` hello world
(see [Step-by-step installation](#step-by-step-installation)).

## Requirements

- Bun 1.3+
- Mithril.js (`>=2.3.8`)
- Panda CSS (`@pandacss/dev` — the package requires `^0.53.0 || ^1.0.0`)

## Step-by-step installation

### 1. Initialize the project

```bash
mkdir example-pum1 && cd example-pum1
bun init -y
```

### 2. Install Panda first (the order matters)

```bash
bun add -d @pandacss/dev @pandacss/preset-panda
```

> The package has a `prepare: panda codegen` script that Bun runs when
> installing from git. Installing `@pandacss/dev` **before** the library
> guarantees the `panda` binary exists. If Bun blocks the postinstall
> (untrusted dependencies), that is harmless: the repository already ships a
> generated `styled-system/` in git and the block does not affect consumption.

### 3. Install the library and Mithril

```bash
bun add https://github.com/carlos-sweb/panda-ui-mithril.git mithril
```

Check that you got the GitHub clone (not the old npm one):

```bash
ls node_modules/panda-ui-mithril/src/components/ | grep -E "Navbar|Table"   # recent components
ls node_modules/panda-ui-mithril/src/i18n.js                                 # library i18n
```

### 4. Configure Panda

Create `panda.config.ts`:

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

Two key points that are easy to mix up:

1. **`presets: [pandaPreset, pumPreset]`** — running `bunx panda codegen`
   generates every recipe, pattern and token (static ones) in `styled-system/`.
   In our case we only use recipes.
2. **A `style.css` with `@layer reset, base, tokens, recipes, utilities;`
   serves the postcss pipeline** (with the Panda plugin in
   `postcss.config.js`). **It is not needed here** — we only run
   `bunx panda cssgen`, which generates `styled-system/styles.css` by reading
   the files/directories in `include`.

> **Pointing `include` at `node_modules/panda-ui-mithril/src/recipes/*.ts` is
> NOT necessary**: the recipes were already created at the root by
> `bunx panda codegen`. `include` only lists the consumer's own code, and
> `staticCss: { recipes: '*' }` forces cssgen to emit every recipe in the
> library.

### 5. Generate the helpers and the CSS

```bash
bunx panda codegen
bunx panda cssgen
```

Check that the CSS carries the recipes (not just tokens):

```bash
grep -c "\.btn\b\|--btn-p" styled-system/styles.css   # > 0
grep -c "var(--colors-primary)" styled-system/styles.css  # > 0 (preset token)
```

### 6. Mithril's classic JSX

No component requires a special transform — they are all `.js` using `m()`
hyperscript; you only need the JSX transform with Mithril's factory if you
write JSX in your own app (`bun init -y` leaves `jsx: react-jsx` and breaks
with `Cannot find module 'react/jsx-dev-runtime'`). Create `bunfig.toml`:

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

`src/main.js` (the import uses the lowercase kebab subpath):

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

### 8. Start the dev server

```bash
bun index.html
```

Open **`http://localhost:3000/`** (Bun listens on `localhost`, not on
`127.0.0.1`).

## CLI (`init` and `config`)

The package ships two commands. **Both accept `--dir`** (and the
`--dir=<path>` form); a relative path resolves against the directory you run
the command from.

| Command | What it does |
|---|---|
| `bunx panda-ui-mithril init` | Creates `pum/` (preset + editable theme), `panda.config.ts`, the JSX fields in `tsconfig.json` and the postcss pipeline (`postcss.config.cjs` + `pum/index.css`). |
| `init --dir <path>` · `--dir=<path>` | The same, but in `<path>` (creating it if it does not exist). |
| `init --force` | Regenerates an existing project. ⚠️ **Overwrites `pum/theme/*.ts`** with the package values: you lose your colors/fonts. |
| `bunx panda-ui-mithril config` | Opens the theme editor (Elysia server) at `http://localhost:1234`. |
| `config --dir=<path>` | Points the editor at that project (or sub-project). |
| `config --init --dir=<path>` | Initializes the project if it is missing **and** opens the editor in one step. It never overwrites: if the project already exists it just opens it. |
| `config --port 5000` · `--port=5000` · `-p 5000` | Serves the editor on another port. |
| `config --no-open` | Starts **without opening the browser** (the URL is printed either way). Useful for repeated reviews, scripts and CI. `BROWSER=none` also works. |

### Several independent SPAs (login, dashboard per role)

If your app has separate SPAs sharing one repo, give **each one its own
project** — that way every SPA has its `pum/theme`, its `panda.config.ts` and
its `styled-system/styles.css`, and the editor only works on the one you point
it at:

```bash
bunx panda-ui-mithril config --init --dir=src/pages/login
bunx panda-ui-mithril config --init --dir=src/pages/dashboard
```

Each SPA needs its own `panda.config.ts`: it is the file that defines
`include`, `staticCss` and `outdir`. If a SPA only has `pum/theme` but **no**
`panda.config.ts`, nothing uses its theme and a rebuild would end up writing
into the parent project; in that case the editor **refuses to write** and
reminds you to run `init --dir=<path>`.

## Browser verification

The button must compute real styles from the preset (not an unstyled button):

```js
getComputedStyle(document.querySelector('button')).backgroundColor
// oklch(0.45 0.24 277.023)  → primary token from the pumPreset preset
// borderRadius: 4px          → --radii-btn token
// className: "button button--size_md button--borderWidth_1 button--color_primary"
```

## Known errors

| Symptom | Cause / fix |
|---|---|
| `Cannot find module 'react/jsx-dev-runtime'` | Missing `bunfig.toml` (step 6) |
| Unstyled button (tokens yes, recipes no) | Missing `staticCss: { recipes: '*' }`, or `include` points at the package's recipes instead of `./src/**` |
| Postinstall blocked by Bun | Harmless (the repo ships `styled-system/` in git) |
| `127.0.0.1:3000` does not connect | Use `http://localhost:3000/` |
| `config --dir=<spa>` refuses to write (it answers "The theme pointed at (…) is not the one of the project being recompiled (…)") | That SPA has no `panda.config.ts` of its own: run `bunx panda-ui-mithril init --dir=<spa>` |
