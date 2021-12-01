import Head from 'next/head'
import { Box } from '@chakra-ui/react'
import Header from './Header'
import { Footer } from './Branding'

const Layout = ({ title, bg, children }) => {
  return (
    <>
      <Head>
        <title>{title || 'Kalabam'}</title>
      </Head>
      <Box h='100%'>
        <Box d='flex' minH='100%' flexDirection='column'>
          <Header />
          <Box flex={1} bg={bg}>
            {children}
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  )
}

export default Layout
