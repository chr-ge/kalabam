import { signin, signout, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import {
  chakra, Avatar, Button, Flex, Heading, Menu, MenuButton, Box, MenuList, MenuDivider, MenuItem, Spacer
} from '@chakra-ui/react'
import { Link } from './Link'

const SkewLink = chakra(Link, {
  baseStyle: {
    px: '4',
    py: '1',
    ml: '2',
    bg: 'teal.400',
    color: 'white',
    textDecoration: 'none !important',
    transform: 'skew(-10deg)',
    _hover: {
      borderLeftWidth: 'thick',
      borderColor: 'teal.500',
      transition: '0.1s'
    }
  }
})

const Header = () => {
  const [session, loading] = useSession()
  const router = useRouter()

  return (
    <nav>
      <noscript>
        <style>{'.nojs-show { opacity: 1; top: 0; }'}</style>
      </noscript>
      <Flex
        px='4'
        align='center'
        backgroundColor='gray.200'
        borderBottomColor='gray.300'
        borderBottomWidth='thick'
      >
        <Heading py='1' variant='logo'>Kalabam</Heading>
        <Spacer />
        {session && (
          <>
            <SkewLink href='/dashboard'>Dashboard</SkewLink>
            <SkewLink href='/reports'>Reports</SkewLink>
            <SkewLink href='/dashboard'>Discover</SkewLink>
            <Spacer />
          </>
        )}
        <Box>
          <Button
            as={Link}
            colorScheme='teal'
            variant='outline'
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
