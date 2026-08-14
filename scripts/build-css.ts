import postcss from 'postcss/lib/postcss'
import nesting from 'postcss-nesting'
import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'
import atImport from 'postcss-import'
import pandacss from '@pandacss/dev/postcss'
import reporter from 'postcss-reporter'
import stylelint from 'stylelint'

const cssInput = await Bun.file('./styled-system/styles.css').text()


const result = await postcss([
  atImport(), // 1. Primero resolver los @import  
  //pandacss(),
  nesting(),
  autoprefixer(),
  stylelint(),
  cssnano(),
  reporter({ clearReportedMessages: true }) // Reporter al final para capturar avisos acumulados
]).process(cssInput, { from: 'styled-system/styles.css', to: 'styled-system/styles.min.css' })

console.log(result.css)