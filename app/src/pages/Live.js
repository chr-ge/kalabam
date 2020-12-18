import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useLocalStorage, deleteFromStorage } from '@rehooks/local-storage'
import { Box, Button, Center, Flex, Text, SimpleGrid, Spinner } from '@chakra-ui/react'
import { useLobbyContext } from '../contexts/LobbyContext'
import GameFooter from '../components/Game/GameFooter'

const COLORS = ['yellow', 'pink', 'purple', 'teal']

const Live = () => {
  const history = useHistory()
  const [game] = useLocalStorage('game')
  const { trigger } = useLobbyContext()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!game) history.replace('/')
    window.onbeforeunload = () => deleteFromStorage('game')
  })

  const handleClick = (index) => {
    trigger('client-answer', index.toString())
    setLoading(true)
  }

  return (
    <Flex h='100vh' direction='column' bg='lightPink'>
      <Box bg='white' w='100%'>
        <Text px='12' py='3' fontSize='2xl'>{`${1} of ${3}`}</Text>
      </Box>
      {loading
        ? (
          <Center flex={1}>
            <Box align='center'>
              <Spinner label='Loading' color='pink.500' size='xl' speed='1s' thickness='6px' />
              <Text mt='3' fontSize='xl'>Think you got it right?</Text>
            </Box>
          </Center>
          )
        : (
          <SimpleGrid flex={1} p='6' columns={2} spacing={6}>
            {[...Array(game.gameState.answersCount)].map((_, i) => (
              <Button key={COLORS[i]} colorScheme={COLORS[i]} h='100%' onClick={() => handleClick(i)} />
            ))}
          </SimpleGrid>
          )}
      <GameFooter />
    </Flex>
  )
}

export default Live
