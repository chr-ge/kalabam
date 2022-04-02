import { FC, ReactElement, ReactNode } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { MemoryRouter } from 'react-router-dom'
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { en, fr } from 'make-plural/plurals'

import { messages } from '../locales/en/messages'
import { messages as frMessages } from '../locales/fr/messages'

i18n.load({
  en: messages,
  fr: frMessages,
})
i18n.loadLocaleData({
  en: { plurals: en },
  fr: { plurals: fr },
})

const AllProviders: FC = ({ children }) => (
  <ChakraProvider theme={theme}>
    <I18nProvider i18n={i18n}>
      <MemoryRouter>{children}</MemoryRouter>
    </I18nProvider>
  </ChakraProvider>
)

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options })

export { customRender as render }
