import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Button, Loading, Text, Block , Divider , Tabs , Tab , TabContent } from '../../../src/index.js'
import { Heart } from 'lucide-mithril'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const whiteSurface = css({ background: 'white', padding: '1rem' })

const usageCodeJsx = `import m from 'mithril'
import { Button } from 'panda-ui-mithril'
import { Heart } from 'lucide-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        {/* Simple button */}
        <Button>Click me</Button>

        {/* With color */}
        <Button color="primary">Primary</Button>

        {/* With variant and size */}
        <Button variant="outline" color="error" size="lg">Error</Button>

        {/* With icon */}
        <Button><Heart size={20} /> Like</Button>

        {/* Circle button */}
        <Button circle><Heart size={20} /></Button>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Button } from 'panda-ui-mithril'
import { Heart } from 'lucide-mithril'

export const MyPage = {
  view() {
    return m('div', null, [
      // Simple button
      m(Button, null, 'Click me'),

      // With color
      m(Button, { color: 'primary' }, 'Primary'),

      // With variant and size
      m(Button, { variant: 'outline', color: 'error', size: 'lg' }, 'Error'),

      // With icon
      m(Button, null, [m(Heart, { size: 20 }), ' Like']),

      // Circle button
      m(Button, { circle: true }, m(Heart, { size: 20 }))
    ])
  }
}`

