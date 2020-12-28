/* eslint-env jest */
import { calculateAverageAccuracy } from '../../utils/math'

describe('calculateAverageAccuracy works correctly', () => {
  test('data includes true and false', () => {
    const data = [{ isCorrect: true }, { isCorrect: true }, { isCorrect: true }, { isCorrect: false }]
    expect(calculateAverageAccuracy(data)).toEqual(0.75)
  })

  test('data only false', () => {
    const data = [{ isCorrect: false }, { isCorrect: false }]
    expect(calculateAverageAccuracy(data)).toEqual(0)
  })
})
