import { useReducer, useContext, createContext } from 'react'
import { usePresenceChannel, useClientTrigger } from '@harelpls/use-pusher'
import LobbyReducer from './LobbyReducer'

const initialState = {
  gameCode: '',
  players: [],
  playerCount: 0,
  questionIndex: 0,
}

const LobbyContext = createContext(initialState)

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

  const addPlayer = (player): void => {
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

  const setPlayerCount = (count): void => {
    dispatch({
      type: 'SET_PLAYER_COUNT',
      payload: count,
    })
  }

  const setQuestionIndex = (index): void => {
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
