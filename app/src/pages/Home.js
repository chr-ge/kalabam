import React, { useState } from 'react'
import { writeStorage } from '@rehooks/local-storage'
import { useHistory } from 'react-router-dom'
import { Button, Heading, PinInput, PinInputField, Stack, useToast } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import Layout from '../components/Layout'

const Home = () => {
  const toast = useToast()
  const history = useHistory()
  const [gameCode, setGameCode] = useState('')
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    const res = await global.fetch(process.env.REACT_APP_JOIN_ENDPOINT + '/' + gameCode)
    setLoading(false)
    if (res.status >= 300 && res.status !== 401) {
      toast({
        position: 'bottom',
        title: t`We did not recognize that game code.`,
        description: t`Please try again.`,
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    } else if (res.status === 401) {
      toast({
        position: 'bottom',
        title: t`The game is locked by the host.`,
        description: t`Please ask for the game to be unlocked.`,
        status: 'info',
        duration: 9000,
        isClosable: true
      })
    } else {
      writeStorage('game', { code: gameCode })
      history.push('/join')
    }
  }

  return (
    <Layout>
      <Stack spacing={4}>
        <Heading mb='2' fontSize='7xl' variant='logo' textAlign='center'>Kalabam</Heading>
        <Stack direction='row'>
          <PinInput
            size='lg'
            focusBorderColor='teal.300'
            onChange={(val) => setGameCode(val)}
            type='number'
            autoFocus
            isRequired
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
          aria-label={t`Join Game`}
          isDisabled={gameCode.length < 6}
          onClick={handleClick}
          isLoading={loading}
          _disabled={{
            opacity: 0.7,
            cursor: 'not-allowed',
            boxShadow: 'none'
          }}
        >
          <Trans>Join Game</Trans>
        </Button>
      </Stack>
    </Layout>
  )
}

export default Home
