import Head from 'next/head'
import { Box } from '@chakra-ui/react'
import Header from '../components/Header'

const Layout = ({ title, bg, children }) => {
  return (
    <>
      <Head>
        <title>{title || 'Kalabam'}</title>
        <meta charSet="utf-8" />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Box d='flex' h='100%' flexDirection='column'>
        <Header />
        <Box flex={1} bg={bg}>
          {children}
        </Box>
      </Box>
    </>
  )
}

export default Layout
