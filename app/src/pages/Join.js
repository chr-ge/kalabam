import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useLocalStorage, deleteFromStorage } from '@rehooks/local-storage'
import { useChannel, useClientTrigger } from '@harelpls/use-pusher'
import { Button, Heading, Input, VStack } from '@chakra-ui/react'
import Layout from '../components/layouts/Layout'

const Join = () => {
  const history = useHistory()
  const [game] = useLocalStorage('game')
  const [name, setName] = useState('')

  useEffect(() => {
    if (!game) history.push('/')
    window.onbeforeunload = () => deleteFromStorage('game')
  })

  const channel = useChannel(`presence-lobby-${game}`)
  const trigger = useClientTrigger(channel)

  const handleClick = () => {
    trigger('client-player', name)
    history.push('/joined')
  }

  return (
    <Layout>
      <VStack spacing={4}>
        <Heading mb='2' fontSize='7xl' color='blue.800' textAlign='center'>Kalabam</Heading>
        <Input
          size='lg'
          placeholder='Nickname'
          focusBorderColor='teal.300'
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        <Button
          py='6'
          colorScheme='pink'
          isDisabled={name.length < 2}
          onClick={handleClick}
          _disabled={{
            opacity: 0.7,
            cursor: 'not-allowed',
            boxShadow: 'none'
          }}
          isFullWidth
        >
          Ready to Play
        </Button>
      </VStack>
    </Layout>
  )
}

export default Join
