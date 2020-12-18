import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useEvent } from '@harelpls/use-pusher'
import { useLocalStorage, writeStorage, deleteFromStorage } from '@rehooks/local-storage'
import { Box, Center, Flex, Text, Tag } from '@chakra-ui/react'
import { useLobbyContext } from '../contexts/LobbyContext'
import GameFooter from '../components/Game/GameFooter'

const Joined = () => {
  const history = useHistory()
  const [game] = useLocalStorage('game')
  const { channel } = useLobbyContext()

  useEffect(() => {
    if (!game) history.replace('/')
    window.onbeforeunload = () => deleteFromStorage('game')
  })

  useEvent(channel, 'client-question', ({ data }) => {
    writeStorage('game', {
      ...game,
      gameState: {
        timeLimit: data.timeLimit,
        answersCount: data.answersCount
      }
    })
    history.push('/live')
  })

  return (
    <Flex h='100vh' bg='teal.100' direction='column' align='center'>
      <Center flex={1}>
        <Box align='center'>
          <Tag py='1' px='3' fontSize='3xl' mb='3' colorScheme='purple'>You Joined the Game!</Tag>
          <Text fontSize='2xl'>You should see your name on screen.</Text>
        </Box>
      </Center>
      <GameFooter />
    </Flex>
  )
}

export default Joined
