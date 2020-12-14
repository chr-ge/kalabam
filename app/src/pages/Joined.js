import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useLocalStorage, deleteFromStorage } from '@rehooks/local-storage'
import { Center, Text } from '@chakra-ui/react'

const Joined = () => {
  const history = useHistory()
  const [game] = useLocalStorage('game')

  useEffect(() => {
    if (!game) history.replace('/')
    window.onbeforeunload = () => deleteFromStorage('game')
  })

  return (
    <Center h='100vh' bg='teal.100'>
      <Text>Joined Game</Text>
    </Center>
  )
}

export default Joined
