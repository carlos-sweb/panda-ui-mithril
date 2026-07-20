import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  preflight: true,
  include: ['./src/**/*.{js,jsx,ts}', './playground/**/*.{js,jsx}'],
  exclude: [],
  outdir: 'styled-system',
  jsxFramework: 'mithril',
  jsxStyleProps: 'all',
  syntax: 'object-literal',
  separators: true,
  importMap: {
    'panda-ui': './styled-system'
  },
  conditions: {
    dark: '&:is([data-theme="dark"], [data-theme="dark"] *)',
  },
  theme: {
    tokens: {
      colors: {
        'white': { value: '#ffffff' },
        'black': { value: '#000000' },
      },
    },
    extend: {
      tokens: {
        radii: {
          btn: { value: '4px' },
        },
      },
      semanticTokens: {
        colors: {
          'base-100': {
            value: { base: '#ffffff', _dark: '#1d232a' },
          },
          'base-200': {
            value: { base: '#f2f2f2', _dark: '#191e24' },
          },
          'base-300': {
            value: { base: '#e5e5e5', _dark: '#15191e' },
          },
          'base-content': {
            value: { base: '#1f2937', _dark: '#d1d5db' },
          },
          primary: {
            value: { base: '#570df8', _dark: '#a78bfa' },
          },
          'primary-content': {
            value: { base: '#ffffff', _dark: '#1e1b4b' },
          },
          secondary: {
            value: { base: '#f000b8', _dark: '#f472b6' },
          },
          'secondary-content': {
            value: { base: '#ffffff', _dark: '#1a0a14' },
          },
          accent: {
            value: { base: '#37cdbe', _dark: '#2dd4bf' },
          },
          'accent-content': {
            value: { base: '#163849', _dark: '#042f2e' },
          },
          neutral: {
            value: { base: '#3d4451', _dark: '#a3a6ad' },
          },
          'neutral-content': {
            value: { base: '#ffffff', _dark: '#1f2937' },
          },
          info: {
            value: { base: '#3abff8', _dark: '#7dd3fc' },
          },
          'info-content': {
            value: { base: '#083344', _dark: '#0c4a6e' },
          },
          success: {
            value: { base: '#36d399', _dark: '#4ade80' },
          },
          'success-content': {
            value: { base: '#083144', _dark: '#052e16' },
          },
          warning: {
            value: { base: '#fbbd23', _dark: '#facc15' },
          },
          'warning-content': {
            value: { base: '#422006', _dark: '#422006' },
          },
          error: {
            value: { base: '#f87272', _dark: '#f87171' },
          },
          'error-content': {
            value: { base: '#450a0a', _dark: '#450a0a' },
          },
        },
      },

      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
        ping: {
          '75%, 100%': { transform: 'scale(2)', opacity: '0' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.8,0,1,1)' },
          '50%': { transform: 'none', animationTimingFunction: 'cubic-bezier(0,0,0.2,1)' },
        },
        'progress-bar': {
          '0%': { backgroundSize: '200%' },
          '100%': { backgroundSize: '0%' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        'slide-in': {
          from: { transform: 'translateY(-100%)' },
          to: { transform: 'translateY(0)' },
        },
      },
    },
  },
  globalCss: {
    ':root': {
      /* Button tokens (daisyUI-compatible) */
      '--btn-radius': '4px',
      '--btn-p': '1rem',
      '--btn-bg': 'var(--colors-neutral)',
      '--btn-fg': 'var(--colors-neutral-content)',
      '--btn-border': 'var(--btn-bg)',
      '--btn-border-style': 'solid',
      '--btn-shadow': '0 1px 2px 0 oklch(0% 0 0 / 0.05)',
      '--btn-inset': '0 .5px 0 .5px oklch(100% 0 0 / calc(var(--depth, 1) * 6%))',
      '--size': '2.75rem',
      '--fontsize': '.875rem',
      '--depth': '1',
      '--noise': '0',
      '--fx-noise': 'none',
    }
  },
})
