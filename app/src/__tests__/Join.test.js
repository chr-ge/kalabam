/* eslint-env jest */
import React from 'react'
import { screen } from '@testing-library/react'
import { render } from '../test-utils'
import { MemoryRouter } from 'react-router-dom'
import Join from '../pages/Join'

test("renders 'ready to play' text", () => {
  render(<Join />, { wrapper: MemoryRouter })
  expect(screen.getByText(/Ready to Play/i)).toBeInTheDocument()
})

test('renders kalabam.com footer link', () => {
  render(<Join />, { wrapper: MemoryRouter })
  expect(screen.getByText(/kalabam.com/i)).toBeInTheDocument()
})
