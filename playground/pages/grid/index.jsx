import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Grid, Cell, Text, Block } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const usageCode = `<Grid cols={3} gap="md">
  <Cell span={2}><div>Wide cell</div></Cell>
  <Cell><div>Normal</div></Cell>
</Grid>`

const classRows = [
  { className: 'grid', prop: '<Grid>', type: 'Component', description: 'CSS Grid container' },
  { className: 'grid-cols-2|3|4|6|12', prop: 'cols="2|3|4|6|12"', type: 'Size', description: 'Column count' },
  { className: 'grid-gap-sm|md|lg', prop: 'gap="sm|md|lg"', type: 'Size', description: 'Gap between cells' },
  { className: 'grid-cell', prop: '<Cell>', type: 'Part', description: 'Grid cell spanning columns' },
  { className: 'cell-span-2|3|4|6|12', prop: 'span="2|3|4|6|12"', type: 'Size', description: 'Column span' },
]

const cell = css({ bg: 'token(colors.base-200)', p: '1rem', borderRadius: '0.25rem', textAlign: 'center' })

export default {
  oninit() { loadPageI18n('grid') },
  view() {
    return (<Stack gap="lg">
      <Title as="h1" size="2">Grid</Title>
      <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>{t('paragraph')}</Text>
      <Block spacing="lg"><Title as="h2" size="3">{t('common.usage')}</Title><CodeExample code={usageCode} language="jsx" /></Block>
      <Block spacing="lg"><Title as="h2" size="3">3 columns, auto span</Title>
        <Grid cols={3} gap="md">
          <Cell><div className={cell}>1</div></Cell><Cell><div className={cell}>2</div></Cell><Cell><div className={cell}>3</div></Cell>
          <Cell><div className={cell}>4</div></Cell><Cell><div className={cell}>5</div></Cell><Cell><div className={cell}>6</div></Cell>
        </Grid>
      </Block>
      <Block spacing="lg"><Title as="h2" size="3">Spans</Title>
        <Grid cols={6} gap="md">
          <Cell span={2}><div className={cell}>span 2</div></Cell>
          <Cell span={4}><div className={cell}>span 4</div></Cell>
          <Cell span={3}><div className={cell}>span 3</div></Cell>
          <Cell span={3}><div className={cell}>span 3</div></Cell>
        </Grid>
      </Block>
      <Block spacing="lg"><Title as="h2" size="3">{t('common.classReference')}</Title><ClassTable rows={classRows} /></Block>
    </Stack>)
  }
}
