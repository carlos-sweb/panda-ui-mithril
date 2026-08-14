import { defineConfig } from '@pandacss/dev'
import pandaPreset from '@pandacss/preset-panda'
import { pumPreset } from './src/preset'

import { collapseRecipe , collapseTitleRecipe } from './src/recipes/accordion'
import { alertRecipe } from './src/recipes/alert'
import { auraRecipe } from './src/recipes/aura'
//Avatar
import { badgeRecipe } from './src/recipes/badge'
import { blockRecipe } from './src/recipes/block'
import { boxRecipe } from './src/recipes/box'
import { breadcrumbsRecipe } from './src/recipes/breadcrumbs'
import { buttonRecipe } from './src/recipes/button'
import { buttonGroupRecipe } from './src/recipes/buttonGroup'
//Calendar
//Car
import { carouselRecipe , carouselItemRecipe } from './src/recipes/carousel'
//ChatBubble
import { checkboxRecipe } from './src/recipes/checkbox'
//Columns
//import { containerRecipe } from './src/recipes/container'
import { countdownRecipe } from './src/recipes/countdown'
//Diff
//import { dividerRecipe } from './src/recipes/divider'
import { fabRecipe , fabLabelRecipe } from './src/recipes/fab'
import { fieldsetRecipe , fieldsetLegendRecipe } from './src/recipes/fieldset'
import { fileInputRecipe } from './src/recipes/fileInput'
import { filterRecipe } from './src/recipes/filter'
//Footer
//Grid
//Hero
import { indicatorRecipe ,  indicatorItemRecipe } from './src/recipes/indicator'
import { joinRecipe , joinItemRecipe } from './src/recipes/join'
import { kbdRecipe } from './src/recipes/kbd'
import { labelRecipe } from './src/recipes/label'
import { linkRecipe } from './src/recipes/link'
//List
import { loadingRecipe } from './src/recipes/loading'
import { maskRecipe } from './src/recipes/mask'
// Megamenu
import { menuRecipe } from './src/recipes/menu'
// Modal
// Navbar
import { otpRecipe } from './src/recipes/otp'
import { progressRecipe } from './src/recipes/progress'
import { radialProgressRecipe } from './src/recipes/radialProgress'
import { radioRecipe } from './src/recipes/radio'
import { rangeRecipe } from './src/recipes/range'
// Rating
import { ratingGroupRecipe , ratingGroupLabelRecipe } from './src/recipes/ratingGroup'
import { selectRecipe } from './src/recipes/select'
import { skeletonRecipe } from './src/recipes/skeleton'
import { stackRecipe } from './src/recipes/stack'
// Stat
import { statusRecipe } from './src/recipes/status'
// Step
import { swapRecipe } from './src/recipes/swap'
// Table
// Tabs
import { tagRecipe } from './src/recipes/tag'
import { textareaRecipe } from './src/recipes/textarea'
import { textInputRecipe } from './src/recipes/textInput'
// Timeline
import { titleRecipe } from './src/recipes/title'

import { toastRecipe } from './src/recipes/toast'
import { toggleRecipe } from './src/recipes/toggle'
import { tooltipRecipe } from './src/recipes/tooltip'


export default defineConfig({
  preflight: true,
  include: ['./src/components/*/*.jsx', './playground/**/*.{js,jsx}'],
  exclude: [],
  outdir: 'styled-system',  
  jsxFramework: 'mithril',
  jsxStyleProps: 'all',
  syntax: 'object-literal',
  separators: true,
  importMap: {
    'panda-ui': './styled-system'
  },
  staticCss: {
    recipes: '*'
  },
  presets: [pandaPreset, pumPreset],
  theme:{
    extend:{
      recipes : {        
        collapse : collapseRecipe,
        collapseTitle : collapseTitleRecipe,
        alert : alertRecipe,
        aura : auraRecipe,
        badge : badgeRecipe,
        block : blockRecipe,
        /*box:boxRecipe*/
        breadcrumbs : breadcrumbsRecipe,
        button : buttonRecipe,
        buttonGroup : buttonGroupRecipe,
        carousel : carouselRecipe,
        carouselItem : carouselItemRecipe,
        checkbox : checkboxRecipe,
        //container:containerRecipe,
        countdown : countdownRecipe,
        //divider : dividerRecipe,
        fab : fabRecipe,
        fabLabel : fabLabelRecipe,
        fieldset : fieldsetRecipe,
        fieldsetLegend : fieldsetLegendRecipe,
        fileInput : fileInputRecipe,
        filter: filterRecipe ,
        indicator : indicatorRecipe ,
        indicatorItem : indicatorItemRecipe ,
        join : joinRecipe ,
        joinItem : joinItemRecipe,
        kbd : kbdRecipe,
        label : labelRecipe,
        link : linkRecipe ,
        loading : loadingRecipe ,
        mask : maskRecipe ,
        
        menu : menuRecipe ,

        opt : otpRecipe ,
        progress : progressRecipe ,
        radialProgress : radialProgressRecipe ,
        radio : radioRecipe ,
        range : rangeRecipe ,
        ratingGroup : ratingGroupRecipe, 
        ratingGroupLabel : ratingGroupLabelRecipe ,
        select : selectRecipe ,
        skeleton : skeletonRecipe ,
        //stack : stackRecipe ,
        status : statusRecipe ,
        tag : tagRecipe ,
        textarea : textareaRecipe , 
        textInput : textInputRecipe ,
        title : titleRecipe ,
        toast : toastRecipe ,
        toggle : toggleRecipe ,
        tooltip : tooltipRecipe ,
      }
    }
  }
})
