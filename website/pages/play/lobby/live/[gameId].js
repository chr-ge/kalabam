import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box, Center, Heading, Spinner } from '@chakra-ui/react'
import { useGameById } from '../../../../lib/api-hooks'
import { useCountDown } from '../../../../lib/hooks'
import { useLobbyContext } from '../../../../contexts/Lobby/LobbyContext'
import { QuestionBlock } from '../../../../components/Lobby'

const Question = () => {
  const router = useRouter()
  const [session, loading] = useSession()
  const { data } = useGameById(router.query.gameId)
  const { questionIndex } = useLobbyContext()
  const [count] = useCountDown(10)

  if (!loading && !session) router.push('/auth/signin')

  if (typeof window !== 'undefined' && loading) {
    return (
      <Center h='100vh' bg='green.100'>
        <Box align='center'>
          <Heading>Get Ready!</Heading>
          <Spinner
            label='Loading'
            mt='5'
            size='xl'
            color='pink.500'
            thickness='6px'
          />
        </Box>
      </Center>
    )
  }

  return (
    <>
      <Head>
        <title>Live Game | Kalabam</title>
      </Head>
      {count > 0 || !data ? (
        <Center h='100vh' bg='green.100'>
          <Box align='center'>
            <Heading fontSize='6xl'>The Game is Starting</Heading>
            <Heading fontSize='8xl'>{count}</Heading>
          </Box>
        </Center>
      ) : (
        <QuestionBlock
          question={data.questions[questionIndex]}
          questionCount={data.questions.length}
          started={new Date()}
        />
      )}
    </>
  )
}

export default Question
