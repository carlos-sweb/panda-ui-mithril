import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, ButtonClose, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const usageCodeJsx = `import m from 'mithril'
import { ButtonClose } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <ButtonClose />
        <ButtonClose color="primary" />
        <ButtonClose size="lg" />
        <ButtonClose variant="outline" />
        <ButtonClose disabled />
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { ButtonClose } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m('div', null, [
      m(ButtonClose),
      m(ButtonClose, { color: 'primary' }),
      m(ButtonClose, { size: 'lg' }),
      m(ButtonClose, { variant: 'outline' }),
      m(ButtonClose, { disabled: true })
    ])
  }
}`

export default {
  name: 'ButtonClose',
  category: 'Actions',
  description: 'Circular close button with an X icon that scales with the button size.',

  oninit() { loadPageI18n('buttonclose') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">ButtonClose</Title>
        
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Block spacing="lg">
          <Title as="h3" size="5">Default</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <ButtonClose />
            <ButtonClose>this text is ignored</ButtonClose>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Sizes</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <ButtonClose size="xs" />
            <ButtonClose size="sm" />
            <ButtonClose size="md" />
            <ButtonClose size="lg" />
            <ButtonClose size="xl" />
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Colors</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <ButtonClose />
            <ButtonClose color="neutral" />
            <ButtonClose color="primary" />
            <ButtonClose color="secondary" />
            <ButtonClose color="accent" />
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Soft colors</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <ButtonClose variant="soft" />
            <ButtonClose variant="soft" color="primary" />
            <ButtonClose variant="soft" color="secondary" />
            <ButtonClose variant="soft" color="success" />
            <ButtonClose variant="soft" color="error" />
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Outline colors</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <ButtonClose variant="outline" />
            <ButtonClose variant="outline" color="primary" />
            <ButtonClose variant="outline" color="warning" />
            <ButtonClose variant="outline" color="info" />
            <ButtonClose variant="outline" color="error" />
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Ghost + Link</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <ButtonClose variant="ghost" />
            <ButtonClose variant="ghost" color="primary" />
            <ButtonClose variant="link" />
            <ButtonClose variant="link" color="secondary" />
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Square + Circle</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <ButtonClose shape="square" />
            <ButtonClose shape="square" color="primary" />
            <ButtonClose shape="circle" color="secondary" />
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Disabled</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <ButtonClose disabled />
            <ButtonClose disabled color="primary" />
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Stroke Width</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <ButtonClose strokeWidth={1} />
            <ButtonClose strokeWidth={2} />
            <ButtonClose strokeWidth={3} />
            <ButtonClose strokeWidth={4} color="primary" />
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Border Width</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <ButtonClose variant="outline" borderWidth={1} />
            <ButtonClose variant="outline" borderWidth={2} />
            <ButtonClose variant="outline" borderWidth={3} color="primary" />
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <Tabs defaultActive="jsx" lifted size="lg">
            <Tab ref="jsx">Jsx</Tab>
            <Tab ref="js">Js</Tab>
            <TabContent ref="jsx">
              <CodeExample copyId="buttonclose-jsx-copy" type="jsx" code={usageCodeJsx} />
            </TabContent>
            <TabContent ref="js">
              <CodeExample copyId="buttonclose-js-copy" type="javascript" code={usageCodeJavascript} />
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
