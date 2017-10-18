import {
  bye,
} from './lib'

console.log('starting function')

export function handle(e, ctx, cb) {
  console.log('processing event: %j', e)
  cb(null, bye(e.name))
}
