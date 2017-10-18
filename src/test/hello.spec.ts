/**
 * Test hello
 */

import {expect} from 'chai'
import {
  greet,
} from '../hello/lib'
describe('hello/lib', () => {
  it('greet()', () => {
    const result = greet('foobar')
    expect(result).to.equal('Hello, foobar')
  })
})