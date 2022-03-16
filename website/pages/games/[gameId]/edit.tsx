import type { GetServerSideProps, NextPage } from 'next'
import { useEffect } from 'react'
import { getSession } from 'next-auth/react'
import { Button, Flex, Stack } from '@chakra-ui/react'
import {
  DragDropContext,
  Droppable,
  type DropResult,
} from 'react-beautiful-dnd'
import {
  Layout,
  GameLoading,
  Question,
  QuestionBox,
} from '../../../components/Games'
import { useGameContext } from '../../../contexts/Game/GameContext'
import { useGameById } from '../../../lib/api-hooks'
import { reorder } from '../../../utils/sort'
import Custom404 from '../../404'

interface EditProps {
  gameId: string
}

const Edit: NextPage<EditProps> = ({ gameId }) => {
  const { setGame, questions, activeQuestion, addQuestion, reorderQuestions } =
    useGameContext()
  const { isLoading, data, error } = useGameById(gameId)

  useEffect(() => {
    if (!isLoading && !error) setGame(data)
  }, [isLoading])

  if (error === 404) return <Custom404 />

  const onDragEnd = (result: DropResult): void => {
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
    <Layout title='Edit Game | Kalabam' mode='edit'>
      {isLoading ? (
        <GameLoading />
      ) : (
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
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    w={{ base: '100%', md: '48', xl: '52' }}
                    direction={{ base: 'row', md: 'column' }}
                    align='stretch'
                    overflowY='auto'
                    maxH='calc(100vh - 8rem)'
                  >
                    {questions.map((question, i) => (
                      <QuestionBox
                        key={question.id}
                        index={i}
                        question={question}
                      />
                    ))}
                    {provided.placeholder}
                  </Stack>
                )}
              </Droppable>
            </DragDropContext>
            <Button
              aria-label='Add Question'
              m='2'
              boxShadow='md'
              colorScheme='teal'
              onClick={addQuestion}
            >
              Add Question
            </Button>
          </Flex>
          <Question question={activeQuestion} />
        </Flex>
      )}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<EditProps> = async (
  context
) => {
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
    props: {
      gameId: context.query.gameId as string,
    },
  }
}

export default Edit
