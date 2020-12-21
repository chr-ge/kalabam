/* eslint-env jest */
import React from 'react'
import { screen } from '@testing-library/react'
import { render } from '../test-utils'
import Home from '../pages/Home'

test('renders Join Game button', () => {
  render(<Home />)
  expect(screen.getByText(/Join Game/i)).toBeInTheDocument()
})

test('renders kalabam.com footer link', () => {
  render(<Home />)
  expect(screen.getByText(/kalabam.com/i)).toBeInTheDocument()
})
