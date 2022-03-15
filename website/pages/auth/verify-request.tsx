import type { NextPage } from 'next'
import NextLink from 'next/link'
import { Center, Icon, Link, Stack, Text } from '@chakra-ui/react'
import { RiMailCheckFill } from 'react-icons/ri'
import { Layout } from '../../components/Layout'

const VerifyRequest: NextPage = () => {
  return (
    <Layout>
      <Center m='24'>
        <Stack spacing={2} textAlign='center' align='center'>
          <Icon as={RiMailCheckFill} boxSize={12} color='blue.900' />
          <Text fontSize='4xl'>Check your email</Text>
          <Text fontSize='xl' py='6'>
            A sign in link has been sent to your email address.
          </Text>
          <NextLink href='/' passHref>
            <Link variant='kalabam'>back home</Link>
          </NextLink>
        </Stack>
      </Center>
    </Layout>
  )
}

export default VerifyRequest
