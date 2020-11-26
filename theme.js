import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const theme = extendTheme({
  fonts: {
    body: "'Cera Pro', sans-serif",
    heading: "'Cera Pro Black', sans-serif"
  },
  styles: {
    global: (props) => ({
      'html, body, #__next': { height: '100%' },
      body: { bg: mode('gray.100', 'gray.700')(props) }
    })
  },
  colors: {
    black: {
      500: '#000000',
      600: '#222222'
    },
    lightPink: '#fdf9ff',
    googleBlue: {
      500: '#4285F4',
      600: '#427AF4'
    }
  }
})

export default theme
