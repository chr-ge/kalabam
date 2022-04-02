import { FC } from 'react'
import {
  useColorMode,
  useColorModeValue,
  IconButton,
  type IconButtonProps,
} from '@chakra-ui/react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { t } from '@lingui/macro'

interface ColorModeSwitcherProps extends Omit<IconButtonProps, 'aria-label'> {}

export const ColorModeSwitcher: FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)

  return (
    <IconButton
      aria-label={t`Switch to ${text} mode`}
      size='md'
      fontSize='lg'
      variant='ghost'
      color='current'
      marginLeft='2'
      rounded='full'
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      {...props}
    />
  )
}
