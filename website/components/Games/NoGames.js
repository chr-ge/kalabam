import NextLink from 'next/link'
import { Button, Icon, VStack, Text } from '@chakra-ui/react'
import { GrDocumentMissing } from 'react-icons/gr'

export const NoGames = () => (
  <VStack mt='2' py='8' border='1px' borderColor='blue.100' spacing='6'>
    <VStack>
      <Icon as={GrDocumentMissing} boxSize='10' />
      <Text fontSize='xl'>You have no games yet.</Text>
      <Text fontSize='md' mb='6' color='gray.600'>
        Create a Game to Start Playing.
      </Text>
    </VStack>
    <NextLink href='/games/create' passHref>
      <Button as='a' px='6' aria-label='Create a Game' colorScheme='pink'>
        Create a Game
      </Button>
    </NextLink>
  </VStack>
)
