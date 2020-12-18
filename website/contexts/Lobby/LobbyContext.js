import { useReducer, useContext, createContext } from 'react'
import { usePresenceChannel, useClientTrigger } from '@harelpls/use-pusher'
import LobbyReducer from './LobbyReducer'

const initialState = {
  gameCode: '',
  playerCount: 0,
  questionIndex: 0
}

const LobbyContext = createContext(initialState)

export const LobbyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(LobbyReducer, initialState)
  const presenceChannel = usePresenceChannel(`presence-lobby-${state.gameCode}`)
  const trigger = useClientTrigger(presenceChannel.channel)

  const setGameCode = (gameCode) => {
    dispatch({
      type: 'SET_GAME_CODE',
      payload: gameCode
    })
  }

  const setPlayerCount = (count) => {
    dispatch({
      type: 'SET_PLAYER_COUNT',
      payload: count
    })
  }

  const setQuestionIndex = (index) => {
    dispatch({
      type: 'SET_QUESTION_INDEX',
      payload: index
    })
  }

  return (
    <LobbyContext.Provider
      value={{
        ...state,
        presenceChannel,
        trigger,
        setGameCode,
        setPlayerCount,
        setQuestionIndex
      }}
    >
      {children}
    </LobbyContext.Provider>
  )
}

export const useLobbyContext = () => useContext(LobbyContext)
