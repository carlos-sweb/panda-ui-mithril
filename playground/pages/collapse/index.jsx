import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Collapse, CollapseTitle, CollapseContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const section = css({ marginBottom: '2rem' })

const usageCode = `<Collapse plus border>
  <CollapseTitle>How do I create an account?</CollapseTitle>
  <CollapseContent>
    Click the "Sign Up" button in the top right corner and follow the registration process.
  </CollapseContent>
</Collapse>`

const classRows = [
  { className: 'collapse', prop: '<Collapse>', type: 'Component', description: 'Collapse container — click the title to toggle' },
  { className: 'collapse-title', prop: '<CollapseTitle>', type: 'Part', description: 'Title part' },
  { className: 'collapse-content', prop: '<CollapseContent>', type: 'Part', description: 'Content part' },
  { className: 'collapse-arrow', prop: 'arrow', type: 'Modifier', description: 'Adds arrow icon' },
  { className: 'collapse-plus', prop: 'plus', type: 'Modifier', description: 'Adds plus/minus icon' },
  { className: 'collapse-open', prop: 'checked', type: 'Modifier', description: 'Force open (controlled)' },
  { className: '—', prop: 'border', type: 'Modifier', description: 'base-100 background + base-300 border (the reference implementation applies this via plain utility classes, not a component class)' },
]

export default {
  name: 'Collapse',
  category: 'Layout',
  description: 'Collapse component for toggling visibility of content sections.',

  oninit() { loadPageI18n('collapse') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Collapse</Title>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <section className={section}>
          <Title as="h3" size="5">Arrow</Title>
          <Collapse arrow border>
            <CollapseTitle>How do I create an account?</CollapseTitle>
            <CollapseContent>
              Click the "Sign Up" button in the top right corner and follow the registration process.
            </CollapseContent>
          </Collapse>
        </section>

        <section className={section}>
          <Title as="h3" size="5">Plus / minus</Title>
          <Collapse plus border>
            <CollapseTitle>Can I cancel my subscription?</CollapseTitle>
            <CollapseContent>
              Yes, you can cancel anytime from your account settings — no questions asked.
            </CollapseContent>
          </Collapse>
        </section>

        <section>
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <CodeExample code={usageCode} />
        </section>

        <section>
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={classRows} />
        </section>
      </div>
    )
  }
}
