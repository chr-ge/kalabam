import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useLocalStorage, deleteFromStorage } from '@rehooks/local-storage'
import { Box, Button, Flex, Text, SimpleGrid } from '@chakra-ui/react'
import { useLobbyContext } from '../contexts/LobbyContext'
import GameFooter from '../components/Game/GameFooter'

const COLORS = ['yellow', 'pink', 'purple', 'teal']

const Live = () => {
  const history = useHistory()
  const [game] = useLocalStorage('game')
  const { trigger } = useLobbyContext()

  useEffect(() => {
    if (!game) history.replace('/')
    window.onbeforeunload = () => deleteFromStorage('game')
  })

  const handleClick = (i) => {
    trigger('client-answer', i)
  }

  return (
    <Flex h='100vh' direction='column' bg='lightPink'>
      <Box bg='white' w='100%'>
        <Text px='12' py='3' fontSize='2xl'>{`${1} of ${3}`}</Text>
      </Box>
      <SimpleGrid flex={1} p='6' columns={2} spacing={6}>
        {[...Array(game.gameState.answersCount)].map((_, i) => (
          <Button key={COLORS[i]} colorScheme={COLORS[i]} h='100%' onClick={() => handleClick(i)} />
        ))}
      </SimpleGrid>
      <GameFooter />
    </Flex>
  )
}

export default Live
