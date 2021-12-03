import Head from 'next/head'
import { Box, Flex } from '@chakra-ui/react'
import GameHeader from './GameHeader'

const Layout = ({ title, mode, children }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <Flex direction='column' h='100%'>
      <GameHeader mode={mode} />
      <Box flex={1}>{children}</Box>
    </Flex>
  </>
)

export default Layout
