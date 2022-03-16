import { FC } from 'react'
import {
  Button,
  Flex,
  IconButton,
  Text,
  Tooltip,
  Spacer,
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { Draggable } from 'react-beautiful-dnd'
import { useGameContext } from '../../contexts/Game/GameContext'
import type { Question } from '../../utils/types'

interface QuestionBoxProps {
  index: number
  question: Question
}

export const QuestionBox: FC<QuestionBoxProps> = ({ question, index }) => {
  const { questions, activeQuestion, setActiveQuestion, deleteQuestion } =
    useGameContext()

  return (
    <Draggable draggableId={`question-${question.id}`} index={index}>
      {(provided) => (
        <Flex
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          direction='column'
          bgColor={activeQuestion.id === question.id ? 'gray.400' : 'gray.300'}
          minW={{ base: '40', xl: '44' }}
          h='32'
          minH='32'
          p='2'
        >
          <Flex>
            <Text>{index + 1}. quiz</Text>
            <Spacer />
            <Tooltip
              label='Delete Question'
              aria-label='Delete Question'
              openDelay={400}
              hasArrow
            >
              <IconButton
                size='xs'
                variant='ghost'
                colorScheme='red'
                aria-label='Delete Question'
                icon={<DeleteIcon />}
                onClick={() => deleteQuestion(question.id)}
                isDisabled={questions.length === 1}
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
