import m from 'mithril'
import { css } from '../../styled-system/css'
import { Carousel, CarouselItem } from '../../src/index.js'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Carousel',
  category: 'Layout',
  description: 'Carousel component for displaying content in a slideshow.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Carousel</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Carousel component for displaying content in a slideshow.
        </p>

        <Carousel className="w-full">
          <CarouselItem><img src="https://picsum.photos/300/200?random=1" className="rounded-box w-full" /></CarouselItem>
          <CarouselItem><img src="https://picsum.photos/300/200?random=2" className="rounded-box w-full" /></CarouselItem>
          <CarouselItem><img src="https://picsum.photos/300/200?random=3" className="rounded-box w-full" /></CarouselItem>
        </Carousel>
      </div>
    )
  }
}
