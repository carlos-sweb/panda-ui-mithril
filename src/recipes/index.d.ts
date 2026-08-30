/**
 * Hand-authored type declaration for the published recipes barrel
 * (panda-ui-mithril/recipes).
 *
 * Self-contained on purpose: it must NOT import from `@pandacss/dev` (whose
 * recipe types re-export `@pandacss/types`), so consumers can resolve these
 * types without pulling that package into their type-checking graph. The
 * real recipe objects from `src/recipes/*.ts` match this shape structurally.
 */

export interface PumRecipe {
  className: string
  base: Record<string, unknown>
  variants?: Record<string, unknown>
  defaultVariants?: Record<string, unknown>
  compoundVariants?: unknown[]
  [key: string]: unknown
}

export const collapseRecipe: PumRecipe
export const collapseTitleRecipe: PumRecipe
export const alertRecipe: PumRecipe
export const auraRecipe: PumRecipe
export const avatarRecipe: PumRecipe
export const badgeRecipe: PumRecipe
export const blockRecipe: PumRecipe
export const boxRecipe: PumRecipe
export const breadcrumbsRecipe: PumRecipe
export const buttonRecipe: PumRecipe
export const buttonGroupRecipe: PumRecipe
export const calendarRecipe: PumRecipe
export const cardRecipe: PumRecipe
export const carouselRecipe: PumRecipe
export const carouselItemRecipe: PumRecipe
export const chatBubbleRecipe: PumRecipe
export const checkboxRecipe: PumRecipe
export const columnsRecipe: PumRecipe
export const containerRecipe: PumRecipe
export const countdownDigitRecipe: PumRecipe
export const countdownRecipe: PumRecipe
export const diffRecipe: PumRecipe
export const dividerRecipe: PumRecipe
export const drawerRecipe: PumRecipe
export const drawerCloseButtonRecipe: PumRecipe
export const dropdownRecipe: PumRecipe
export const fabRecipe: PumRecipe
export const fabLabelRecipe: PumRecipe
export const fieldsetRecipe: PumRecipe
export const fieldsetLegendRecipe: PumRecipe
export const fileInputRecipe: PumRecipe
export const filterRecipe: PumRecipe
export const footerRecipe: PumRecipe
export const gridRecipe: PumRecipe
export const heroRecipe: PumRecipe
export const indicatorRecipe: PumRecipe
export const indicatorItemRecipe: PumRecipe
export const joinRecipe: PumRecipe
export const joinItemRecipe: PumRecipe
export const kbdRecipe: PumRecipe
export const labelRecipe: PumRecipe
export const linkRecipe: PumRecipe
export const listRecipe: PumRecipe
export const loadingRecipe: PumRecipe
export const maskRecipe: PumRecipe
export const megamenuRecipe: PumRecipe
export const menuRecipe: PumRecipe
export const modalRecipe: PumRecipe
export const modalCloseButtonRecipe: PumRecipe
export const navbarRecipe: PumRecipe
export const otpRecipe: PumRecipe
export const paginationRecipe: PumRecipe
export const progressRecipe: PumRecipe
export const radialProgressRecipe: PumRecipe
export const radioRecipe: PumRecipe
export const rangeRecipe: PumRecipe
export const ratingRecipe: PumRecipe
export const ratingGroupRecipe: PumRecipe
export const ratingGroupLabelRecipe: PumRecipe
export const selectRecipe: PumRecipe
export const skeletonRecipe: PumRecipe
export const stackRecipe: PumRecipe
export const statRecipe: PumRecipe
export const statusRecipe: PumRecipe
export const stepsRecipe: PumRecipe
export const swapRecipe: PumRecipe
export const tableRecipe: PumRecipe
export const tableOverflowRecipe: PumRecipe
export const tabsRecipe: PumRecipe
export const tagRecipe: PumRecipe
export const textRecipe: PumRecipe
export const textareaRecipe: PumRecipe
export const textInputRecipe: PumRecipe
export const timelineRecipe: PumRecipe
export const titleRecipe: PumRecipe
export const toastRecipe: PumRecipe
export const toggleRecipe: PumRecipe
export const tooltipRecipe: PumRecipe
