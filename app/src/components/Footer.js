import React from 'react'
import { Box, Text, Link } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'

export const Footer = () => (
  <Box my='6' align='center'>
    <Text mb='2' fontSize='sm'>
      <Trans>Create your own game for FREE at </Trans>
      <Link href='https://kalabam.com' variant='kalabam'>
        kalabam.com
      </Link>
    </Text>
    <Link href='https://kalabam.com/tos' variant='kalabam' fontSize='sm'>
      Terms
    </Link>
    {' | '}
    <Link href='https://kalabam.com/privacy' variant='kalabam' fontSize='sm'>
      Privacy
    </Link>
  </Box>
)
