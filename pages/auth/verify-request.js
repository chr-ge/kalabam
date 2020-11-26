import { Center, Icon, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { RiMailCheckFill } from 'react-icons/ri'
import Layout from '../../components/Layout'
import { Link } from '../../components/Link'

function VerifyRequest () {
  const color = useColorModeValue('blue.900', 'blue.200')

  return (
    <Layout>
      <Center m='24'>
        <Stack spacing={2} textAlign='center' align='center'>
          <Icon as={RiMailCheckFill} boxSize={12} color={color} />
          <Text fontSize='4xl'>Check your email</Text>
          <Text fontSize='xl' py='6'>
            A sign in link has been sent to your email address.
          </Text>
          <Link href='/' color={color}>
            back home
          </Link>
        </Stack>
      </Center>
    </Layout>
  )
}

export default VerifyRequest
