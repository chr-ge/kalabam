import { FC, ReactNode, useState, useContext, createContext } from 'react'
import { useLocalStorage } from '@rehooks/local-storage'
import { useChannel, useClientTrigger } from '@harelpls/use-pusher'
import type { Channel, PresenceChannel } from 'pusher-js'
import type { Game } from '../types'

type InitialState = { name: string }

const initialState: InitialState = {
  name: '',
}

type LobbyContextType = InitialState & {
  channel: (Channel & PresenceChannel) | undefined
  trigger: (eventName: string, data: {}) => void
  name: string
  setPlayerName: (name: string) => void
}

const LobbyContext = createContext<LobbyContextType>(
  initialState as LobbyContextType
)

export const LobbyProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [name, setName] = useState('')
  const [game] = useLocalStorage<Game>('game')

  const channel = useChannel(`presence-lobby-${game?.code}`)
  const trigger = useClientTrigger(channel)

  const setPlayerName = (playerName: string) => {
    trigger('client-player', playerName)
    setName(playerName)
  }

  return (
    <LobbyContext.Provider
      value={{
        name,
        channel,
        trigger,
        setPlayerName,
      }}
    >
      {children}
    </LobbyContext.Provider>
  )
}

export const useLobbyContext = () => useContext(LobbyContext)
