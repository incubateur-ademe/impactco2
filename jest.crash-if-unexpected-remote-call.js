import { emitter } from 'nock'

emitter.on('no match', (req) => {
  throw new Error(`Unexpected request was sent to ${req.path}`)
})
