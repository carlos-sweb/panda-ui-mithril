import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Alert, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { Info, CheckCircle, AlertTriangle, AlertCircle, X, ChevronRight } from 'lucide-mithril'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'



const usageCodeJsx = `import m from 'mithril'
import { Alert } from 'panda-ui-mithril'
import { Info, CheckCircle, AlertTriangle } from 'lucide-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Alert color="info">
          <Info />
          <span>12 unread messages. Tap to see.</span>
        </Alert>

        <Alert variant="soft" color="success">
          <CheckCircle />
          <span>Your purchase has been confirmed!</span>
        </Alert>

        <Alert direction="vertical" color="warning">
          <AlertTriangle />
          <span>Warning: Invalid email address!</span>
        </Alert>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Alert } from 'panda-ui-mithril'
import { Info, CheckCircle, AlertTriangle } from 'lucide-mithril'

export const MyPage = {
  view() {
    return m('div', null, [
      m(Alert, { color: 'info' }, [
        m(Info),
        m('span', null, '12 unread messages. Tap to see.')
      ]),

      m(Alert, { variant: 'soft', color: 'success' }, [
        m(CheckCircle),
        m('span', null, 'Your purchase has been confirmed!')
      ]),

      m(Alert, { direction: 'vertical', color: 'warning' }, [
        m(AlertTriangle),
        m('span', null, 'Warning: Invalid email address!')
      ])
    ])
  }
}`

