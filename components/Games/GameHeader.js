import { useRouter } from 'next/router'
import { Box, Button, Flex, Heading, useDisclosure } from '@chakra-ui/react'
import { useGameContext } from '../../context/Game/GameContext'
import { useAddGame, useEditGame } from '../../lib/api-hooks'
import GameSettingsDrawer from './GameSettingsDrawer'

const GameHeader = ({ mode }) => {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { _id, title, description, questions, resetContext } = useGameContext()

  const [addGame, { isLoading: addIsLoading }] = useAddGame()
  const [editGame, { isLoading: editIsLoading }] = useEditGame(_id)

  const handleDone = async () => {
    if (!title) {
      onOpen()
    } else {
      try {
        if (mode === 'create') {
          await addGame({ title, description, questions })
        } else {
          await editGame({ title, description, questions })
        }
        resetContext()
        router.push('/')
      } catch (err) {
        global.alert('An error has occurred')
      }
    }
  }

  return (
    <nav>
      <Flex
        py='1'
        px='4'
        align='center'
        justify='space-between'
        backgroundColor='gray.200'
        borderBottomColor='gray.300'
        borderBottomWidth='thick'
      >
        <Heading color='blue.800'>Kalabam</Heading>
        <GameSettingsDrawer isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        <Box>
          <Button
            aria-label='Cancel'
            variant='outline'
            marginRight='2'
            colorScheme='blue'
            size='sm'
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            aria-label='Done Game'
            px='5'
            marginRight='4'
            colorScheme='green'
            color='white'
            size='sm'
            onClick={handleDone}
            isLoading={addIsLoading || editIsLoading}
            loadingText='Saving...'
          >
            Done
          </Button>
        </Box>
      </Flex>
    </nav>
  )
}

export default GameHeader
