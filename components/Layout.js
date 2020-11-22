import Head from 'next/head'
import Header from '../components/Header'

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || 'Kalabam'}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Header />
      {children}
    </>
  )
}

export default Layout
