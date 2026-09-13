/**
 * Bun bundles `.yml` imports with its own loader, but TypeScript knows nothing
 * about the extension, so once `checkJs` is on every `import x from './y.yml'`
 * is a TS2307 "Cannot find module".
 *
 * The values are translation trees read by dynamic key lookups
 * (`playground/i18n/index.js` and `config-ui/i18n/index.js` walk them by path),
 * hence `Record<string, any>` rather than a precise shape.
 *
 * Not part of the published package (`files` ships only `src/` and
 * `styled-system/`): this exists for the editor's SPA.
 */
declare module '*.yml' {
  const value: Record<string, any>
  export default value
}
