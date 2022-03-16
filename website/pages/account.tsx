import type { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { Box, Button, Container, Flex, Heading, Text } from '@chakra-ui/react'
import { Layout } from '../components/Layout'

interface AccountProps {
  user: Record<string, unknown>
}

const Account: NextPage<AccountProps> = ({ user }) => {
  return (
    <Layout title='My Account | Kalabam' bg='gray.100'>
      <Container mt='6'>
        <Heading mb='6' textAlign='center'>
          My Account
        </Heading>
        <Flex direction='column'>
          <Box p='2' bg='white' rounded='sm' shadow='md'>
            <Box mb='6'>
              <Text fontWeight='bold' fontSize='xl' bg='teal.100' pl='4'>
                Name
              </Text>
              <Text mt='2' pl='4' fontSize='lg'>
                {user.name}
              </Text>
            </Box>
            <Box mb='4'>
              <Text fontWeight='bold' fontSize='xl' bg='teal.100' pl='4'>
                Email
              </Text>
              <Text mt='2' pl='4' fontSize='lg'>
                {user.email}
              </Text>
            </Box>
          </Box>
          <Box mt='8'>
            <Flex
              p='2'
              border='1px'
              bgColor='gray.200'
              borderColor='gray.500'
              rounded='sm'
              shadow='md'
              justify='space-between'
              align='center'
            >
              <Text pl='2' fontWeight='bold'>
                Advanced
              </Text>
              <Button
                aria-label='Delete account'
                colorScheme='red'
                size='sm'
                fontWeight='light'
              >
                Delete account
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    }
  }

  return {
    props: {
      user: session.user,
    },
  }
}

export default Account
