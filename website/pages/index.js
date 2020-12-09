import { getSession } from 'next-auth/client'
import { Box, Flex, Heading, Skeleton, Stack, Text } from '@chakra-ui/react'
import { useGames } from '../lib/api-hooks'
import Layout from '../components/Layout'
import { GameRow } from '../components/Games'

function Index () {
  const { isLoading, data } = useGames()

  return (
    <Layout title='My Games | Kalabam' bg='gray.100'>
      <Flex
        my='6'
        mx={{ base: '2', sm: '12', md: '24' }}
        direction={{ base: 'column-reverse', md: 'row' }}
        justify='center'
      >
        <Box mt={{ base: '4', md: '0' }}>
          <Box w={{ md: '80' }} p='2' rounded='md' bg='white' boxShadow='md'>
            <Heading as='h3' pl='2' py='2' fontSize='xl' bg='pink.100'>What's New</Heading>
            <Stack>
              <Box mt='2' p='2' border='1px' borderColor='pink.100'>
                <Text mb='1' fontWeight='bold'>✏️ Try the New Edit Feature</Text>
                <Text>You can now edit your Kalabam games.</Text>
              </Box>
              <Box mt='2' p='2' border='1px' borderColor='pink.100'>
                <Text mb='1' fontWeight='bold'>✅ Kalabam is Now in Alpha</Text>
                <Text>Try the Alpha release of Kalabam and leave us Feedback!</Text>
              </Box>
            </Stack>
          </Box>
        </Box>
        <Box w='100%' ml={{ md: '8' }} p='2' rounded='md' bg='white' boxShadow='md'>
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
