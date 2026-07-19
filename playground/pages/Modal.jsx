import m from 'mithril'
import { css } from '../../styled-system/css'
import { Button, Modal } from '../../src/index.js'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Modal',
  category: 'Feedback',
  description: 'Modal component for displaying dialog windows and overlays.',

  view() {
    return <div className={stack}>{<h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Modal</h1>}{<p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>Modal component for displaying dialog windows and overlays.</p>}{<Button onclick={() => document.getElementById('demo_modal').showModal()}>Open Modal</Button>}{<dialog id="demo_modal" className="modal">{<div className="modal-box">{<h3 className="text-lg font-bold">Hello!</h3>}{<p className="py-4">This is a modal dialog using the Modal component.</p>}{<div className="modal-action">{<form method="dialog">{<Button>Close</Button>}</form>}</div>}</div>}{<form method="dialog" className="modal-backdrop">{<button>close</button>}</form>}</dialog>}</div>
  }
}
