import { useRouter } from 'next/router'
import { Box, Button, Flex, Heading, useDisclosure } from '@chakra-ui/react'
import { useGameCreate } from '../../context/Game/GameCreateContext'
import { useAddGame } from '../../lib/api-hooks'
import GameSettingsDrawer from './GameSettingsDrawer'

const GameHeader = () => {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { title, description, questions } = useGameCreate()
  const [addGame] = useAddGame()

  const handleDone = async () => {
    if (!title) {
      onOpen()
    } else {
      try {
        await addGame({ title, description, questions })
        router.push('/')
      } catch (err) {
        global.alert('An error has occurred')
      }
    }
  }

  return (
    <nav>
      <Flex
        align='center'
        justify='space-between'
        backgroundColor='gray.200'
        borderBottomColor='gray.300'
        borderBottomWidth='thick'
        py='1'
        px='4'
      >
        <Heading color='blue.800'>Kalabam</Heading>
        <GameSettingsDrawer isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        <Box>
          <Button
            variant='outline'
            marginRight='2'
            colorScheme='blue'
            aria-label='Sign In'
            size='sm'
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            marginRight='4'
            px='5'
            colorScheme='green'
            color='white'
            aria-label='Sign In'
            size='sm'
            onClick={handleDone}
          >
            Done
          </Button>
        </Box>
      </Flex>
    </nav>
  )
}

export default GameHeader
