import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Heading,
  PinInput,
  PinInputField,
  Stack,
  useToast,
} from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import { Layout } from '../components/Layout'

const Home: FC = () => {
  const toast = useToast()
  const navigate = useNavigate()
  const [gameCode, setGameCode] = useState('')
  const [loading, setLoading] = useState(false)

  const handleClick = async (): Promise<void> => {
    setLoading(true)
    const res = await global.fetch(
      process.env.REACT_APP_JOIN_ENDPOINT + '/' + gameCode
    )
    setLoading(false)
    if (res.status >= 300 && res.status !== 401) {
      toast({
        position: 'bottom',
        title: t`We did not recognize that game code.`,
        description: t`Please try again.`,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    } else if (res.status === 401) {
      toast({
        position: 'bottom',
        title: t`The game is locked by the host.`,
        description: t`Please ask for the game to be unlocked.`,
        status: 'info',
        duration: 9000,
        isClosable: true,
      })
    } else {
      window.localStorage.setItem('game', JSON.stringify({ code: gameCode }))
      navigate('/join')
    }
  }

  return (
    <Layout>
      <Stack spacing={4}>
        <Heading mb='2' fontSize='7xl' variant='logo' textAlign='center'>
          Kalabam
        </Heading>
        <Stack direction='row'>
          <PinInput
            size='lg'
            focusBorderColor='teal.300'
            onChange={(val) => setGameCode(val)}
            type='number'
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
          aria-label={t`Join Game`}
          isDisabled={gameCode.length < 6}
          onClick={handleClick}
          isLoading={loading}
          _disabled={{
            opacity: 0.7,
            cursor: 'not-allowed',
            boxShadow: 'none',
          }}
        >
          <Trans>Join Game</Trans>
        </Button>
      </Stack>
    </Layout>
  )
}

export default Home
