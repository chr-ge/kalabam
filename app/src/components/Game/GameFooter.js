import React from 'react'
import { Flex, Tag, Text, Spacer } from '@chakra-ui/react'
import { useLobbyContext } from '../../contexts/LobbyContext'

export const GameFooter = () => {
  const { name } = useLobbyContext()

  return (
    <Flex bg='white' w='100%'>
      <Text px='12' py='4' fontSize='2xl'>
        {name}
      </Text>
      <Spacer />
      <Tag colorScheme='gray' mx='12' my='4' fontSize='2xl'>
        1000
      </Tag>
    </Flex>
  )
}
