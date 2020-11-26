import { signin, signout, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuButton,
  Box,
  MenuList,
  MenuDivider,
  MenuItem,
  Flex,
  Heading,
  useColorMode
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

const Header = () => {
  const [session, loading] = useSession()
  const { colorMode, toggleColorMode } = useColorMode()
  const router = useRouter()

  const isLight = colorMode === 'light'

  const ColorModeButton = () => (
    <IconButton
      size='sm'
      fontSize='xl'
      marginRight='4'
      variant='ghost'
      onClick={toggleColorMode}
      icon={isLight ? <MoonIcon /> : <SunIcon />}
      colorScheme={isLight ? 'purple' : 'yellow'}
      aria-label={`Toggle ${isLight ? 'Dark' : 'Light'}`}
    />
  )

  return (
    <nav>
      <noscript>
        <style>{'.nojs-show { opacity: 1; top: 0; }'}</style>
      </noscript>
      <Flex
        align='center'
        justify='space-between'
        backgroundColor={isLight ? 'gray.200' : 'gray.800'}
        borderBottomColor={isLight ? 'gray.300' : 'gray.900'}
        borderBottomWidth='thick'
        py='1'
        px='4'
      >
        <Heading color={isLight ? 'blue.800' : 'gray.300'}>Kalabam</Heading>
        {!session && (
          <Box>
            <ColorModeButton />
            <Button
              colorScheme='pink'
              color='white'
              aria-label='Sign In'
              size='sm'
              isLoading={loading}
              onClick={(e) => {
                e.preventDefault()
                signin()
              }}
            >
              Sign in
            </Button>
          </Box>
        )}
        {session && (
          <Box>
            <ColorModeButton />
            <Button
              marginRight='4'
              colorScheme='pink'
              color='white'
              aria-label='Sign In'
              size='sm'
              isLoading={loading}
              onClick={() => router.push('/games/create')}
            >
              Create
            </Button>
            <Menu>
              <MenuButton
                as={Avatar}
                src={session.user.image}
                name={session.user.name}
                size='sm'
                cursor='pointer'
              />
              <MenuList borderColor='gray.300'>
                <MenuItem onClick={() => router.push('/account')}>
                  My Account
                </MenuItem>
                <MenuItem
                  onClick={(e) => {
                    e.preventDefault()
                    signout()
                  }}
                >
                  Logout
                </MenuItem>
                <MenuDivider />
                <MenuItem>Help</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        )}
      </Flex>
    </nav>
  )
}

export default Header
