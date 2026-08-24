import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import {
  Stack, Title, Text, Block, Box, Table, TableContainer, TableThead, TableTbody,
  TableRow, TableCell, TableHead, Pagination, Tabs, Tab, TabContent,
} from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const usageCodeJsx = `import m from 'mithril'
import { Pagination } from 'panda-ui-mithril'

export const MyPage = {
  oninit(vnode) { vnode.state.page = 3 },
  view(vnode) {
    return (
      <Pagination
        page={vnode.state.page}
        pageCount={20}
        onchange={(p) => { vnode.state.page = p }}
      />
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Pagination } from 'panda-ui-mithril'

export const MyPage = {
  oninit(vnode) { vnode.state.page = 3 },
  view(vnode) {
    return m(Pagination, {
      page: vnode.state.page,
      pageCount: 20,
      onchange: (p) => { vnode.state.page = p }
    })
  }
}`

const fancyCodeJsx = `import m from 'mithril'
import { Pagination } from 'panda-ui-mithril'

export const MyPage = {
  oninit(vnode) { vnode.state.page = 1 },
  view(vnode) {
    return (
      <Pagination
        page={vnode.state.page}
        pageCount={40}
        variant="separated"
        shape="circle"
        withEdges
        onchange={(p) => { vnode.state.page = p }}
      />
    )
  }
}`

// Datos falsos para el demo de tabla paginada
const ROWS_PER_PAGE = 5
const totalRows = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  role: ['Admin', 'Editor', 'Viewer'][i % 3],
  email: `user${i + 1}@example.com`,
}))

export default {
  name: 'Pagination',
  category: 'Navigation',
  description: 'Pagination component for navigating between pages of content.',

  oninit(vnode) {
    loadPageI18n('pagination')
    vnode.state.page = 3
    vnode.state.tablePage = 1
  },
  view(vnode) {
    const pageCount = 20
    const tablePageCount = Math.ceil(totalRows.length / ROWS_PER_PAGE)
    const pageRows = totalRows.slice((vnode.state.tablePage - 1) * ROWS_PER_PAGE, vnode.state.tablePage * ROWS_PER_PAGE)

    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Pagination</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        {/* ── Joined (default) ── */}
        <Block spacing="lg">
          <Title as="h2" size="3">{t('joinedTitle')}</Title>
          <Pagination
            page={vnode.state.page}
            pageCount={pageCount}
            onchange={(p) => { vnode.state.page = p }}
          />
        </Block>

        {/* ── Separated + circle (estilo welcome-ui) ── */}
        <Block spacing="lg">
          <Title as="h2" size="3">{t('separatedTitle')}</Title>
          <Text color="neutral" className={css({ marginBottom: '1rem', maxWidth: '600px' })}>
            {m.trust(t('separatedDesc'))}
          </Text>
          <Stack gap="md">
            <Pagination
              page={vnode.state.page}
              pageCount={pageCount}
              variant="separated"
              onchange={(p) => { vnode.state.page = p }}
            />
            <Pagination
              page={vnode.state.page}
              pageCount={pageCount}
              variant="separated"
              shape="circle"
              withEdges
              onchange={(p) => { vnode.state.page = p }}
            />
          </Stack>
        </Block>

        {/* ── Sizes ── */}
        <Block spacing="lg">
          <Title as="h2" size="3">{t('sizesTitle')}</Title>
          <Stack gap="md">
            {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
              <Pagination
                key={size}
                page={vnode.state.page}
                pageCount={12}
                size={size}
                variant="separated"
                onchange={(p) => { vnode.state.page = p }}
              />
            ))}
          </Stack>
        </Block>

        {/* ── Buen uso: tabla paginada ── */}
        <Block spacing="lg">
          <Title as="h2" size="3">{t('tableTitle')}</Title>
          <Text color="neutral" className={css({ marginBottom: '1rem', maxWidth: '640px' })}>
            {m.trust(t('tableDesc'))}
          </Text>
          <Box>
            <TableContainer>
              <Table>
                <TableThead>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>{t('tableName')}</TableHead>
                    <TableHead>{t('tableRole')}</TableHead>
                    <TableHead>Email</TableHead>
                  </TableRow>
                </TableThead>
                <TableTbody>
                  {pageRows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.role}</TableCell>
                      <TableCell>{row.email}</TableCell>
                    </TableRow>
                  ))}
                </TableTbody>
              </Table>
            </TableContainer>
            <Stack direction="row" justify="between" align="center" className={css({ paddingTop: '0.75rem' })}>
              <Text size="sm" color="neutral">
                {t('tableShowing')} {pageRows.length} / {totalRows.length}
              </Text>
              <Pagination
                page={vnode.state.tablePage}
                pageCount={tablePageCount}
                variant="separated"
                shape="circle"
                onchange={(p) => { vnode.state.tablePage = p }}
              />
            </Stack>
          </Box>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <Tabs defaultActive="jsx" lifted size="lg">
            <Tab ref="jsx">Jsx</Tab>
            <Tab ref="js">Js</Tab>
            <TabContent ref="jsx">
              <CodeExample type="jsx" code={usageCodeJsx} />
            </TabContent>
            <TabContent ref="js">
              <CodeExample type="javascript" code={usageCodeJavascript} />
            </TabContent>
          </Tabs>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.usage')} — separated + circle</Title>
          <Tabs defaultActive="jsx" lifted size="lg">
            <Tab ref="jsx">Jsx</Tab>
            <Tab ref="js">Js</Tab>
            <TabContent ref="jsx">
              <CodeExample type="jsx" code={fancyCodeJsx} />
            </TabContent>
            <TabContent ref="js">
              <CodeExample type="javascript" code={fancyCodeJsx} />
            </TabContent>
          </Tabs>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={tableToRows(table)} />
        </Block>
      </Stack>
    )
  }
}
