import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { SessionProvider } from 'next-auth/react'
import { ChakraProvider } from '@chakra-ui/react'
import { PusherProvider, type PusherProviderProps } from '@harelpls/use-pusher'
import splitbee from '@splitbee/web'
import theme from '@kalabam/theme'
import { GameProvider } from '../contexts/Game/GameContext'
import { LobbyProvider } from '../contexts/Lobby/LobbyContext'
import { Fonts } from '../components/Fonts'
import { config } from '../config'

const CrispChat = dynamic(() => import('../components/Crisp'), {
  ssr: false,
})

// Pusher Config
const pusherConfig: PusherProviderProps = {
  clientKey: config.pusher.clientKey,
  cluster: config.pusher.cluster,
  authEndpoint: '/api/pusher/auth',
}

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
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
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          <Fonts />
          <CrispChat />
          <PusherProvider {...pusherConfig}>
            <GameProvider>
              <LobbyProvider>
                <Component {...pageProps} />
              </LobbyProvider>
            </GameProvider>
          </PusherProvider>
        </ChakraProvider>
      </SessionProvider>
    </>
  )
}

export default App
