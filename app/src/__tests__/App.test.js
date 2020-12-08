/* eslint-env jest */
import React from 'react'
import { screen } from '@testing-library/react'
import { render } from '../test-utils'
import App from '../App'

test('renders kalabam text', () => {
  render(<App />)
  const textElement = screen.getByText(/kalabam/i)
  expect(textElement).toBeInTheDocument()
})
