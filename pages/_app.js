import { Provider } from 'next-auth/client'
import { ChakraProvider } from '@chakra-ui/react'
import { GameCreateProvider } from '../context/GameCreate'
import theme from '../theme'

const App = ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>
      <GameCreateProvider>
        <ChakraProvider CSSReset theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </GameCreateProvider>
    </Provider>
  )
}

export default App
