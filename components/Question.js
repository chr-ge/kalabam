import { Box, Flex, IconButton, Text, Spacer } from '@chakra-ui/core'
import { DeleteIcon } from '@chakra-ui/icons'

const GameHeader = () => {
  return (
    <Box p='2' height='32' bgColor='gray.300'>
      <Flex>
        <Text>1. Quiz</Text>
        <Spacer />
        <IconButton
          size='xs'
          variant='ghost'
          colorScheme='red'
          aria-label='Delete Question'
          icon={<DeleteIcon />}
        />
      </Flex>
    </Box>
  )
}

export default GameHeader
