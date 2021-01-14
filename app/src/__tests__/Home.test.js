/* eslint-env jest */
import React from 'react'
import { screen, act } from '@testing-library/react'
import { render } from '../test-utils'
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { en, fr } from 'make-plural/plurals'

import { messages } from '../locales/en/messages'
import { messages as frMessages } from '../locales/fr/messages'

import Home from '../pages/Home'

i18n.load({
  en: messages,
  fr: frMessages
})
i18n.loadLocaleData({
  en: { plurals: en },
  fr: { plurals: fr }
})

const TestingProvider = ({ children }) => (
  <I18nProvider i18n={i18n}>
    {children}
  </I18nProvider>
)

test('renders Join Game button', () => {
  act(() => {
    i18n.activate('en')
  })

  render(<Home />, { wrapper: TestingProvider })
  expect(screen.getByText(/Join Game/i)).toBeInTheDocument()
})

test("renders 'Rejoins le jeu' button", () => {
  act(() => {
    i18n.activate('fr')
  })

  render(<Home />, { wrapper: TestingProvider })
  expect(screen.getByText(/Rejoins le jeu/i)).toBeInTheDocument()
})

test('renders kalabam.com footer link', () => {
  act(() => {
    i18n.activate('en')
  })

  render(<Home />, { wrapper: TestingProvider })
  expect(screen.getByText(/kalabam.com/i)).toBeInTheDocument()
})
