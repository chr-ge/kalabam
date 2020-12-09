/* eslint-env jest */
import React from 'react'
import { screen } from '@testing-library/react'
import { render } from '../test-utils'
import Home from '../pages/Home'

test('renders kalabam.com footer link', () => {
  render(<Home />)
  const textElement = screen.getByText(/kalabam.com/i)
  expect(textElement).toBeInTheDocument()
})
