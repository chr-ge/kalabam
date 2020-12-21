/* eslint-env jest */
import React from 'react'
import { screen } from '@testing-library/react'
import { render } from '../test-utils'
import { MemoryRouter } from 'react-router-dom'
import Joined from '../pages/Joined'

test('renders information text', () => {
  render(<Joined />, { wrapper: MemoryRouter })
  expect(screen.getByText(/You Joined the Game!/i)).toBeInTheDocument()
  expect(screen.getByText(/You should see your name on screen./i)).toBeInTheDocument()
})
