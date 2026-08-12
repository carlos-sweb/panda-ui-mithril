/**
 * Hand-authored type declaration for the published Panda preset
 * (panda-ui-mithril/preset).
 *
 * Self-contained on purpose: it must NOT import from `@pandacss/dev` (whose
 * `Preset` type re-exports `@pandacss/types`), so consumers can resolve these
 * types without pulling that package into their type-checking graph. The
 * shape below mirrors `src/preset.ts`; the real `Preset` type from Panda
 * accepts this object structurally.
 */

export interface PumPreset {
  name: string
  conditions: Record<string, string>
  theme: Record<string, unknown>
  globalCss: Record<string, Record<string, unknown>>
  globalVars: Record<string, { syntax: string; inherits: boolean; initialValue: string }>
}

export const pumPreset: PumPreset
