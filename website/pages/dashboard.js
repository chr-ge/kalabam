import { getSession } from 'next-auth/client'
import { Box, Flex, Heading, Skeleton, Stack, Text } from '@chakra-ui/react'
import { useGames, useReports } from '../lib/api-hooks'
import { Layout } from '../components/Layout'
import { GameRow, NoGames } from '../components/Games'
import { ReportRow } from '../components/Reports'
import { Link } from '../components/Link'

const news = [
  {
    title: '✏️ Try the New Edit Feature',
    description: 'You can now edit your Kalabam games.',
  },
  {
    title: '✅ Kalabam is Now in Alpha',
    description: 'Try the Alpha release of Kalabam and leave us Feedback!',
  },
]

const Dashboard = () => {
  const { isLoading: isLoadingGames, data: gamesData } = useGames()
  const { isLoading: isLoadingReports, data: reportsData } = useReports()

  return (
    <Layout title='My Games | Kalabam' bg='gray.100'>
      <Flex
        maxW='6xl'
        my='8'
        mx={{ base: '2', sm: '8', lg: '16', xl: 'auto' }}
        direction={{ base: 'column-reverse', lg: 'row' }}
        justify='center'
      >
        <Box mt={{ base: '8', lg: '0' }}>
          <Box w={{ lg: '80' }} p='2' rounded='md' bg='white' boxShadow='md'>
            <Heading
              as='h3'
              pl='2'
              py='2'
              fontSize='xl'
              bg='pink.100'
              color='pink.800'
            >
              What's New
            </Heading>
            <Stack>
              {news.map(({ title, description }, i) => (
                <Box key={i} mt='2' p='2' border='1px' borderColor='pink.100'>
                  <Text mb='1' fontWeight='bold'>
                    {title}
                  </Text>
                  <Text>{description}</Text>
                </Box>
              ))}
            </Stack>
          </Box>
          <Box
            w={{ lg: '80' }}
            mt='8'
            p='2'
            rounded='md'
            bg='white'
            boxShadow='md'
          >
            <Heading
              as='h3'
              pl='2'
              py='2'
              fontSize='xl'
              bg='purple.100'
              color='purple.800'
            >
              Latest Reports
            </Heading>
            <Stack>
              {isLoadingReports ? (
                [1, 2].map((n) => <Skeleton key={n} mt='2' h='70px' />)
              ) : reportsData[0].reports.length ? (
                <>
                  {reportsData[0].reports.map((r) => (
                    <ReportRow key={r._id} report={r} />
                  ))}
                  <Link
                    href='/reports'
                    color='gray.600'
                    textAlign='center'
                    _focus={{ boxShadow: '0 0 0 3px rgba(159, 122, 234, 0.6)' }}
                  >
                    See all ({reportsData[0].count[0].count})
                  </Link>
                </>
              ) : (
                <Box
                  w='100%'
                  mt='2'
                  p='2'
                  border='1px'
                  borderColor='purple.100'
                >
                  <Text align='center'>You have no reports yet.</Text>
                </Box>
              )}
            </Stack>
          </Box>
        </Box>
        <Box
          w='100%'
          h='100%'
          ml={{ lg: '8' }}
          p='2'
          rounded='md'
          bg='white'
          boxShadow='md'
        >
          <Heading
            as='h3'
            pl='2'
            py='2'
            fontSize='xl'
            bg='teal.100'
            color='teal.800'
          >
            My Games
          </Heading>
          <Stack>
            {isLoadingGames ? (
              [1, 2, 3, 4].map((n) => <Skeleton key={n} mt='2' h='128px' />)
            ) : gamesData.length ? (
              gamesData.map((game) => <GameRow key={game._id} game={game} />)
            ) : (
              <NoGames />
            )}
          </Stack>
        </Box>
      </Flex>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default Dashboard
