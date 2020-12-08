import React, { useState } from 'react'
import { writeStorage } from '@rehooks/local-storage'
import { useHistory } from 'react-router-dom'
import { Button, Center, Heading, PinInput, PinInputField, Stack, useToast } from '@chakra-ui/react'

const Home = () => {
  const toast = useToast()
  const history = useHistory()
  const [gameCode, setGameCode] = useState('')
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    const res = await global.fetch(`http://localhost:3000/api/play/join/${gameCode}`)
    setLoading(false)
    if (res.status >= 300) {
      toast({
        position: 'bottom',
        title: 'We did not recognize that game code.',
        description: 'Please try again.',
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    } else {
      writeStorage('game', gameCode)
      history.push('/join')
    }
  }

  return (
    <Center h='100vh'>
      <Stack spacing={4}>
        <Heading mb='4' fontSize='7xl' color='blue.800' textAlign='center'>
          Kalabam
        </Heading>
        <Stack direction='row'>
          <PinInput
            size='lg'
            focusBorderColor='teal.300'
            onChange={(val) => setGameCode(val)}
            autoFocus
          >
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </Stack>
        <Button
          py='6'
          colorScheme='pink'
          isDisabled={gameCode.length < 6}
          onClick={handleClick}
          isLoading={loading}
          _disabled={{
            opacity: 0.7,
            cursor: 'not-allowed',
            boxShadow: 'none'
          }}
        >
          Join Game
        </Button>
      </Stack>
    </Center>
  )
}

export default Home