export default {
  name: 'Button',
  category: 'Actions',
  description: 'Buttons allow users to take actions and make choices with a single tap.',

  oninit() { loadPageI18n('button') },
  view() {
    return (
      <Stack>
        <Title as="h1" size="2">Button</Title>
        <Text color="neutral" >{t('paragraph')}</Text>        
        <Title as="h3" size="5">Default</Title>
        <Stack direction="row" >
          <Button>Default</Button>
        </Stack>
        <Divider/>
        <Title as="h3" size="5">Sizes</Title>
        <Stack gap="xs" direction="row" align="center">
          <Button size="xs">XS</Button>
          <Button size="sm">SM</Button>
          <Button size="md">MD</Button>
          <Button size="lg">LG</Button>
          <Button size="xl">XL</Button>
        </Stack>
        <Divider/>
        <Block spacing="lg">
          <Title as="h3" size="5">Responsive</Title>
          <Text size="sm" color="neutral">
            Responsive button sizes require Panda CSS responsive variants (not yet implemented in cva)
          </Text>
          <Stack direction="row" gap="sm">
            <Button size="xs">Responsive (xs)</Button>
          </Stack>
        </Block>
        <Divider/>
        <Block spacing="lg">
          <Title as="h3" size="5">Colors</Title>
          <Stack direction="row" gap="sm">
            <Button color="neutral">Neutral</Button>
            <Button color="primary">Primary</Button>
            <Button color="secondary">Secondary</Button>
            <Button color="accent">Accent</Button>
            <Button color="info">Info</Button>
            <Button color="success">Success</Button>
            <Button color="warning">Warning</Button>
            <Button color="error">Error</Button>
          </Stack>
        </Block>
        <Divider/>
        <Block spacing="lg">
          <Title as="h3" size="5">Soft colors</Title>
          <Stack direction="row" gap="sm">
            <Button variant="soft" color="neutral">Neutral</Button>
            <Button variant="soft" color="primary">Primary</Button>
            <Button variant="soft" color="secondary">Secondary</Button>
            <Button variant="soft" color="accent">Accent</Button>
            <Button variant="soft" color="info">Info</Button>
            <Button variant="soft" color="success">Success</Button>
            <Button variant="soft" color="warning">Warning</Button>
            <Button variant="soft" color="error">Error</Button>
          </Stack>
        </Block>
        <Divider/>
        <Block spacing="lg">
          <Title as="h3" size="5">Outline colors</Title>
          <Stack direction="row" gap="sm">
            <Button variant="outline" color="neutral">Neutral</Button>
            <Button variant="outline" color="primary">Primary</Button>
            <Button variant="outline" color="secondary">Secondary</Button>
            <Button variant="outline" color="accent">Accent</Button>
            <Button variant="outline" color="info">Info</Button>
            <Button variant="outline" color="success">Success</Button>
            <Button variant="outline" color="warning">Warning</Button>
            <Button variant="outline" color="error">Error</Button>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Dash colors</Title>
          <Stack direction="row" gap="sm">
            <Button variant="dash" color="neutral">Neutral</Button>
            <Button variant="dash" color="primary">Primary</Button>
            <Button variant="dash" color="secondary">Secondary</Button>
            <Button variant="dash" color="accent">Accent</Button>
            <Button variant="dash" color="info">Info</Button>
            <Button variant="dash" color="success">Success</Button>
            <Button variant="dash" color="warning">Warning</Button>
            <Button variant="dash" color="error">Error</Button>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Neutral on light background</Title>
          <div className={whiteSurface}>
            <Stack direction="row" gap="sm">
              <Button variant="outline">Outline</Button>
              <Button variant="dash">Dash</Button>
            </Stack>
          </div>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Active colors</Title>
          <Stack direction="row" gap="sm">
            <Button active color="neutral">Neutral</Button>
            <Button active color="primary">Primary</Button>
            <Button active color="secondary">Secondary</Button>
            <Button active color="accent">Accent</Button>
            <Button active color="info">Info</Button>
            <Button active color="success">Success</Button>
            <Button active color="warning">Warning</Button>
            <Button active color="error">Error</Button>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Ghost + Link</Title>
          <Stack direction="row" gap="sm">
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </Stack>
        </Block>


        <Title as="h3" size="5">Wide</Title>        
          <Stack>
            <Button wide>Wide</Button>
          </Stack>                
          <Title as="h3" size="5">Disabled</Title>
          <Stack direction="row" gap="xs" >
            <Button disabled>Disabled (attribute)</Button>
            <Button className="btn-disabled">Disabled (class)</Button>
          </Stack>                
          <Title as="h3" size="5">Square + Circle</Title>
          <Stack direction="row" gap="xs" >
            <Button square><Heart size={20} /></Button>
            <Button circle><Heart size={20} /></Button>
          </Stack>
        <Title as="h3" size="5">Border Width</Title>        
        <Stack direction="row" gap="xs">
          <Button variant="outline" borderWidth={1}>border 1</Button>
              <Button variant="outline" borderWidth={2}>border 2</Button>
              <Button variant="outline" borderWidth={3}>border 3</Button>
        </Stack>
        <Stack direction="row" gap="xs">
          <Button variant="dash" borderWidth={1}>border 1</Button>
              <Button variant="dash" borderWidth={2}>border 2</Button>
              <Button variant="dash" borderWidth={3}>border 3</Button>
        </Stack>                
        <Title as="h3" size="5">Button with icon</Title>        
        <Stack direction="row" gap="xs">
          <Button><Heart size={20} /> Like</Button>
            <Button>Like <Heart size={20} /></Button>
        </Stack>        
        <Title as="h3" size="5">Block</Title>
        <Stack>
          <Button block>Block</Button>
        </Stack>              
        <Title as="h3" size="5">Loading spinner</Title>
        <Stack direction="row" gap="xs">
            <Button square><Loading /></Button>
            <Button><Loading /> Loading</Button>
        </Stack>                    
        <Title as="h2" size="3">{t('common.usage')}</Title>
        <Tabs defaultActive="jsx" lifted size="lg">
          <Tab ref="jsx" >Jsx</Tab>
          <Tab ref="js" >Js</Tab>
          <TabContent ref="jsx">            
            <CodeExample type="jsx" code={usageCodeJsx} />
          </TabContent>
          <TabContent ref="js">            
            <CodeExample type="javascript" code={usageCodeJavascript} />
          </TabContent>
        </Tabs>
        
        <Title as="h2" size="3">{t('common.classReference')}</Title>        
        <ClassTable rows={tableToRows(table)} />
        
      </Stack>
    )
  }
}
