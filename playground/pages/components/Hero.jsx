import m from 'mithril'
import { css } from '../../../styled-system/css'
import { Hero, HeroContent, Button } from '../../../src/index.js'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Hero',
  category: 'Layout',
  description: 'Hero section component for prominent page headers.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Hero</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Hero section component for prominent page headers.
        </p>

        <Hero className="bg-base-200 min-h-[200px] rounded-box">
          <HeroContent className="text-center">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">Provident cupiditate voluptatem esse. Quam aut harum voluptatum.</p>
            <Button color="primary">Get Started</Button>
          </HeroContent>
        </Hero>
      </div>
    )
  }
}
