import { FC } from 'react'
import Head from 'next/head'
import { Box, type BoxProps } from '@chakra-ui/react'
import { Header } from './Header'
import { Footer } from './Branding'

interface LayoutProps extends BoxProps {
  title?: string
  children: React.ReactNode
}

export const Layout: FC<LayoutProps> = ({ title, children, ...props }) => {
  return (
    <>
      <Head>
        <title>{title || 'Kalabam'}</title>
      </Head>
      <Box h='100%'>
        <Box d='flex' minH='100%' flexDirection='column'>
          <Header />
          <Box flex='1' {...props}>
            {children}
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  )
}
