import { signin, signout, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import {
  Avatar,
  Button,
  Flex,
  Heading,
  Link,
  Menu,
  MenuButton,
  Box,
  MenuList,
  MenuDivider,
  MenuItem
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
        py='1'
        px='4'
        align='center'
        justify='space-between'
        backgroundColor='gray.200'
        borderBottomColor='gray.300'
        borderBottomWidth='thick'
      >
        <Heading variant='logo'>Kalabam</Heading>
        <Box>
          <Button
            as={Link}
            colorScheme='teal'
            size='sm'
            marginRight='2'
            textDecoration='none !important'
            href='https://play.kalabam.com'
          >
            Play
          </Button>
          {!session && (
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
          )}
          {session && (
            <>
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
            </>
          )}
        </Box>
      </Flex>
    </nav>
  )
}

export default Header
