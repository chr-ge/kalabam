import { SimpleGrid } from '@chakra-ui/react'
import { EarlyAccess, Hero } from '../components/Branding'
import Layout from '../components/Layout'

const Index = () => {
  return (
    <Layout title='Kalabam'>
      <SimpleGrid spacing={10} mb='10'>
        <Hero />
        <EarlyAccess />
      </SimpleGrid>
    </Layout>
  )
}

export default Index
