import { Box, Flex, IconButton, Text, Tooltip, Spacer } from '@chakra-ui/core'
import { DeleteIcon } from '@chakra-ui/icons'

const QuestionBox = ({ index }) => {
  return (
    <Box p='2' height='32' bgColor='gray.300'>
      <Flex>
        <Text>{index}. Quiz</Text>
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
          />
        </Tooltip>
      </Flex>
    </Box>
  )
}

export default QuestionBox
