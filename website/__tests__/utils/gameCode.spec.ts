/* eslint-env jest */
import { generateGameCode, formatGameCode } from '../../utils/gameCode'

describe('generateGameCode', () => {
  test('Generates 6 digit number', () => {
    expect(generateGameCode()).toHaveLength(6)
  })

  test('GameCode does not start with 0', () => {
    expect(generateGameCode()[0]).not.toBe(0)
  })
})

describe('formatGameCode', () => {
  test('Generates 7 digit string', () => {
    const gameCode = generateGameCode()
    expect(formatGameCode(gameCode)).toHaveLength(7)
  })
})
