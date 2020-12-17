import { useState } from 'react'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { Box, Center, Heading, Spinner } from '@chakra-ui/react'
import { useGameById } from '../../../../lib/api-hooks'
import { useCounter } from '../../../..//lib/hooks'
import QuestionBlock from '../../../../components/Lobby/QuestionBlock'

const Question = () => {
  const router = useRouter()
  const [session, loading] = useSession()
  const { isLoading, data } = useGameById(router.query.gameId)
  const [counter] = useCounter(10)
  const [questionIndex, setQuestionIndex] = useState(0)

  if (!loading && !session) router.push('/auth/signin')

  if ((typeof window !== 'undefined' && loading) || isLoading) {
    return (
      <Center h='100vh' bg='green.100'>
        <Box><Spinner label='Loading' size='xl' color='pink.500' thickness='4px' /></Box>
      </Center>
    )
  }

  return (
    counter > 0
      ? (
        <Center h='100vh' bg='green.100'>
          <Box align='center'>
            <Heading fontSize='6xl'>The Game is Starting</Heading>
            <Heading fontSize='8xl'>{counter}</Heading>
          </Box>
        </Center>
        )
      : (
        <QuestionBlock
          question={data.questions[questionIndex]}
          questionIndex={questionIndex}
          setQuestionIndex={setQuestionIndex}
        />
        )
  )
}

export default Question
