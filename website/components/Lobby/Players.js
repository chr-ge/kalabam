import { useState } from 'react'
import { useEvent, usePresenceChannel } from '@harelpls/use-pusher'
import { Heading, Tag } from '@chakra-ui/react'

const Players = ({ gameCode }) => {
  const [players, setPlayers] = useState([])

  const presenceChannel = usePresenceChannel(`presence-lobby-${gameCode}`)
  useEvent(presenceChannel.channel, 'client-player', (data, metadata) => {
    if (data) setPlayers(p => [...p, { id: metadata.user_id, name: data }])
  })

  useEvent(presenceChannel.channel, 'pusher:member_removed', (member) => {
    setPlayers(players.filter(p => p.id !== member.id))
  })

  return players.length === 0
    ? (
      <Heading mt='40' py='4' px='8' bg='white' rounded='md' boxShadow='2xl'>
        Waiting for players...
      </Heading>
      )
    : players.map((player) =>
      <Tag key={player.id} size='lg' colorScheme='red' fontSize='5xl'>{player.name}</Tag>
    )
}

export default Players
