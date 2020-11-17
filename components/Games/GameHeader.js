import { useRouter } from 'next/router'
import {
  Button,
  Box,
  Flex,
  Heading
} from '@chakra-ui/core'
import GameSettingsDrawer from './GameSettingsDrawer'

const GameHeader = () => {
  const router = useRouter()

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
        <GameSettingsDrawer />
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
            onClick={() => true}
          >
            Done
          </Button>
        </Box>
      </Flex>
    </nav>
  )
}

export default GameHeader
