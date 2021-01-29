/* eslint-env jest */
import { reorder } from '../../utils/sort'

describe('reorder', () => {
  test('Reorders array properly with valid startIndex and endIndex', () => {
    const array = [1, 2, 3, 4]
    expect(reorder(array, 1, 3)).toEqual([1, 3, 4, 2])
  })

  test('Returns same array when startIndex and endIndex are equal', () => {
    const array = [1, 2, 3, 4]
    expect(reorder(array, 1, 1)).toEqual([1, 2, 3, 4])
  })

  test('Reorders array properly with negative endIndex', () => {
    const array = [1, 2, 3, 4]
    expect(reorder(array, 1, -1)).toEqual([1, 3, 2, 4])
  })
})
