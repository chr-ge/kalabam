import { useState } from 'react'
import { providers, signIn, getSession } from 'next-auth/client'
import {
  Button,
  Divider,
  Center,
  Heading,
  Flex,
  Stack,
  Input,
  Text
} from '@chakra-ui/react'
import { FaGoogle, FaApple } from 'react-icons/fa'
import Layout from '../../components/Layout'
import { Link } from '../../components/Link'

function SignUp ({ providers }) {
  const [email, setEmail] = useState('')

  return (
    <Layout title='Sign Up | Kalabam'>
      <Center m='16'>
        <Stack spacing={3}>
          <Heading>Sign Up To Kalabam</Heading>
          <Text
            mb='10'
            fontSize='sm'
            textAlign='center'
            color='gray.500'
            pt='1'
          >
            Already Have An Account?{' '}
            <Link href='/auth/signin' variant='kalabam'>Login</Link>
          </Text>
          <Button
            leftIcon={<FaGoogle />}
            size='lg'
            colorScheme='googleBlue'
            onClick={() => signIn(providers.google.id)}
          >
            Sign Up With Google
          </Button>
          <Button
            leftIcon={<FaApple />}
            size='lg'
            colorScheme='black'
            onClick={() => signIn(providers.apple.id)}
          >
            Sign Up With Apple
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
          />
          <Button colorScheme='pink' onClick={() => signIn('email', { email })}>
            Sign Up With Email
          </Button>
          <Text pt='3' fontSize='xs'>
            I accept the site <Link href='/tos' variant='kalabam'>Terms of Service</Link> and agree to the{' '}
            <Link href='/privacy' variant='kalabam'>Privacy Policy</Link>.
          </Text>
        </Stack>
      </Center>
    </Layout>
  )
}

export async function getServerSideProps (context) {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false
      }
    }
  }

  return {
    props: {
      providers: await providers(context),
      error: context.query.error || null
    }
  }
}

export default SignUp
