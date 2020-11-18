import { Provider } from 'next-auth/client'
import { ChakraProvider } from '@chakra-ui/react'
import { GameCreateProvider } from '../context/GameCreate'
import FontFace from '../components/font-face'
import theme from '../theme'

const App = ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>
      <GameCreateProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
        <FontFace />
      </GameCreateProvider>
    </Provider>
  )
}

export default App
