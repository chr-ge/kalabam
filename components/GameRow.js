import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'

const GameRow = ({ game }) => {
  return (
    <Flex my='2' border='1px' borderColor='blue.100'>
      <Image
        w={{ base: '24', md: '48' }}
        src='https://create.kahoot.it/shared/theme/kahoot/img/placeholder-cover-kahoot.png'
      />
      <Box flex={1}>
        <Text fontSize='lg'>{game.title}</Text>
        <Text>{game.description}</Text>
      </Box>
      <Flex direction='column' justify='flex-end'>
        <Button colorScheme='green' mb='2'>Play</Button>
        <Button colorScheme='blue'>Edit</Button>
      </Flex>
    </Flex>
  )
}

export default GameRow