export default {
  name: 'Alert',
  category: 'Feedback',
  description: 'Alert component for displaying important messages and notifications.',

  oninit() { loadPageI18n('alert') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Alert</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        {/* Neutral Alert (no color) */}
        <Block spacing="lg">
          <Title as="h2" size="3">Neutral (No Color)</Title>
          <Text color="neutral">Without a `color` prop, the alert falls back to a neutral base-200 background.</Text>
          <Stack gap="xs">
            <Alert>
              <ChevronRight />
              <span>Neutral alert without a color prop.</span>
            </Alert>
          </Stack>
        </Block>

        {/* Base Alert */}
        <Block spacing="lg">
          <Title as="h2" size="3">Base Alert</Title>
          <Text color="neutral">Default alert with different colors.</Text>
          <Stack gap="xs">
            <Alert color="info">
              <Info />
              <span>12 unread messages. Tap to see.</span>
            </Alert>
            <Alert color="success">
              <CheckCircle />
              <span>Your purchase has been confirmed!</span>
            </Alert>
            <Alert color="warning">
              <AlertTriangle />
              <span>Warning: Invalid email address!</span>
            </Alert>
            <Alert color="error">
              <AlertCircle />
              <span>Error! Task failed successfully.</span>
            </Alert>
          </Stack>
        </Block>

        {/* Soft Style */}
        <Block spacing="lg">
          <Title as="h2" size="3">Soft Style</Title>
          <Text color="neutral">Soft background with no border.</Text>
          <Stack gap="xs">
            <Alert variant="soft" color="info">
              <Info />
              <span>12 unread messages. Tap to see.</span>
            </Alert>
            <Alert variant="soft" color="success">
              <CheckCircle />
              <span>Your purchase has been confirmed!</span>
            </Alert>
            <Alert variant="soft" color="warning">
              <AlertTriangle />
              <span>Warning: Invalid email address!</span>
            </Alert>
            <Alert variant="soft" color="error">
              <AlertCircle />
              <span>Error! Task failed successfully.</span>
            </Alert>
          </Stack>
        </Block>

        {/* Outline Style */}
        <Block spacing="lg">
          <Title as="h2" size="3">Outline Style</Title>
          <Text color="neutral">Transparent background with colored border.</Text>
          <Stack gap="xs">
            <Alert variant="outline" color="info">
              <Info />
              <span>12 unread messages. Tap to see.</span>
            </Alert>
            <Alert variant="outline" color="success">
              <CheckCircle />
              <span>Your purchase has been confirmed!</span>
            </Alert>
            <Alert variant="outline" color="warning">
              <AlertTriangle />
              <span>Warning: Invalid email address!</span>
            </Alert>
            <Alert variant="outline" color="error">
              <AlertCircle />
              <span>Error! Task failed successfully.</span>
            </Alert>
          </Stack>
        </Block>

        {/* Dash Style */}
        <Block spacing="lg">
          <Title as="h2" size="3">Dash Style</Title>
          <Text color="neutral">Transparent background with dashed border.</Text>
          <Stack gap="xs">
            <Alert variant="dash" color="info">
              <Info />
              <span>12 unread messages. Tap to see.</span>
            </Alert>
            <Alert variant="dash" color="success">
              <CheckCircle />
              <span>Your purchase has been confirmed!</span>
            </Alert>
            <Alert variant="dash" color="warning">
              <AlertTriangle />
              <span>Warning: Invalid email address!</span>
            </Alert>
            <Alert variant="dash" color="error">
              <AlertCircle />
              <span>Error! Task failed successfully.</span>
            </Alert>
          </Stack>
        </Block>

        {/* With Buttons + Responsive */}
        <Block spacing="lg">
          <Title as="h2" size="3">With Buttons + Responsive</Title>
          <Text color="neutral">Vertical on mobile, horizontal on desktop. Includes action buttons.</Text>
          <Alert direction="vertical" color="info">
            <Info />
            <span>we use cookies for no reason.</span>
            <div className={css({ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' })}>
              <button className={css({ padding: '0.5rem 1rem', fontSize: '0.875rem', border: '1px solid', borderColor: 'currentColor', borderRadius: 'var(--radius-selector)', background: 'transparent', cursor: 'pointer' })}>Deny</button>
              <button className={css({ padding: '0.5rem 1rem', fontSize: '0.875rem', border: '1px solid', borderColor: 'currentColor', borderRadius: 'var(--radius-selector)', background: 'var(--colors-primary)', color: 'var(--colors-primary-content)', cursor: 'pointer' })}>Accept</button>
            </div>
          </Alert>
        </Block>

        {/* With Title and Description */}
        <Block spacing="lg">
          <Title as="h2" size="3">With Title and Description</Title>
          <Text color="neutral">Structured alert with title, description, and action button.</Text>
          <Alert direction="vertical" color="info">
            <Info />
            <div className={css({ display: 'flex', flexDirection: 'column', gap: '0.25rem' })}>
              <h3 className={css({ fontWeight: '700', fontSize: '1rem' })}>New message!</h3>
              <div className={css({ fontSize: '0.75rem', opacity: 0.8 })}>You have 1 unread message</div>
            </div>
            <button className={css({ padding: '0.5rem 1rem', fontSize: '0.875rem', border: '1px solid', borderColor: 'currentColor', borderRadius: 'var(--radius-selector)', background: 'transparent', cursor: 'pointer', marginTop: '0.5rem' })}>See</button>
          </Alert>
        </Block>

        {/* Horizontal Direction (default) */}
        <Block spacing="lg">
          <Title as="h2" size="3">Horizontal Direction (Default)</Title>
          <Text color="neutral">Content flows horizontally, good for desktop.</Text>
          <Stack gap="xs">
            <Alert direction="horizontal" color="info">
              <Info />
              <span>Horizontal info alert</span>
            </Alert>
            <Alert direction="horizontal" color="success">
              <CheckCircle />
              <span>Horizontal success alert</span>
            </Alert>
          </Stack>
        </Block>

        {/* Vertical Direction */}
        <Block spacing="lg">
          <Title as="h2" size="3">Vertical Direction</Title>
          <Text color="neutral">Content stacks vertically, good for mobile.</Text>
          <Stack gap="xs">
            <Alert direction="vertical" color="info">
              <Info />
              <span>Vertical info alert</span>
            </Alert>
            <Alert direction="vertical" color="success">
              <CheckCircle />
              <span>Vertical success alert</span>
            </Alert>
          </Stack>
        </Block>

        {/* Style + Direction Combined */}
        <Block spacing="lg">
          <Title as="h2" size="3">Style + Vertical Direction</Title>
          <Text color="neutral">The `variant` prop (soft, outline, dash) combines with `direction="vertical"`.</Text>
          <Stack gap="xs">
            <Alert variant="soft" direction="vertical" color="warning">
              <AlertTriangle />
              <span>Soft + vertical warning alert</span>
            </Alert>
            <Alert variant="outline" direction="vertical" color="error">
              <AlertCircle />
              <span>Outline + vertical error alert</span>
            </Alert>
            <Alert variant="dash" direction="vertical" color="success">
              <CheckCircle />
              <span>Dash + vertical success alert</span>
            </Alert>
          </Stack>
        </Block>

        {/* Without Icons */}
        <Block spacing="lg">
          <Title as="h2" size="3">Without Icons</Title>
          <Text color="neutral">Alerts can be used without icons.</Text>
          <Stack gap="xs">
            <Alert color="info">Info alert without icon</Alert>
            <Alert color="success">Success alert without icon</Alert>
            <Alert color="warning">Warning alert without icon</Alert>
            <Alert color="error">Error alert without icon</Alert>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <Tabs defaultActive="jsx" lifted size="lg">
            <Tab ref="jsx">Jsx</Tab>
            <Tab ref="js">Js</Tab>
            <TabContent ref="jsx">
              <CodeExample copyId="alert-jsx-copy" type="jsx" code={usageCodeJsx} />
            </TabContent>
            <TabContent ref="js">
              <CodeExample copyId="alert-js-copy"  type="javascript" code={usageCodeJavascript} />
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