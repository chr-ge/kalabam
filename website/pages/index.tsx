import type { NextPage } from 'next'
import { Flex, AspectRatio } from '@chakra-ui/react'
import { Accounts, EarlyAccess, Hero, HowItWorks } from '../components/Branding'
import { Layout } from '../components/Layout'

const Index: NextPage = () => {
  return (
    <Layout title='Kalabam • Make Your Presentations Fun'>
      <Flex mb='24' direction='column'>
        <Hero />
        <Accounts />
        <HowItWorks />
        <AspectRatio
          mt='24'
          w='100%'
          ratio={{ base: 1.5, md: 2, lg: 6, xl: 8 }}
        >
          <iframe
            title='Kalabam shapes'
            src='https://my.spline.design/untitled-f690fd5cd94766dfb1ce8e3db5c9d91d/'
            frameBorder='0'
          />
        </AspectRatio>
        <EarlyAccess />
      </Flex>
    </Layout>
  )
}

export default Index
