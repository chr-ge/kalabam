import { useState } from 'react'
import { useChannel, useEvent } from '@harelpls/use-pusher'
import { Heading, Tag } from '@chakra-ui/react'

const Players = ({ gameCode }) => {
  const [players, setPlayers] = useState([])

  const channel = useChannel(`private-lobby-${gameCode}`)
  useEvent(channel, 'player-join', (data) => {
    if (data) setPlayers(p => [...p, data])
  })

  return players.length === 0
    ? (
      <Heading mt='40' py='4' px='8' bg='white' rounded='md' boxShadow='2xl'>
        Waiting for players...
      </Heading>
      )
    : players.map((player, i) => <Tag key={i} size='lg' colorScheme='red' fontSize='5xl'>{player}</Tag>)
}

export default Players
