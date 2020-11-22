import { getSession } from 'next-auth/client'
import { Box, Button, Flex, Stack } from '@chakra-ui/react'
import GameHeader from '../../components/Games/GameHeader'
import Question from '../../components/Games/Question'
import QuestionBox from '../../components/Games/QuestionBox'
import { useGameCreate } from '../../context/Game/GameCreateContext'

function Create () {
  const { questions, activeQuestion, addQuestion } = useGameCreate()

  return (
    <Flex direction='column' h='100%'>
      <GameHeader />
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
