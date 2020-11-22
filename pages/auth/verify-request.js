import { Center, Link, Icon, Stack, Text } from '@chakra-ui/react'
import { RiMailCheckFill } from 'react-icons/ri'
import AuthLayout from '../../components/AuthLayout'

function VerifyRequest () {
  return (
    <AuthLayout>
      <Center m='24'>
        <Stack spacing={2} textAlign='center' align='center'>
          <Icon as={RiMailCheckFill} boxSize={12} color='blue.900' />
          <Text fontSize='4xl'>Check your email</Text>
          <Text fontSize='xl' py='6'>
            A sign in link has been sent to your email address.
          </Text>
          <Link href='/' color='blue.900'>
            back home
          </Link>
        </Stack>
      </Center>
    </AuthLayout>
  )
}

export default VerifyRequest
