import { defineConfig } from '@pandacss/dev'
import pandaPreset from '@pandacss/preset-panda'
import { pumPreset } from './src/preset'

import { collapseRecipe , collapseTitleRecipe } from './src/recipes/accordion'
import { alertRecipe } from './src/recipes/alert'
import { auraRecipe } from './src/recipes/aura'
import { avatarRecipe } from './src/recipes/avatar'
import { badgeRecipe } from './src/recipes/badge'
import { blockRecipe } from './src/recipes/block'
import { boxRecipe } from './src/recipes/box'
import { breadcrumbsRecipe } from './src/recipes/breadcrumbs'
import { buttonRecipe } from './src/recipes/button'
import { buttonGroupRecipe } from './src/recipes/buttonGroup'
import { calendarRecipe } from './src/recipes/calendar'
import { cardRecipe } from './src/recipes/card'
import { carouselRecipe , carouselItemRecipe } from './src/recipes/carousel'
import { chatBubbleRecipe } from './src/recipes/chatBubble'
import { checkboxRecipe } from './src/recipes/checkbox'
import { columnsRecipe } from './src/recipes/columns'
import { containerRecipe } from './src/recipes/container'
import { countdownDigitRecipe, countdownRecipe } from './src/recipes/countdown'
import { diffRecipe } from './src/recipes/diff'
import { dividerRecipe } from './src/recipes/divider'
import { fabRecipe , fabLabelRecipe } from './src/recipes/fab'
import { fieldsetRecipe , fieldsetLegendRecipe } from './src/recipes/fieldset'
import { fileInputRecipe } from './src/recipes/fileInput'
import { filterRecipe } from './src/recipes/filter'
import { footerRecipe } from './src/recipes/footer'
import { gridRecipe } from './src/recipes/grid'
import { heroRecipe } from './src/recipes/hero'
import { indicatorRecipe ,  indicatorItemRecipe } from './src/recipes/indicator'
import { joinRecipe , joinItemRecipe } from './src/recipes/join'
import { kbdRecipe } from './src/recipes/kbd'
import { labelRecipe } from './src/recipes/label'
import { linkRecipe } from './src/recipes/link'
import { listRecipe } from './src/recipes/list'
import { loadingRecipe } from './src/recipes/loading'
import { maskRecipe } from './src/recipes/mask'
import { megamenuRecipe } from './src/recipes/megamenu'
import { menuRecipe } from './src/recipes/menu'
import { modalRecipe , modalCloseButtonRecipe } from './src/recipes/modal'
import { navbarRecipe } from './src/recipes/navbar'
import { otpRecipe } from './src/recipes/otp'
import { progressRecipe } from './src/recipes/progress'
import { radialProgressRecipe } from './src/recipes/radialProgress'
import { radioRecipe } from './src/recipes/radio'
import { rangeRecipe } from './src/recipes/range'
import { ratingRecipe } from './src/recipes/rating'
import { ratingGroupRecipe , ratingGroupLabelRecipe } from './src/recipes/ratingGroup'
import { selectRecipe } from './src/recipes/select'
import { skeletonRecipe } from './src/recipes/skeleton'
import { stackRecipe } from './src/recipes/stack'
import { statRecipe } from './src/recipes/stat'
import { statusRecipe } from './src/recipes/status'
import { stepsRecipe } from './src/recipes/steps'
import { swapRecipe } from './src/recipes/swap'
import { tableRecipe , tableOverflowRecipe } from './src/recipes/table'
import { tabsRecipe } from './src/recipes/tabs'
import { tagRecipe } from './src/recipes/tag'
import { textareaRecipe } from './src/recipes/textarea'
import { textInputRecipe } from './src/recipes/textInput'
import { timelineRecipe } from './src/recipes/timeline'
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
      slotRecipes :{
        avatar : avatarRecipe ,
        card : cardRecipe ,
        calendar : calendarRecipe ,
        ChatBubblePUM : chatBubbleRecipe ,
        columns : columnsRecipe ,
        diff : diffRecipe ,
        footer : footerRecipe ,
        gridPUM : gridRecipe ,
        hero : heroRecipe ,
        list : listRecipe ,
        megamenu : megamenuRecipe ,
        modal : modalRecipe ,
        navbar : navbarRecipe ,
        rating : ratingRecipe ,
        steps : stepsRecipe , 
        table : tableRecipe ,   
        tabs : tabsRecipe ,  
        timeline : timelineRecipe  ,
        stat : statRecipe,
      },
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
        containerPUM : containerRecipe,
        countdown : countdownRecipe,
        countdownDigit : countdownDigitRecipe,
        dividerPUM : dividerRecipe,
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
        otp : otpRecipe ,
        progress : progressRecipe ,
        radialProgress : radialProgressRecipe ,
        radio : radioRecipe ,
        range : rangeRecipe ,
        ratingGroup : ratingGroupRecipe, 
        ratingGroupLabel : ratingGroupLabelRecipe ,
        select : selectRecipe ,
        skeleton : skeletonRecipe ,        
        status : statusRecipe ,
        stackPUM : stackRecipe ,
        tag : tagRecipe ,
        textarea : textareaRecipe , 
        textInput : textInputRecipe ,
        title : titleRecipe ,
        toast : toastRecipe ,
        toggle : toggleRecipe ,
        tooltip : tooltipRecipe ,

        modalCloseButton : modalCloseButtonRecipe,
        boxPUM : boxRecipe ,
        swap : swapRecipe,
        tableOverflow : tableOverflowRecipe
      }
    }
  }
})
