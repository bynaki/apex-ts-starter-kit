import {
  greet,
} from './lib'
import * as _ from 'lodash'

const array = [1]
const other = _.concat(array, 2, [3], [4, 5])
console.log('_concat(): ', other)


console.log('starting function')

export function handle(e, ctx, cb) {
  console.log('processing event: %j', e)
  cb(null, greet(e.name))
}
