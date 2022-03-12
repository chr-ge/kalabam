import React from 'react'
import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { FaGlobeAmericas, FaCheck } from 'react-icons/fa'
import { i18n } from '@lingui/core'
import { useLingui } from '@lingui/react'
import { en, fr } from 'make-plural/plurals'
import { t } from '@lingui/macro'

const locales = {
  en: 'English',
  fr: 'Français',
}

i18n.loadLocaleData({
  en: { plurals: en },
  fr: { plurals: fr },
})

const dynamicActivate = async (locale) => {
  const { messages } = await import(`../locales/${locale}/messages`)
  i18n.load(locale, messages)
  i18n.activate(locale)
}

export const LangSwitcher = () => {
  const { i18n } = useLingui()

  return (
    <Menu>
      <MenuButton
        as={Button}
        variant='outline'
        rounded='full'
        aria-label={t`Change language`}
        leftIcon={<FaGlobeAmericas />}
      >
        {i18n.locale.toLocaleUpperCase()}
      </MenuButton>
      <MenuList w={1 / 2}>
        {Object.keys(locales).map((l) => (
          <MenuItem key={l} onClick={() => dynamicActivate(l)}>
            {locales[l]}
            {l === i18n.locale && <Icon ml='2' color='teal.400' as={FaCheck} />}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}
