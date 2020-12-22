import { getSession } from 'next-auth/client'
import { Box, Flex, Heading, Skeleton, Stack, Text } from '@chakra-ui/react'
import { useGames } from '../lib/api-hooks'
import Layout from '../components/Layout'
import { GameRow } from '../components/Games'

const news = [
  {
    title: '✏️ Try the New Edit Feature', 
    description: 'You can now edit your Kalabam games.'
  },
  { 
    title: '✅ Kalabam is Now in Alpha', 
    description: 'Try the Alpha release of Kalabam and leave us Feedback!'
  }
]

function Index () {
  const { isLoading, data } = useGames()

  return (
    <Layout title='My Games | Kalabam' bg='gray.100'>
      <Flex
        my='6'
        mx={{ base: '2', sm: '12', lg: '24' }}
        direction={{ base: 'column-reverse', lg: 'row' }}
        justify='center'
      >
        <Box mt={{ base: '6', lg: '0' }}>
          <Box w={{ lg: '80' }} p='2' rounded='md' bg='white' boxShadow='md'>
            <Heading as='h3' pl='2' py='2' fontSize='xl' bg='pink.100'>What's New</Heading>
            <Stack>
              {news.map(({ title, description }, i) => (
                <Box key={i} mt='2' p='2' border='1px' borderColor='pink.100'>
                  <Text mb='1' fontWeight='bold'>{title}</Text>
                  <Text>{description}</Text>
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
        <Box w='100%' ml={{ lg: '8' }} p='2' rounded='md' bg='white' boxShadow='md'>
          <Heading as='h3' pl='2' py='2' fontSize='xl' bg='teal.100'>My Games</Heading>
          <Stack>
            {isLoading
              ? [1, 2, 3].map((n) => <Skeleton key={n} mt='2' h='128px' />)
              : data.map((game) => <GameRow key={game._id} game={game} />)}
          </Stack>
        </Box>
      </Flex>
    </Layout>
  )
}

export async function getServerSideProps (context) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default Index
