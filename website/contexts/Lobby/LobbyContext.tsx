import { useReducer, useContext, createContext } from 'react'
import {
  usePresenceChannel,
  useClientTrigger,
  type usePresenceChannelValue,
} from '@harelpls/use-pusher'
import type { LobbyBase, Player } from '../../utils/types/lobby'
import LobbyReducer from './LobbyReducer'

type LobbyContextType = LobbyBase & {
  presenceChannel: usePresenceChannelValue
  trigger: (eventName: string, data: Record<string, unknown>) => void
  setGameCode: (gameCode: string) => void
  addPlayer: (player: Player) => void
  removePlayer: (memberId: string) => void
  setPlayerCount: (count: number) => void
  setQuestionIndex: (index: number) => void
  reset: () => void
}

const initialState: LobbyBase = {
  gameCode: '',
  players: [],
  playerCount: 0,
  questionIndex: 0,
}

const LobbyContext = createContext<LobbyContextType>(
  initialState as LobbyContextType
)

export const LobbyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(LobbyReducer, initialState)
  const presenceChannel = usePresenceChannel(`presence-lobby-${state.gameCode}`)
  const trigger = useClientTrigger(presenceChannel.channel)

  const setGameCode = (gameCode: string): void => {
    dispatch({
      type: 'SET_GAME_CODE',
      payload: gameCode,
    })
  }

  const addPlayer = (player: Player): void => {
    dispatch({
      type: 'ADD_PLAYER',
      payload: player,
    })
  }

  const removePlayer = (memberId: string): void => {
    dispatch({
      type: 'REMOVE_PLAYER',
      payload: memberId,
    })
  }

  const setPlayerCount = (count: number): void => {
    dispatch({
      type: 'SET_PLAYER_COUNT',
      payload: count,
    })
  }

  const setQuestionIndex = (index: number): void => {
    dispatch({
      type: 'SET_QUESTION_INDEX',
      payload: index,
    })
  }

  const reset = (): void => {
    dispatch({
      type: 'RESET',
      payload: initialState,
    })
  }

  return (
    <LobbyContext.Provider
      value={{
        ...state,
        presenceChannel,
        trigger,
        setGameCode,
        addPlayer,
        removePlayer,
        setPlayerCount,
        setQuestionIndex,
        reset,
      }}
    >
      {children}
    </LobbyContext.Provider>
  )
}

export const useLobbyContext = () => useContext(LobbyContext)
