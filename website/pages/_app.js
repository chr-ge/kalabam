import { Provider } from 'next-auth/client'
import { ChakraProvider } from '@chakra-ui/react'
import { PusherProvider } from '@harelpls/use-pusher'
import { GameProvider } from '../context/Game/GameContext'
import FontFace from '../components/FontFace'
import theme from "@kalabam/theme"

const config = {
  clientKey: '179761146c8708fdb1bb',
  cluster: 'mt1'
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
