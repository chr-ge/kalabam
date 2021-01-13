import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useEvent } from '@harelpls/use-pusher'
import { useLocalStorage, writeStorage, deleteFromStorage } from '@rehooks/local-storage'
import { Box, Button, Center, Flex, Icon, Image, Text, SimpleGrid, Spinner } from '@chakra-ui/react'
import { ImCheckmark, ImCross } from 'react-icons/im'
import { useLobbyContext, GameInterface, GameStateInterface } from '../contexts/LobbyContext'
import GameFooter from '../components/Game/GameFooter'

// answer options images
import cylinder from '../images/cylinder.png'
import cube from '../images/cube.png'
import pyramid from '../images/pyramid.png'
import torus from '../images/torus.png'

type Status = 'PLAY' | 'RESULTS' | 'WAITING'

const CHOICES = [
  { color: 'yellow', image: cylinder, alt: 'cylinder' },
  { color: 'pink', image: cube, alt: 'cube' },
  { color: 'purple', image: pyramid, alt: 'pyramid' },
  { color: 'teal', image: torus, alt: 'torus' }
]

const Live = () => {
  const history = useHistory()
  const [game] = useLocalStorage<GameInterface>('game')
  const { channel, trigger } = useLobbyContext()
  const [status, setStatus] = useState<Status>('PLAY')
  const [answer, setAnswer] = useState<any | undefined>()
  const [correctAnswers, setCorrectAnswers] = useState<any[]>([])

  const isRightAnswer = correctAnswers.includes(answer)

  useEffect(() => {
    if (!game) history.replace('/')
    window.onbeforeunload = () => deleteFromStorage('game')
  })

  useEvent(channel, 'client-question', (data?: GameStateInterface) => {
    writeStorage('game', {
      ...game,
      gameState: {
        questionIndex: data!.questionIndex,
        timeLimit: data!.timeLimit,
        answersCount: data!.answersCount
      }
    })
    setAnswer(undefined)
    setCorrectAnswers([])
    setStatus('PLAY')
  })

  useEvent(channel, 'client-question-results', (data?: { correctAnswerIndex: any; }) => {
    setCorrectAnswers(data!.correctAnswerIndex)
    setStatus('RESULTS')
  })

  useEvent(channel, 'client-game-over', () => {
    deleteFromStorage('game')
    history.replace('/')
  })

  const handleClick = (index: number) => {
    trigger('client-answer', index.toString())
    setAnswer(index)
    setStatus('WAITING')
  }

  return (
    <Flex h='100vh' direction='column' bg='lightPink'>
      <Box bg='white' w='100%'>
        <Text px='12' py='3' fontSize='2xl'>
          {`${game!.gameState.questionIndex} of ${game!.totalQuestions}`}
        </Text>
      </Box>
      {status === 'WAITING'
        ? (
          <Center flex={1}>
            <Box align='center'>
              <Spinner label='Loading' color='pink.500' size='xl' speed='1s' thickness='6px' />
              <Text mt='3' fontSize='xl'>Think you got it right?</Text>
            </Box>
          </Center>
          )
        : status === 'RESULTS'
          ? (
            <Center flex={1} bg={isRightAnswer ? 'green.400' : 'red.400'}>
              <Box align='center'>
                <Text fontSize='2xl' color='white'>
                  {isRightAnswer ? 'You got it right!' : 'Wrong Answer!'}
                </Text>
                <Icon mt='4' as={isRightAnswer ? ImCheckmark : ImCross} boxSize='10' color='white' />
              </Box>
            </Center>
            )
          : (
            <SimpleGrid flex={1} p='6' columns={2} spacing={6}>
              {[...Array(game!.gameState.answersCount)].map((_, i) => (
                <Button
                  key={CHOICES[i].color}
                  h='100%'
                  pos='relative'
                  colorScheme={CHOICES[i].color}
                  onClick={() => handleClick(i)}
                >
                  <Image
                    src={CHOICES[i].image}
                    alt={CHOICES[i].alt}
                    boxSize={{ base: '75%', md: '50%' }}
                    pos='absolute'
                    fit='contain'
                  />
                </Button>
              ))}
            </SimpleGrid>
            )}
      <GameFooter />
    </Flex>
  )
}

export default Live
