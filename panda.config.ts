import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  preflight: true,
  include: ['./src/**/*.{js,jsx}', './playground/**/*.{js,jsx}'],
  exclude: [],
  outdir: 'styled-system',
  jsxFramework: 'mithril',
  jsxStyleProps: 'all',
  syntax: 'object-literal',
  separators: true,
  importMap: {
    'panda-ui': './styled-system'
  },
  theme: {
    extend: {
      tokens: {
        colors: {
          'base-100': { value: '#ffffff' },
          'base-200': { value: '#f2f2f2' },
          'base-300': { value: '#e5e5e5' },
          'base-content': { value: '#1f2937' },
          primary: { value: '#570df8' },
          'primary-content': { value: '#ffffff' },
          secondary: { value: '#f000b8' },
          'secondary-content': { value: '#ffffff' },
          accent: { value: '#37cdbe' },
          'accent-content': { value: '#163849' },
          neutral: { value: '#3d4451' },
          'neutral-content': { value: '#ffffff' },
          info: { value: '#3abff8' },
          'info-content': { value: '#083344' },
          success: { value: '#36d399' },
          'success-content': { value: '#083144' },
          warning: { value: '#fbbd23' },
          'warning-content': { value: '#422006' },
          error: { value: '#f87272' },
          'error-content': { value: '#450a0a' },
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
    '*': {
      boxSizing: 'border-box',
    },
  },
})
