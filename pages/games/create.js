import { useState } from 'react'
import { getSession } from 'next-auth/client'
import { Box, Button, Flex, Spacer, VStack } from '@chakra-ui/react'
import GameHeader from '../../components/Games/GameHeader'
import Question from '../../components/Games/Question'
import QuestionBox from '../../components/Games/QuestionBox'
import { useGameCreate } from '../../context/Game/GameCreateContext'

function Create () {
  const { questions, addQuestion } = useGameCreate()
  const [activeQuestion, setActiveQuestion] = useState(questions[0])

  const handleCreate = () => {
    addQuestion()
  }

  return (
    <Flex direction='column' height='100%'>
      <GameHeader />
      <Box flex={1}>
        <Flex direction={{ base: 'column', md: 'row' }} bgColor='lightPink' height='100%'>
          <Flex direction='column' height='100%' bgColor='gray.100'>
            <VStack
              w='48'
              align='stretch'
              overflowY='auto'
              maxH='calc(100vh - 7.3rem)'
            >
              {questions.map((q, i) => (
                <QuestionBox
                  key={q.id}
                  index={i + 1}
                  question={q}
                  onClick={() => setActiveQuestion(q)}
                />
              ))}
              <Spacer />
            </VStack>
            <Button
              m='2'
              boxShadow='md'
              aria-label='Add Question'
              size='lg'
              colorScheme='yellow'
              onClick={handleCreate}
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
