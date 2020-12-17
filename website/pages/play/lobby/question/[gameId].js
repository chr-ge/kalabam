import { useState } from 'react'
import { useSession } from 'next-auth/client'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box, Center, Heading, Spinner } from '@chakra-ui/react'
import { useGameById } from '../../../../lib/api-hooks'
import { QuestionBlock } from '../../../../components/Lobby'
import { useCounter } from '../../../../lib/hooks'

const Question = () => {
  const router = useRouter()
  const [session, loading] = useSession()
  const { data } = useGameById(router.query.gameId)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [counter] = useCounter(10)

  if (!loading && !session) router.push('/auth/signin')

  if (typeof window !== 'undefined' && loading) {
    return (
      <Center h='100vh' bg='green.100'>
        <Box align='center'>
          <Heading>Get Ready!</Heading>
          <Spinner label='Loading' mt='5' size='xl' color='pink.500' thickness='4px' />
        </Box>
      </Center>
    )
  }

  return (
    <>
      <Head>
        <title>Live Game | Kalabam</title>
      </Head>
      {counter > 0
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
          )}
    </>
  )
}

export default Question
