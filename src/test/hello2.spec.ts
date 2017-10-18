/**
 * Test hello2
 */


import {expect} from 'chai'
import {
  bye,
} from '../hello2/lib'
describe('hello2/lib', () => {
  it('bye()', () => {
    const result = bye('foobar')
    expect(result).to.equal('Bye, foobar')
  })
})