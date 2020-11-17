import { getSession } from 'next-auth/client'
import { Heading, Box, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'
import Layout from '../components/Layout'

const AngledText = styled(Text)({
  clipPath: 'polygon(1.5% 0%, 100% 0%, 98.5% 100%, 0% 100%)',
  background: '#11998E',
  background: '-webkit-linear-gradient(to right, #38ef7d, #11998e)', // eslint-disable-line no-dupe-keys
  background: 'linear-gradient(to right, #38EF7D, #11998E)' // eslint-disable-line no-dupe-keys
})

function Account ({ session }) {
  return (
    <Layout title='My Account | Kalabam'>
      <Heading>My Account</Heading>
      <Box my='6'>
        <AngledText fontWeight='bold' fontSize='xl' bg='yellow.300' pl='4'>
          Name
        </AngledText>
        <Text mt='2' pl='4' fontSize='lg'>
          {session.user.name}
        </Text>
      </Box>
      <Box my='6'>
        <AngledText fontWeight='bold' fontSize='xl' bg='orange.300' pl='4'>
          Email
        </AngledText>
        <Text mt='2' pl='4' fontSize='lg'>
          {session.user.email}
        </Text>
      </Box>
    </Layout>
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
