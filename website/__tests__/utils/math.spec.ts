/* eslint-env jest */
import {
  calculateAverageAccuracy,
  calculateAveragePlayerAccuracy,
} from '../../utils/math'

describe('calculateAverageAccuracy works correctly', () => {
  test('data includes true and false', () => {
    const data = [
      { isCorrect: true },
      { isCorrect: true },
      { isCorrect: true },
      { isCorrect: false },
    ]
    expect(calculateAverageAccuracy(data)).toEqual(0.75)
  })

  test('data only false', () => {
    const data = [{ isCorrect: false }, { isCorrect: false }]
    expect(calculateAverageAccuracy(data)).toEqual(0)
  })
})

describe('calculateAveragePlayerAccuracy works correctly', () => {
  test('data includes true and false', () => {
    const data = [
      { answers: [{ id: '1', isCorrect: false }] },
      { answers: [{ id: '1', isCorrect: true }] },
    ]
    expect(calculateAveragePlayerAccuracy(data, '1')).toEqual(0.5)
  })

  test('data only false', () => {
    const data = [
      { answers: [{ id: '1', isCorrect: false }] },
      { answers: [{ id: '1', isCorrect: false }] },
    ]
    expect(calculateAveragePlayerAccuracy(data, '1')).toEqual(0)
  })
})
