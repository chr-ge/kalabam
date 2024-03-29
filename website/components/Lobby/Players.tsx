import { FC, useEffect } from 'react'
import { useEvent } from '@harelpls/use-pusher'
import { Grid, Heading, Tag } from '@chakra-ui/react'
import { useLobbyContext } from '../../contexts/Lobby/LobbyContext'

const COLORS = ['red', 'pink', 'yellow', 'blue', 'purple', 'teal', 'orange']

export const Players: FC = () => {
  const { presenceChannel, players, addPlayer, removePlayer, setPlayerCount } =
    useLobbyContext()

  useEvent(
    presenceChannel.channel,
    'client-player',
    (data: string, metadata) => {
      if (data) addPlayer({ id: metadata.user_id, name: data })
    }
  )

  useEvent(
    presenceChannel.channel,
    'pusher:member_removed',
    (member: { id: string }) => {
      removePlayer(member.id)
    }
  )

  useEffect(() => {
    if (presenceChannel.count > 0) setPlayerCount(presenceChannel.count - 1)
  }, [players])

  return players.length === 0 ? (
    <Heading mt='40' py='4' px='8' bg='white' rounded='md' boxShadow='2xl'>
      Waiting for players...
    </Heading>
  ) : (
    <Grid
      gap={4}
      mx='12'
      templateColumns={{
        base: '1fr',
        md: 'repeat(4, 1fr)',
        lg: 'repeat(5, 1fr)',
      }}
    >
      {players.map((player) => {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)]
        return (
          <Tag
            key={player.id}
            size='lg'
            colorScheme={color}
            fontSize={{ base: '2xl', md: '4xl' }}
            py='2'
          >
            {player.name}
          </Tag>
        )
      })}
    </Grid>
  )
}
