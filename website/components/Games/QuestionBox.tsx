import { FC } from 'react'
import {
  Button,
  Flex,
  IconButton,
  Text,
  Tooltip,
  Spacer,
  useToast,
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { Draggable } from 'react-beautiful-dnd'
import { useGameContext } from '../../contexts/Game/GameContext'
import type { Question } from '../../utils/types'

const TOAST_ID = 'cannot-delete'

interface QuestionBoxProps {
  question: Question
  index: number
}

export const QuestionBox: FC<QuestionBoxProps> = ({ question, index }) => {
  const { questions, activeQuestion, setActiveQuestion, deleteQuestion } =
    useGameContext()
  const toast = useToast()

  const handleDelete = (): void => {
    if (questions.length > 1) {
      deleteQuestion(question.id)
    } else {
      if (toast.isActive(TOAST_ID)) return
      toast({
        id: TOAST_ID,
        title: "Can't delete the only question",
        description:
          'To make the game engaging, we recommend adding at least one question.',
        status: 'info',
        position: 'bottom',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Draggable draggableId={question.id.toString()} index={index}>
      {(provided) => (
        <Flex
          direction='column'
          p='2'
          h='32'
          minH='32'
          minW={{ base: '40', xl: '44' }}
          bgColor={activeQuestion.id === question.id ? 'gray.400' : 'gray.300'}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Flex>
            <Text>{index + 1}. quiz</Text>
            <Spacer />
            <Tooltip
              hasArrow
              label='Delete Question'
              aria-label='Delete Question'
              openDelay={400}
            >
              <IconButton
                size='xs'
                variant='ghost'
                colorScheme='red'
                aria-label='Delete Question'
                icon={<DeleteIcon />}
                onClick={handleDelete}
              />
            </Tooltip>
          </Flex>
          <Button
            flex='1'
            p='1'
            mt='1'
            bgColor='white'
            rounded='md'
            onClick={() => setActiveQuestion(question)}
            boxShadow='inner'
            display='block'
            overflow='hidden'
            whiteSpace='normal'
          >
            {question.question}
          </Button>
        </Flex>
      )}
    </Draggable>
  )
}
