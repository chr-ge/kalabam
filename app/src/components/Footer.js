import React from 'react'
import { Text, Link, useColorModeValue } from '@chakra-ui/react'

const Footer = () => (
  <Text my='10' fontSize='sm'>
    Create your own game for FREE at{' '}
    <Link href='https://kalabam.com' color={useColorModeValue('blue.700', 'blue.200')}>
      kalabam.com
    </Link>
  </Text>
)

export default Footer
