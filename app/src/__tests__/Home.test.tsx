/* eslint-env jest */
import { screen, act } from '@testing-library/react'
import { i18n } from '@lingui/core'
import { render } from '../utils/test-utils'
import Home from '../pages/Home'

test('renders Join Game button', () => {
  act(() => {
    i18n.activate('en')
  })

  render(<Home />)
  expect(screen.getByText(/Join Game/i)).toBeInTheDocument()
})

test("renders 'Rejoins le jeu' button", () => {
  act(() => {
    i18n.activate('fr')
  })

  render(<Home />)
  expect(screen.getByText(/Rejoins le jeu/i)).toBeInTheDocument()
})

test('renders kalabam.com footer link', () => {
  act(() => {
    i18n.activate('en')
  })

  render(<Home />)
  expect(screen.getByText(/kalabam.com/i)).toBeInTheDocument()
})
