import type { FC } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import {
  chakra,
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  MenuItem,
  Spacer,
} from '@chakra-ui/react'

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
      transition: 'border 0.1s ease',
    },
  },
})

export const Header: FC = () => {
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
            <NextLink href='/dashboard' passHref>
              <SkewLink>Dashboard</SkewLink>
            </NextLink>
            <NextLink href='/reports' passHref>
              <SkewLink>Reports</SkewLink>
            </NextLink>
            <NextLink href='/discover' passHref>
              <SkewLink>Discover</SkewLink>
            </NextLink>
            <Spacer />
          </>
        )}
        <Box>
          <Button
            as='a'
            href='https://play.kalabam.com'
            aria-label='Play a Game'
            colorScheme='teal'
            variant='outline'
            size='sm'
            mr='2'
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
                    /* @ts-ignore */
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
