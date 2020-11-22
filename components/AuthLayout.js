import Head from 'next/head'
import { Container } from '@chakra-ui/react'
import Header from './Header'

const AuthLayout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || 'Kalabam'}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Header />
      <Container my='4'>{children}</Container>
    </>
  )
}

export default AuthLayout
