import {
  Button,
  Flex,
  IconButton,
  Text,
  Tooltip,
  Spacer,
  useToast
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { useGameCreate } from '../../context/Game/GameCreateContext'

const TOAST_ID = 'cannot-delete'

const QuestionBox = ({ question, index }) => {
  const { questions, activeQuestion, setActiveQuestion, deleteQuestion } = useGameCreate()
  const toast = useToast()

  const handleDelete = () => {
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
        isClosable: true
      })
    }
  }

  const handleClick = () => {
    setActiveQuestion(question)
  }

  return (
    <Flex
      direction='column'
      p='2'
      minH='32'
      w={{ base: '48', xl: '52' }}
      bgColor={activeQuestion === question ? 'gray.400' : 'gray.300'}
    >
      <Flex>
        <Text>{index}. quiz</Text>
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
        onClick={handleClick}
        boxShadow='inner'
        display='block'
        overflow='hidden'
        whiteSpace='normal'
      >
        {question.question}
      </Button>
    </Flex>
  )
}

export default QuestionBox
