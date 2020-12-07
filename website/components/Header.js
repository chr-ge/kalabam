import { signin, signout, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  Box,
  MenuList,
  MenuDivider,
  MenuItem,
  Flex,
  Heading
} from '@chakra-ui/react'

const Header = () => {
  const [session, loading] = useSession()
  const router = useRouter()

  return (
    <nav>
      <noscript>
        <style>{'.nojs-show { opacity: 1; top: 0; }'}</style>
      </noscript>
      <Flex
        align='center'
        justify='space-between'
        backgroundColor='gray.200'
        borderBottomColor='gray.300'
        borderBottomWidth='thick'
        py='1'
        px='4'
      >
        <Heading color='blue.800'>Kalabam</Heading>
        {!session && (
          <Box>
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
