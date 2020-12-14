import { Provider } from 'next-auth/client'
import { ChakraProvider } from '@chakra-ui/react'
import { PusherProvider } from '@harelpls/use-pusher'
import { GameProvider } from '../context/Game/GameContext'
import FontFace from '../components/FontFace'
import theme from '@kalabam/theme'

// Pusher Config
const config = {
  clientKey: process.env.PUSHER_CLIENT_KEY,
  cluster: process.env.PUSHER_CLUSTER,
  authEndpoint: process.env.PUSHER_AUTH_ENDPOINT
}

const App = ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <PusherProvider {...config}>
          <GameProvider>
            <Component {...pageProps} />
          </GameProvider>
        </PusherProvider>
      </ChakraProvider>
      <FontFace />
    </Provider>
  )
}

export default App
