import { FC } from 'react'
import { Box, Text, Link } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'

export const Footer: FC = () => (
  <Box my='6' textAlign='center'>
    <Text mb='2' fontSize='sm'>
      <Trans>Create your own game for FREE at </Trans>
      <Link href='https://www.kalabam.com' variant='kalabam'>
        kalabam.com
      </Link>
    </Text>
    <Link href='https://www.kalabam.com/tos' variant='kalabam' fontSize='sm'>
      Terms
    </Link>
    {' | '}
    <Link
      href='https://www.kalabam.com/privacy'
      variant='kalabam'
      fontSize='sm'
    >
      Privacy
    </Link>
  </Box>
)
