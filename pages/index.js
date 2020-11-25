import { getSession } from 'next-auth/client'
import { Box, Flex, Heading, Skeleton, Stack } from '@chakra-ui/react'
import { useGames } from '../lib/api-hooks'
import Layout from '../components/Layout'
import GameRow from '../components/Games/GameRow'

function Index () {
  const { isLoading, data } = useGames()

  return (
    <Box bg='gray.100' h='100%'>
      <Layout title='My Games'>
        <Flex
          my='6'
          mx={{ base: '2', sm: '12', md: '24' }}
          direction={{ base: 'column-reverse', md: 'row' }}
          justify='center'
        >
          <Box w={{ md: '96' }} mt={{ base: '4', md: '0' }} h='48' p='2' rounded='md' bg='white' boxShadow='md'>
            <Heading as='h3' pl='2' fontSize='xl' bg='pink.100'>What's New</Heading>
            <Stack>
              <Box>News 1</Box>
              <Box>News 2</Box>
            </Stack>
          </Box>
          <Box w='100%' ml={{ md: '8' }} p='2' rounded='md' bg='white' boxShadow='md'>
            <Heading as='h3' pl='2' fontSize='xl' bg='teal.100'>My Games</Heading>
            <Stack>
              {isLoading
                ? [1, 2, 3].map((n) => <Skeleton key={n} mt='2' h='128px' />)
                : data.map((game) => <GameRow key={game._id} game={game} />)}
            </Stack>
          </Box>
        </Flex>
      </Layout>
    </Box>
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
