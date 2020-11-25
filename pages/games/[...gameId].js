import { useEffect } from 'react'
import { getSession } from 'next-auth/client'
import { Box, Button, Flex, Stack } from '@chakra-ui/react'
import GameHeader from '../../components/Games/GameHeader'
import Question from '../../components/Games/Question'
import QuestionBox from '../../components/Games/QuestionBox'
import GameLoading from '../../components/GameLoading'
import { useGameContext } from '../../context/Game/GameContext'
import { useGameById } from '../../lib/api-hooks'

function Edit ({ gameId }) {
  const { setGame, questions, activeQuestion, addQuestion } = useGameContext()
  const { isLoading, data } = useGameById(gameId)

  useEffect(() => {
    if (!isLoading) setGame(data)
  }, [gameId, isLoading])

  return (
    <Flex direction='column' h='100%'>
      <GameHeader mode='edit' />
      <Box flex={1}>
        {isLoading
          ? <GameLoading />
          : (
            <Flex
              direction={{ base: 'column', md: 'row' }}
              bgColor='lightPink'
              h='100%'
            >
              <Flex direction='column' h='100%' bgColor='gray.100'>
                <Stack
                  w={{ base: '100%', md: '48', xl: '52' }}
                  direction={{ base: 'row', md: 'column' }}
                  align='stretch'
                  overflowY='auto'
                  maxH='calc(100vh - 7.3rem)'
                >
                  {questions.map((q, i) => (
                    <QuestionBox key={q.id} index={i + 1} question={q} />
                  ))}
                </Stack>
                <Button
                  m='2'
                  boxShadow='md'
                  aria-label='Add Question'
                  size='lg'
                  colorScheme='yellow'
                  onClick={addQuestion}
                >
                  Add Question
                </Button>
              </Flex>
              <Question question={activeQuestion} />
            </Flex>
            )}
      </Box>
    </Flex>
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
    props: {
      gameId: context.query.gameId[0]
    }
  }
}

export default Edit
