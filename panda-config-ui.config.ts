import { defineConfig } from '@pandacss/dev'
import pandaPreset from '@pandacss/preset-panda'
import { pumPreset } from './src/preset'

/**
 * Config de Panda del editor config-ui (cliente del core, igual que
 * playground pero con su propio pipeline de CSS).
 *
 * Se usa con scripts/build-config-ui.ts (postcss) — genera
 * config-ui/config-ui.css con los tokens del preset, las recipes de los
 * componentes que el editor usa y los estilos de config-ui/pages/*.
 *
 * El outdir es separado (styled-system-config-ui/) para no pisar el
 * styled-system/ del playground.
 */
export default defineConfig({
  preflight: true,
  include: ['./src/components/*/*.jsx', './config-ui/**/*.{js,jsx}'],
  exclude: [],
  outdir: 'styled-system-config-ui',
  jsxFramework: 'mithril',
  jsxStyleProps: 'all',
  syntax: 'object-literal',
  separators: true,
  importMap: {
    'panda-ui': './styled-system-config-ui'
  },
  staticCss: {
    recipes: '*'
  },
  presets: [pandaPreset, pumPreset],
})
