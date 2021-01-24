import { getSession } from 'next-auth/client'
import { getGameById } from '../../models/Game'
import { useRouter } from 'next/router'
import NextImage from 'next/image'
import { Avatar, Box, Flex, Heading, Button, Stack, Text } from '@chakra-ui/react'
import Layout from '../../components/Layout'
import { QuestionRow } from '../../components/Games'
import { formatDateTime } from '../../utils/format'

const Game = ({ game, userId }) => {
  const router = useRouter()

  return (
    <Layout title={`${game.title} | Kalabam`} bg='lightPink'>
      <Flex h='calc(100vh - 3.5rem)' direction={{ base: 'column', sm: 'row' }}>
        <Box w={{ base: '100%', sm: '40%' }}>
          <Box h='72' w='100%' pos='relative'>
            <NextImage
              layout='fill'
              objectFit='cover'
              src={game.image.src || '/images/game.png'}
              alt={game.image.alt}
            />
          </Box>
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
          <Flex mt='2' px='4' py='2' alignItems='center'>
            <Avatar name={game.user.name} src={game.user.image} size='sm' />
            <Box ml='2'>
              <Text>{game.user.name}</Text>
              <Text fontSize='sm'>{formatDateTime(game.created)}</Text>
            </Box>
          </Flex>

        </Box>
        <Stack w='100%' p='4' bg='gray.100' spacing={4}>
          {game.questions.map((q, i) => (
            <QuestionRow key={i} question={q} index={i + 1} />
          ))}
        </Stack>
      </Flex>
    </Layout>
  )
}

export async function getServerSideProps (context) {
  const game = await getGameById(context.query.gameId)
  if (!game) return { notFound: true }
  const session = await getSession(context)

  if (game.visibility === '0' && (!session || (game.createdBy.toString() !== session.user.id))) {
    return { notFound: true }
  } else {
    return {
      props: {
        game: JSON.parse(JSON.stringify(game)),
        userId: session.user.id
      }
    }
  }
}

export default Game