import React from 'react'
import { Box, Text, Link } from '@chakra-ui/react'

const Footer = () => (
  <Box my='6' align='center'>
    <Text mb='2' fontSize='sm'>
      Create your own game for FREE at{' '}
      <Link href='https://kalabam.com' variant='kalabam'>
        kalabam.com
      </Link>
    </Text>
    <Link href='https://kalabam.com/tos' variant='kalabam' fontSize='sm'>
      Terms
    </Link>{' | '}
    <Link href='https://kalabam.com/privacy' variant='kalabam' fontSize='sm'>
      Privacy
    </Link>
  </Box>
)

export default Footer
