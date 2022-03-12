import Image from 'next/image'
import { Flex, Text } from '@chakra-ui/react'
import { Layout } from '../components/Layout'

const Custom404 = () => {
  return (
    <Layout title='404 - Kalabam'>
      <Flex mt='16' align='center' direction='column'>
        <Image
          src='/images/404.svg'
          alt='man holding a magnifying Glass'
          width={500}
          height={400}
        />
        <Text fontSize='2xl' color='blue.800'>
          This page could not be found.
        </Text>
      </Flex>
    </Layout>
  )
}

export default Custom404
