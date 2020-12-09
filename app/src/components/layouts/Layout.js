import React from 'react'
import { Center, Flex } from '@chakra-ui/react'
import ColorModeSwitcher from '../ColorModeSwitcher'
import Footer from '../Footer'

const Layout = ({ children }) => {
  return (
    <Flex h='100vh' direction='column' align='center'>
      <ColorModeSwitcher alignSelf='flex-end' m='4' />
      <Center flex={1}>{children}</Center>
      <Footer />
    </Flex>
  )
}

export default Layout
