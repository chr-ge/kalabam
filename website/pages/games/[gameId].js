import { getSession } from 'next-auth/client'
import { getGameById } from '../../models/Game'
import { useRouter } from 'next/router'
import NextImage from 'next/image'
import { Avatar, Box, Flex, Heading, Button, Stack, Tag, Text } from '@chakra-ui/react'
import Layout from '../../components/Layout'
import { formatDateTime } from '../../utils/format'

const Game = ({ game, userId }) => {
  const router = useRouter()

  return (
    <Layout title={`${game.title} | Kalabam`} bg='lightPink'>
      <Flex h='calc(100vh - 3.5rem)' direction={{ base: 'column', sm: 'row' }}>
        <Box w='40%'>
          <NextImage height={300} width={300} src={game.image || '/images/game.png'} />
          <Heading my='4' p='4' fontSize='3xl'>{game.title}</Heading>
          <Flex p='4'>
            <Button
              aria-label='Play Game'
              colorScheme='green'
              onClick={() => router.push(`/play/lobby/${game._id}`)}
            >
              Play
            </Button>
            {userId === game.createdBy && (
              <Button
                ml='2'
                aria-label='Edit Game'
                colorScheme='purple'
                onClick={() => router.push(`/games/${game._id}/edit`)}
              >
                Edit
              </Button>
            )}
          </Flex>
          <Text p='4' color='gray.600'>{game.description}</Text>
          <Box d='inline-flex' mt='2' px='4' py='2' alignItems='center'>
            <Avatar name={game.user.name} src={game.user.image} size='sm' />
            <Text ml='2'>{game.user.name}</Text>
          </Box>
          <Text p='4'>{formatDateTime(game.created)}</Text>
        </Box>
        <Stack w='100%' p='4' bg='gray.100' spacing={4}>
          {game.questions.map((q, i) => (
            <Flex key={q.id} bg='white' rounded='md' boxShadow='md' _hover={{ boxShadow: 'lg' }}>
              <Flex flex={1} p='4' direction='column'>
                <Flex mb='2' align='center'>
                  <Text mr='2'>{`${i + 1}. Quiz`}</Text>
                  <Tag colorScheme='pink' size='sm'>{q.timeLimit + 's'}</Tag>
                </Flex>
                <Text fontSize='xl'>{q.question}</Text>
              </Flex>
              <Box w='25%' pos='relative'>
                {q.image && (
                  <NextImage
                    src={q.image}
                    layout='fill'
                    objectFit='cover'
                    objectPosition='right center'
                    alt={q.question}
                  />
                )}
              </Box>
            </Flex>
          ))}
        </Stack>
      </Flex>
    </Layout>
  )
}

export async function getServerSideProps (context) {
  const game = await getGameById(context.query.gameId)
  if (!game) return { notFound: true }
  const gameData = JSON.parse(JSON.stringify(game))
  const session = await getSession(context)

  if (game.visibility === '0' && (!session || (game.createdBy.toString() !== session.user.id))) {
    return { notFound: true }
  } else {
    return { props: { game: gameData, userId: session.user.id } }
  }
}

export default Game
