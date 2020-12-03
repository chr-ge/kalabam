import { useState } from 'react'
import Head from 'next/head'
import {
  Button,
  Center,
  Heading,
  PinInput,
  PinInputField,
  Stack
} from '@chakra-ui/react'

function Play () {
  const [gameCode, setGameCode] = useState('')

  return (
    <>
      <Head>
        <title>Play a Game | Kalabam</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Center h='100vh'>
        <Stack spacing={4}>
          <Heading mb='4' fontSize='7xl' color='blue.800' textAlign='center'>
            Kalabam
          </Heading>
          <Stack direction='row'>
            <PinInput
              size='lg' focusBorderColor='teal.300'
              onChange={(val) => setGameCode(val)} autoFocus
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
    </>
  )
}

export default Play
