import type { NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { Button, Flex, Stack } from '@chakra-ui/react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { Layout, Question, QuestionBox } from '../../components/Games'
import { useGameContext } from '../../contexts/Game/GameContext'
import { reorder } from '../../utils/sort'

const Create: NextPage = () => {
  const { questions, activeQuestion, addQuestion, reorderQuestions } =
    useGameContext()

  const onDragEnd = (result): void => {
    if (!result.destination) return
    if (result.destination.index === result.source.index) return

    const reorderedQuestions = reorder(
      questions,
      result.source.index,
      result.destination.index
    )

    reorderQuestions(reorderedQuestions)
  }

  return (
    <Layout title='Create Game | Kalabam' mode='create'>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        bgColor='lightPink'
        h='100%'
      >
        <Flex direction='column' h='100%' bgColor='gray.100'>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='questions'>
              {(provided) => (
                <Stack
                  w={{ base: '100%', md: '48', xl: '52' }}
                  direction={{ base: 'row', md: 'column' }}
                  align='stretch'
                  overflowY='auto'
                  maxH='calc(100vh - 8rem)'
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {questions.map((q, i) => (
                    <QuestionBox key={q.id} index={i} question={q} />
                  ))}
                  {provided.placeholder}
                </Stack>
              )}
            </Droppable>
          </DragDropContext>
          <Button
            m='2'
            boxShadow='md'
            aria-label='Add Question'
            size='lg'
            colorScheme='teal'
            onClick={addQuestion}
          >
            Add Question
          </Button>
        </Flex>
        <Question question={activeQuestion} />
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

export default Create
