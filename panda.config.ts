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
        fonts: {
          sans: { value: '"Geist Sans", system-ui, sans-serif' },
          mono: { value: '"Geist Mono", monospace' },
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
            value: { base: 'oklch(21% 0.006 285.885)', _dark: 'oklch(80% 0.008 285.885)' },
          },
          primary: {
            value: { base: 'oklch(45% 0.24 277.023)', _dark: '#a78bfa' },
          },
          'primary-content': {
            value: { base: '#ffffff', _dark: '#1e1b4b' },
          },
          secondary: {
            value: { base: 'oklch(65% 0.241 354.308)', _dark: '#f472b6' },
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
            value: { base: 'oklch(14% 0.005 285.823)', _dark: '#a3a6ad' },
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
        skeleton: {
          '0%': { backgroundPosition: '150%' },
          '100%': { backgroundPosition: '-50%' },
        },
        radio: {
          '0%': { padding: '5px' },
          '50%': { padding: '3px' },
        },
        toast: {
          '0%': { scale: '0.9', opacity: '0' },
          '100%': { scale: '1', opacity: '1' },
        },
        aura: {
          to: { '--aura-angle': '360deg', transform: 'translateZ(1px)' },
        },
        'aura-glow': {
          '20%, 80%': { opacity: '0.7', filter: 'blur(0.25rem)' },
          '50%': { opacity: '1', filter: 'blur(0.75rem)' },
        },
        'aura-glow-after': {
          '20%, 80%': { opacity: '0.3', filter: 'blur(1rem)' },
          '50%': { opacity: '0.6', filter: 'blur(1.5rem)' },
        },
      },
    },
  },
  globalCss: {
    ':root': {
      fontFamily: '"Geist Sans", system-ui, sans-serif',
      '--size-field': '.25rem',
      '--size': 'calc(var(--size-field,.25rem) * 10)',
      /* daisyUI border-radius tokens (light theme defaults) */
      '--radius-selector': '0.5rem',
      '--radius-field': '0.25rem',
      '--radius-box': '0.5rem',
      '--border':'1px',
      '--fontsize': '.875rem',
      '--depth': '1',
      '--noise': '0',
      '--fx-noise': 'none',
    },
  },
  // lets the browser smoothly animate the conic-gradient angle instead of
  // snapping to it every keyframe (plain custom properties can't tween)
  globalVars: {
    '--aura-angle': {
      syntax: '<angle>',
      inherits: false,
      initialValue: '0deg',
    },
  },
})
