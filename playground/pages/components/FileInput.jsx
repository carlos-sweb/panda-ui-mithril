import m from 'mithril'
import { css } from '../../../styled-system/css'
import { FileInput } from '../../../src/index.js'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'FileInput',
  category: 'Data Input',
  description: 'File input component for uploading files.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>File Input</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          File input component for uploading files.
        </p>

        <FileInput />
        <FileInput color="primary" />
        <FileInput color="secondary" />
      </div>
    )
  }
}
