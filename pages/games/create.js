import { getSession } from 'next-auth/client'
import { Box, Button, Flex, Stack } from '@chakra-ui/react'
import { GameHeader, Question, QuestionBox } from '../../components/Games'
import { useGameContext } from '../../context/Game/GameContext'

function Create () {
  const { questions, activeQuestion, addQuestion } = useGameContext()

  return (
    <Flex direction='column' h='100%'>
      <GameHeader mode='create' />
      <Box flex={1}>
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
                <QuestionBox
                  key={q.id}
                  index={i + 1}
                  question={q}
                />
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
    props: {}
  }
}

export default Create
