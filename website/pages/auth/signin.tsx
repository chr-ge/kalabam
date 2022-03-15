import type { GetServerSideProps, NextPage } from 'next'
import { useState } from 'react'
import {
  signIn,
  getProviders,
  getSession,
  type LiteralUnion,
  type ClientSafeProvider,
} from 'next-auth/react'
import type { BuiltInProviderType } from 'next-auth/providers'
import NextLink from 'next/link'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Center,
  Divider,
  Heading,
  Flex,
  Input,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import { FaGoogle, FaApple } from 'react-icons/fa'
import { Layout } from '../../components/Layout'

interface SignInProps {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >
  error?: string
}

const SignIn: NextPage<SignInProps> = ({ providers, error }) => {
  const [email, setEmail] = useState('')

  return (
    <Layout title='Sign In | Kalabam'>
      <Center m={{ base: '10', md: '16' }}>
        <Stack spacing={3}>
          {error && (
            <Alert status='error'>
              <AlertIcon />
              <AlertTitle mr={2}>Error!</AlertTitle>
              {error}
            </Alert>
          )}
          <Heading
            mb='10'
            textAlign='center'
            fontSize='4xl'
            bgGradient='linear(to-l, #7928CA,#FF0080)'
            bgClip='text'
          >
            Welcome To Kalabam
          </Heading>
          <Button
            size='lg'
            colorScheme='googleBlue'
            onClick={() => signIn(providers.google.id)}
            leftIcon={<FaGoogle />}
          >
            Continue with Google
          </Button>
          <Button
            size='lg'
            colorScheme='black'
            onClick={() => signIn(providers.apple.id)}
            leftIcon={<FaApple />}
          >
            Continue with Apple
          </Button>
          <Flex align='center'>
            <Divider color='gray.400' />
            <Text p='3' fontSize='xs' color='gray.400'>
              Or
            </Text>
            <Divider color='gray.400' />
          </Flex>
          <Input
            aria-label='Email Input'
            placeholder='Email Address'
            type='email'
            size='lg'
            borderColor='gray.400'
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='email'
          />
          <Button colorScheme='pink' onClick={() => signIn('email', { email })}>
            Continue using Email (SSO)
          </Button>
          <Text pt='3' fontSize='xs' align='center'>
            I accept the site{' '}
            <NextLink href='/tos' passHref>
              <Link variant='kalabam'>Terms of Service</Link>
            </NextLink>{' '}
            and agree to the{' '}
            <NextLink href='/privacy' passHref>
              <Link variant='kalabam'>Privacy Policy</Link>
            </NextLink>
            .
          </Text>
        </Stack>
      </Center>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<SignInProps> = async (
  context
) => {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }

  const providers = await getProviders()

  return {
    props: {
      providers,
      error: context.query.error as string | undefined,
    },
  }
}

export default SignIn
