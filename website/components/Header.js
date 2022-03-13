import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import {
  chakra,
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  MenuItem,
  Spacer,
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
    display: { base: 'none', md: 'initial' },
    _hover: {
      borderLeftWidth: 'thick',
      borderColor: 'teal.500',
      transition: '0.1s',
    },
  },
})

export const Header = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const isLoading = status === 'loading'

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
        <Heading py='1' variant='logo' fontSize='4xl'>
          Kalabam
        </Heading>
        <Spacer />
        {session && (
          <>
            <SkewLink href='/dashboard'>Dashboard</SkewLink>
            <SkewLink href='/reports'>Reports</SkewLink>
            <SkewLink href='/discover'>Discover</SkewLink>
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
              isLoading={isLoading}
              onClick={(e) => {
                e.preventDefault()
                signIn()
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
                isLoading={isLoading}
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
                  <MenuItem
                    onClick={() => router.push('/dashboard')}
                    display={{ base: 'flex', md: 'none' }}
                  >
                    Dashboard
                  </MenuItem>
                  <MenuItem
                    onClick={() => router.push('/reports')}
                    display={{ base: 'flex', md: 'none' }}
                  >
                    Reports
                  </MenuItem>
                  <MenuDivider display={{ base: 'flex', md: 'none' }} />
                  <MenuItem onClick={() => router.push('/account')}>
                    My Account
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      e.preventDefault()
                      signOut()
                    }}
                  >
                    Logout
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem
                    /* eslint-disable no-undef */
                    onClick={() => $crisp.push(['do', 'chat:open'])}
                  >
                    Help
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          )}
        </Box>
      </Flex>
    </nav>
  )
}
