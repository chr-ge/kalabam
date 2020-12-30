import { Flex } from '@chakra-ui/react'
import { Accounts, EarlyAccess, Hero } from '../components/Branding'
import Layout from '../components/Layout'

const Index = () => {
  return (
    <Layout title='Kalabam'>
      <Flex mb='24' direction='column'>
        <Hero />
        <Accounts />
        <EarlyAccess />
      </Flex>
    </Layout>
  )
}

export default Index
