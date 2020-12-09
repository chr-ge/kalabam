import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useLocalStorage, deleteFromStorage } from '@rehooks/local-storage'
import { Button, Center, Heading, Input, VStack } from '@chakra-ui/react'

const Join = () => {
  const history = useHistory()
  const [game] = useLocalStorage('game')
  const [name, setName] = useState('')

  useEffect(() => {
    if (!game) history.push('/')

    window.onbeforeunload = () => deleteFromStorage('game')
  })

  return (
    <Center h='100vh'>
      <VStack spacing={4}>
        <Heading mb='2' fontSize='7xl' color='blue.800' textAlign='center'>
          Kalabam
        </Heading>
        <Input
          size='lg'
          placeholder='Nickname'
          focusBorderColor='teal.300'
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          py='6'
          colorScheme='pink'
          isDisabled={name.length < 2}
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
    </Center>
  )
}

export default Join
