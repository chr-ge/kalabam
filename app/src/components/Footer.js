import React from 'react'
import { Text, Link } from '@chakra-ui/react'

const Footer = () => (
  <Text my='10' fontSize='sm'>
    Create your own game for FREE at{' '}
    <Link href='https://kalabam.com' color='blue.800'>
      kalabam.com
    </Link>
  </Text>
)

export default Footer
