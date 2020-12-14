import { useState, useEffect } from 'react'
import { useEvent, usePresenceChannel } from '@harelpls/use-pusher'
import { Heading, Tag } from '@chakra-ui/react'

const COLORS = ['red', 'yellow', 'blue', 'purple', 'teal', 'orange']

const Players = ({ gameCode, setPlayerCount }) => {
  const [players, setPlayers] = useState([])
  const presenceChannel = usePresenceChannel(`presence-lobby-${gameCode}`)

  useEvent(presenceChannel.channel, 'client-player', (data, metadata) => {
    if (data) setPlayers((p) => [...p, { id: metadata.user_id, name: data }])
  })

  useEvent(presenceChannel.channel, 'pusher:member_removed', (member) => {
    setPlayers(players.filter((p) => p.id !== member.id))
  })

  useEffect(() => {
    if (presenceChannel.count > 0) setPlayerCount(presenceChannel.count - 1)
  }, [players])

  return players.length === 0
    ? (
      <Heading mt='40' py='4' px='8' bg='white' rounded='md' boxShadow='2xl'>
        Waiting for players...
      </Heading>
      )
    : (players.map((player) => {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)]
        return (
          <Tag key={player.id} size='lg' colorScheme={color} fontSize='5xl'>
            {player.name}
          </Tag>
        )
      }))
}

export default Players
