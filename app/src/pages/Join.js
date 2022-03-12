import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage, deleteFromStorage } from '@rehooks/local-storage'
import { Button, Heading, Input, VStack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import { useLobbyContext } from '../contexts/LobbyContext'
import { Layout } from '../components/Layout'

const Join = () => {
  const navigate = useNavigate()
  const [game] = useLocalStorage('game')
  const [name, setName] = useState('')
  const { setPlayerName } = useLobbyContext()
  const validName = name.length >= 2

  useEffect(() => {
    if (!game) navigate('/', { replace: true })
    window.onbeforeunload = () => deleteFromStorage('game')
  }, [game])

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && validName) {
      setPlayerName(name)
      navigate('/joined', { replace: true })
    }
  }

  const handleClick = () => {
    setPlayerName(name)
    navigate('/joined', { replace: true })
  }

  return (
    <Layout>
      <VStack spacing={4}>
        <Heading mb='2' fontSize='7xl' variant='logo' textAlign='center'>
          Kalabam
        </Heading>
        <Input
          size='lg'
          aria-label={t`Enter a Nickname`}
          placeholder={t`Nickname`}
          focusBorderColor='teal.300'
          onChange={(e) => setName(e.target.value)}
          onKeyPress={handleKeyPress}
          isRequired
          autoFocus
        />
        <Button
          py='6'
          colorScheme='pink'
          aria-label={t`Ready to Play`}
          isDisabled={!validName}
          onClick={handleClick}
          _disabled={{
            opacity: 0.7,
            cursor: 'not-allowed',
            boxShadow: 'none',
          }}
          isFullWidth
        >
          <Trans>Ready to Play</Trans>
        </Button>
      </VStack>
    </Layout>
  )
}

export default Join
