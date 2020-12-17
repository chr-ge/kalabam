import { useReducer, useContext, createContext } from 'react'
import { usePresenceChannel } from '@harelpls/use-pusher'
import LobbyReducer from './LobbyReducer'

const initialState = {
  gameCode: '',
  playerCount: 0
}

const LobbyContext = createContext(initialState)

export const LobbyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(LobbyReducer, initialState)
  const presenceChannel = usePresenceChannel(`presence-lobby-${state.gameCode}`)

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

  return (
    <LobbyContext.Provider
      value={{
        ...state,
        presenceChannel,
        setGameCode,
        setPlayerCount
      }}
    >
      {children}
    </LobbyContext.Provider>
  )
}

export const useLobbyContext = () => useContext(LobbyContext)
