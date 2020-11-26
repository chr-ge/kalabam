import Image from 'next/image'
import { Flex, Text, useColorModeValue } from '@chakra-ui/react'
import Layout from '../components/Layout'

export default function Custom404 () {
  return (
    <Layout title='404 - Kalabam'>
      <Flex align='center' justify='center' direction='column'>
        <Image src='/images/404.svg' width={500} height={400} />
        <Text fontSize='xl' color={useColorModeValue('blue.800', 'gray.300')}>
          This page could not be found.
        </Text>
      </Flex>
    </Layout>
  )
}
