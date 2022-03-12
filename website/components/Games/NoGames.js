import { Button, Icon, VStack, Text } from '@chakra-ui/react'
import { BiAnalyse } from 'react-icons/bi'
import { Link } from '../Link'

export const NoGames = () => (
  <VStack mt='2' py='8' border='1px' borderColor='blue.100'>
    <Icon as={BiAnalyse} boxSize='10' />
    <Text fontSize='xl'>You have no games yet.</Text>
    <Text fontSize='md' mb='6' color='gray.600'>
      Create a Game to Start Playing.
    </Text>
    <Button
      as={Link}
      px='6'
      aria-label='Create a Game'
      colorScheme='pink'
      textDecoration='none !important'
      href='/games/create'
    >
      Create a Game
    </Button>
  </VStack>
)
