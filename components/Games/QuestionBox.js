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

const QuestionBox = ({ question, index, onClick }) => {
  const toast = useToast()
  const TOAST_ID = 'cannot-delete'

  const { questions, deleteQuestion } = useGameCreate()

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
        position: 'bottom-right',
        duration: 3000,
        isClosable: true
      })
    }
  }

  return (
    <Flex direction='column' p='2' minH='32' bgColor='gray.300'>
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
        onClick={onClick}
        boxShadow='inner'
        display='block'
        overflow='hidden'
        whiteSpace='normal'
      >
        {question.title}
      </Button>
    </Flex>
  )
}

export default QuestionBox
