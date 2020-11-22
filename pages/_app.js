import { Provider } from 'next-auth/client'
import { ChakraProvider } from '@chakra-ui/react'
import { GameCreateProvider } from '../context/Game/GameCreateContext'
import FontFace from '../components/FontFace'
import theme from '../theme'

const App = ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <GameCreateProvider>
          <Component {...pageProps} />
        </GameCreateProvider>
      </ChakraProvider>
      <FontFace />
    </Provider>
  )
}

export default App
