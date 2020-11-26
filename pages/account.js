import { getSession } from 'next-auth/client'
import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react'
import Layout from '../components/Layout'

function Account ({ session }) {
  return (
    <Box bg='gray.100' h='100%'>
      <Layout title='My Account | Kalabam'>
        <Container mt='6'>
          <Heading mb='6' textAlign='center'>My Account</Heading>
          <Flex direction='column'>
            <Box p='2' bg='white' rounded='md'>
              <Box mb='6'>
                <Text fontWeight='bold' fontSize='xl' bg='yellow.300' pl='4'>
                  Name
                </Text>
                <Text mt='2' pl='4' fontSize='lg'>
                  {session.user.name}
                </Text>
              </Box>
              <Box mb='4'>
                <Text fontWeight='bold' fontSize='xl' bg='orange.300' pl='4'>
                  Email
                </Text>
                <Text mt='2' pl='4' fontSize='lg'>
                  {session.user.email}
                </Text>
              </Box>
            </Box>
          </Flex>
        </Container>
      </Layout>
    </Box>
  )
}

export async function getServerSideProps (context) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false
      }
    }
  }

  return {
    props: {
      session
    }
  }
}

export default Account
