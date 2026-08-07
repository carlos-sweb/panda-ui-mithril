import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Aura, Button, Card, CardBody } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const row = css({ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' })
const section = css({ marginBottom: '2rem' })
const cardSurface = css({ background: 'token(colors.base-100)', width: '14rem' })
const primaryColor = css({ color: 'token(colors.primary)' })

const usageCode = `<Aura>
  <Button>Button with aura</Button>
</Aura>

<Aura variant="holo" shape="box">
  <Card className="bg-base-100">
    <CardBody><p>This card has aura</p></CardBody>
  </Card>
</Aura>`

const classRows = [
  { className: 'aura', prop: '<Aura>', type: 'Component', description: "Container that adds a light effect aura around an element. By default it's a rotating border" },
  { className: 'aura-dual', prop: 'variant="dual"', type: 'Style', description: 'Uses two light effects' },
  { className: 'aura-rainbow', prop: 'variant="rainbow"', type: 'Style', description: 'Uses rainbow colors for the light effect' },
  { className: 'aura-holo', prop: 'variant="holo"', type: 'Style', description: 'Uses holographic colors for the light effect' },
  { className: 'aura-gold', prop: 'variant="gold"', type: 'Style', description: 'Uses gold colors for the light effect' },
  { className: 'aura-silver', prop: 'variant="silver"', type: 'Style', description: 'Uses silver colors for the light effect' },
  { className: 'aura-glow', prop: 'variant="glow"', type: 'Style', description: 'Uses a glowing effect instead of a rotating border' },
  { className: '(corner radius)', prop: 'shape="box" | "field" | "selector"', type: 'Modifier', description: 'Matches the aura\'s corner radius to what it wraps (card/alert, button/input, checkbox/toggle/badge)' },
  { className: 'aura-xs', prop: 'size="xs"', type: 'Size', description: 'Extra small size' },
  { className: 'aura-sm', prop: 'size="sm"', type: 'Size', description: 'Small size' },
  { className: 'aura-md', prop: 'size="md" (default)', type: 'Size', description: 'Medium size', isDefault: true },
  { className: 'aura-lg', prop: 'size="lg"', type: 'Size', description: 'Large size' },
  { className: 'aura-xl', prop: 'size="xl"', type: 'Size', description: 'Extra large size' },
]

export default {
  name: 'Aura',
  category: 'Feedback',
  description: 'Aura is a border light effect that can wrap around any component.',

  oninit() { loadPageI18n('aura') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Aura</Title>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <section className={section}>
          <Title as="h3" size="5">Around a button (default)</Title>
          <div className={row}>
            <Aura shape="field" className={primaryColor}>
              <Button color="primary">Upgrade now</Button>
            </Aura>
          </div>
        </section>

        <section className={section}>
          <Title as="h3" size="5">Around a card</Title>
          <div className={row}>
            <Aura shape="box">
              <Card className={cardSurface}>
                <CardBody><p>This card has aura</p></CardBody>
              </Card>
            </Aura>
          </div>
        </section>

        <section className={section}>
          <Title as="h3" size="5">Variants</Title>
          <div className={row}>
            <Aura variant="dual" shape="field" className={primaryColor}><Button>dual</Button></Aura>
            <Aura variant="rainbow" shape="field"><Button>rainbow</Button></Aura>
            <Aura variant="holo" shape="field"><Button>holo</Button></Aura>
            <Aura variant="gold" shape="field"><Button>gold</Button></Aura>
            <Aura variant="silver" shape="field"><Button>silver</Button></Aura>
            <Aura variant="glow" shape="field" className={primaryColor}><Button>glow</Button></Aura>
          </div>
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
