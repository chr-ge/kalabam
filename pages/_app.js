import { Provider } from 'next-auth/client'
import { ChakraProvider } from '@chakra-ui/react'
import { GameProvider } from '../context/Game/GameContext'
import FontFace from '../components/FontFace'
import theme from '../theme'

const App = ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <GameProvider>
          <Component {...pageProps} />
        </GameProvider>
      </ChakraProvider>
      <FontFace />
    </Provider>
  )
}

export default App
