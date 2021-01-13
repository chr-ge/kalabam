import { useContext, createContext, ReactNode } from 'react'
import { useLocalStorage } from '@rehooks/local-storage'
import { useChannel, useClientTrigger } from '@harelpls/use-pusher'
import { Channel, PresenceChannel } from 'pusher-js';

export interface GameStateInterface {
  questionIndex: string;
  answersCount: string;
  timeLimit?: string;
}

export interface GameInterface {
  name: string;
  code: string;
  totalQuestions: string;
  gameState: GameStateInterface;
}

interface LobbyContextInterface {
  channel: (Channel & PresenceChannel)| undefined;
  trigger: (eventName: string, data: {}) => void;
}

const LobbyContext = createContext({} as LobbyContextInterface)

export const LobbyProvider = ({ children }: { children: ReactNode }) => {
  const [game] = useLocalStorage<{ code: string }>('game')

  const channel = useChannel(`presence-lobby-${game?.code}`)
  const trigger = useClientTrigger(channel)

  return (
    <LobbyContext.Provider value={{ channel, trigger }}>
      {children}
    </LobbyContext.Provider>
  )
}

export const useLobbyContext = () => useContext(LobbyContext)
