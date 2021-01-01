/* eslint-env jest */
import { isEmail } from '../../utils/validate'

describe('isEmail', () => {
  test('valid email', () => {
    expect(isEmail('george@kalabam.com')).toBeTruthy()
  })

  test('invalid email without TLD', () => {
    expect(isEmail('george@kalabam')).toBeFalsy()
  })

  test('invalid email without @', () => {
    expect(isEmail('georgekalabam.com')).toBeFalsy()
  })
})
