/**
 * Hand-authored type declaration for the published theme
 * (panda-ui-mithril/theme).
 *
 * Self-contained on purpose: it must NOT import from `@pandacss/dev` (whose
 * `Theme` type re-exports `@pandacss/types`), so consumers can resolve these
 * types without pulling that package into their type-checking graph. The
 * shape below mirrors `src/theme.ts`; the real `Theme` type from Panda
 * accepts this object structurally.
 */

export interface PumTheme {
  tokens: Record<string, unknown>
  semanticTokens: Record<string, unknown>
  keyframes: Record<string, Record<string, Record<string, string>>>
}

export const pumTheme: PumTheme
