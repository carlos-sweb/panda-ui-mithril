import { defineTokens, defineSemanticTokens } from '@pandacss/dev'

/**
 * Identidad de color de panda-ui-mithril.
 *
 * Dos bloques: `tokens` (valores crudos) y `semanticTokens` (valores con
 * significado, con variante light/dark). Los colores de marca
 * (primary/secondary/accent/neutral) son valores raw (base/dark) — el
 * consumidor los personaliza editando este archivo o vía
 * theme.extend.semanticTokens.
 */

export const colorsTokens = defineTokens({
  colors: {
    'white': { value: '#ffffff' },
    'black': { value: '#000000' },
  },
})

export const colorsSemanticTokens = defineSemanticTokens({
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
})
