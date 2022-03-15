import { FC, ReactNode } from 'react'
import Head from 'next/head'
import { Box, Flex } from '@chakra-ui/react'
import { GameHeader } from './GameHeader'

interface LayoutProps {
  title: string
  mode: string
  children: ReactNode
}

export const Layout: FC<LayoutProps> = ({ title, mode, children }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <Flex direction='column' h='100%'>
      <GameHeader mode={mode} />
      <Box flex='1'>{children}</Box>
    </Flex>
  </>
)
