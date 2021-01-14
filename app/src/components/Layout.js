import React from 'react'
import { Center, Flex } from '@chakra-ui/react'
import ColorModeSwitcher from './ColorModeSwitcher'
import LangSwitcher from './LangSwitcher'
import Footer from './Footer'

const Layout = ({ children }) => (
  <Flex h='100vh' direction='column' align='center'>
    <Flex alignSelf='flex-end' m='4'>
      <LangSwitcher />
      <ColorModeSwitcher />
    </Flex>
    <Center flex={1}>{children}</Center>
    <Footer />
  </Flex>
)

export default Layout
