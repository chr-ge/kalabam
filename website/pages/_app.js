import { useEffect } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Provider } from 'next-auth/client'
import { ChakraProvider } from '@chakra-ui/react'
import { PusherProvider } from '@harelpls/use-pusher'
import splitbee from '@splitbee/web'
import { GameProvider } from '../contexts/Game/GameContext'
import { LobbyProvider } from '../contexts/Lobby/LobbyContext'
import Fonts from '../components/Fonts'
import theme from '@kalabam/theme'

const CrispWithNoSSR = dynamic(() => import('../components/Crisp'), {
  ssr: false,
})

// Pusher Config
const config = {
  clientKey: process.env.NEXT_PUBLIC_PUSHER_CLIENT_KEY,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  authEndpoint: '/api/pusher/auth',
}

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    splitbee.init({
      scriptUrl: '/bee.js',
      apiUrl: '/_hive',
    })
  }, [])

  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='icon' type='image/png' href='/favicon.png' />
        <meta name='theme-color' content='#2A4365' />
      </Head>
      <Provider session={pageProps.session}>
        <ChakraProvider theme={theme}>
          <Fonts />
          <CrispWithNoSSR />
          <PusherProvider {...config}>
            <GameProvider>
              <LobbyProvider>
                <Component {...pageProps} />
              </LobbyProvider>
            </GameProvider>
          </PusherProvider>
        </ChakraProvider>
      </Provider>
    </>
  )
}

export default App
