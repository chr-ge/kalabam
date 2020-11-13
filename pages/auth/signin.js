import React, { useState } from 'react'
import Link from 'next/link'
import { providers, signIn } from 'next-auth/client'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Divider,
  Center,
  Heading,
  Flex,
  Link as A,
  Stack,
  Input,
  Text
} from '@chakra-ui/core'
import { FaGoogle, FaApple } from 'react-icons/fa'
import Layout from '../../components/Layout'

export default function SignIn ({ providers, error }) {
  const [email, setEmail] = useState('')

  return (
    <Layout title='Sign In | Kalabam'>
      <Center m='16'>
        <Stack spacing={3}>
          {error && (
            <Alert status='error'>
              <AlertIcon />
              <AlertTitle mr={2}>Error!</AlertTitle>
              {error}
            </Alert>
          )}
          <Heading>Sign In To Kalabam</Heading>
          <Text mb='10' fontSize='sm' textAlign='center' color='gray.500' pt='1'>
            Need an account?{' '}
            <Link href='/auth/signup'>
              <A color='blue.900'>Sign Up</A>
            </Link>
          </Text>
          <Button
            leftIcon={<FaGoogle />}
            size='lg'
            colorScheme='googleBlue'
            onClick={() => signIn(providers.google.id)}
          >
            Sign in with Google
          </Button>
          <Button
            leftIcon={<FaApple />}
            size='lg'
            colorScheme='black'
            onClick={() => signIn(providers.apple.id)}
          >
            Sign in with Apple
          </Button>
          <Flex align='center'>
            <Divider color='gray.400' />
            <Text p='2' fontSize='xs' color='gray.400'>
              Or
            </Text>
            <Divider color='gray.400' />
          </Flex>
          <Input
            aria-label='Email Input'
            placeholder='Email Address'
            size='lg'
            borderColor='gray.400'
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button colorScheme='pink' onClick={() => signIn('email', { email })}>
            Sign in with Email
          </Button>
        </Stack>
      </Center>
    </Layout>
  )
}

SignIn.getInitialProps = async (context) => {
  return {
    providers: await providers(context),
    error: context.query.error
  }
}
