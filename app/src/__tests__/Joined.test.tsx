/* eslint-env jest */
import { screen, act } from '@testing-library/react'
import { i18n } from '@lingui/core'
import { render } from '../utils/test-utils'
import Joined from '../pages/Joined'

describe('renders information text', () => {
  test('english', () => {
    act(() => {
      i18n.activate('en')
    })

    render(<Joined />)
    expect(screen.getByText(/You Joined the Game!/i)).toBeInTheDocument()
    expect(
      screen.getByText(/You should see your name on screen./i)
    ).toBeInTheDocument()
  })

  test('french', () => {
    act(() => {
      i18n.activate('fr')
    })

    render(<Joined />)
    expect(screen.getByText(/Vous avez rejoint le jeu!/i)).toBeInTheDocument()
    expect(
      screen.getByText(/Vous devriez voir votre nom à l'écran./i)
    ).toBeInTheDocument()
  })
})
