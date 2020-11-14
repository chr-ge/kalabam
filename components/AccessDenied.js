import { signin } from 'next-auth/client'
import { Heading, Text, Link } from '@chakra-ui/core'

const AccessDenied = () => (
  <>
    <Heading color="red.400">Access Denied</Heading>
    <Text>
      <Link
        href='/auth/signin'
        onClick={(e) => {
          e.preventDefault()
          signin()
        }}
      >
        You must be signed in to view this page
      </Link>
    </Text>
  </>
)

export default AccessDenied
