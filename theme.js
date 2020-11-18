import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    body: "'Cera Pro', sans-serif",
    heading: "'Cera Pro Black', sans-serif"
  },
  styles: {
    global: {
      'html, body, #__next': { height: '100%' }
    }
  },
  colors: {
    black: {
      500: '#000000',
      600: '#222222'
    },
    googleBlue: {
      500: '#4285F4',
      600: '#427AF4'
    }
  }
})

export default theme
