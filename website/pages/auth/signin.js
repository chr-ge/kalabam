import { useState } from 'react'
import { providers, signIn, getSession } from 'next-auth/client'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Center,
  Divider,
  Heading,
  Flex,
  Stack,
  Input,
  Text,
} from '@chakra-ui/react'
import { FaGoogle, FaApple } from 'react-icons/fa'
import { Layout } from '../../components/Layout'
import { Link } from '../../components/Link'

function SignIn({ providers, error }) {
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
            align='center'
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
            <Link href='/tos' variant='kalabam'>
              Terms of Service
            </Link>{' '}
            and agree to the{' '}
            <Link href='/privacy' variant='kalabam'>
              Privacy Policy
            </Link>
            .
          </Text>
        </Stack>
      </Center>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }

  return {
    props: {
      providers: await providers(context),
      error: context.query.error || null,
    },
  }
}

export default SignIn
