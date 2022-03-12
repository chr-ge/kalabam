import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEvent } from '@harelpls/use-pusher'
import {
  useLocalStorage,
  writeStorage,
  deleteFromStorage,
} from '@rehooks/local-storage'
import { Box, Center, Flex, Text, Tag } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { useLobbyContext } from '../contexts/LobbyContext'
import { GameFooter } from '../components/Game/GameFooter'

const Joined = () => {
  const navigate = useNavigate()
  const [game] = useLocalStorage('game')
  const { channel } = useLobbyContext()

  useEffect(() => {
    if (!game) navigate('/', { replace: true })
    window.onbeforeunload = () => deleteFromStorage('game')
  }, [game])

  useEvent(channel, 'client-question', ({ data }) => {
    writeStorage('game', {
      ...game,
      totalQuestions: data.totalQuestions,
      gameState: {
        questionIndex: data.questionIndex,
        timeLimit: data.timeLimit,
        answersCount: data.answersCount,
      },
    })
    navigate('/live')
  })

  return (
    <Flex h='100vh' bg='teal.100' direction='column' align='center'>
      <Center flex={1}>
        <Box align='center'>
          <Tag py='1' px='3' fontSize='3xl' mb='3' colorScheme='purple'>
            <Trans>You Joined the Game!</Trans>
          </Tag>
          <Text fontSize='2xl'>
            <Trans>You should see your name on screen.</Trans>
          </Text>
        </Box>
      </Center>
      <GameFooter />
    </Flex>
  )
}

export default Joined
