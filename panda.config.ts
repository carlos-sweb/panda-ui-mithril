import { defineConfig } from '@pandacss/dev'
import { preset as pandaPreset } from '@pandacss/preset-panda'
import { pumPreset } from './src/preset'

export default defineConfig({
  preflight: true,
  include: ['./src/recipes/*.ts', './src/components/*/*.jsx', './playground/**/*.{js,jsx}'],
  exclude: [],
  outdir: 'styled-system',
  jsxFramework: 'mithril',
  jsxStyleProps: 'all',
  syntax: 'object-literal',
  separators: true,
  importMap: {
    'panda-ui': './styled-system'
  },
  presets: [pandaPreset, pumPreset],
})
