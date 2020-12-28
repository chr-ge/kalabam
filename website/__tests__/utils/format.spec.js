/* eslint-env jest */
import { formatDateTime, formatDiffDuration } from '../../utils/format'

test('formatDateTime formats date and time correctly', () => {
  expect(formatDateTime('2020-12-27T06:40:37.707')).toEqual('Dec 27 2020, 6:40 am')
})

test('formatDiffDuration formats diff duration correctly', () => {
  expect(formatDiffDuration('2020-12-27T06:59:31.100Z', '2020-12-27T06:59:33.000Z')).toEqual('a few seconds')
})
