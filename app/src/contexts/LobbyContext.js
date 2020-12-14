import { useReducer, useContext, createContext } from 'react'
import { useLocalStorage } from '@rehooks/local-storage'
import { useChannel, useClientTrigger } from '@harelpls/use-pusher'

const initialState = {
  name: ''
}

const LobbyContext = createContext(initialState)

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return {
        name: action.payload
      }
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

export const LobbyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [game] = useLocalStorage('game')

  const channel = useChannel(`presence-lobby-${game}`)
  const trigger = useClientTrigger(channel)

  const setPlayerName = (name) => {
    trigger('client-player', name)
    dispatch({
      type: 'SET_NAME',
      payload: name
    })
  }

  return (
    <LobbyContext.Provider
      value={{
        ...state,
        setPlayerName
      }}
    >
      {children}
    </LobbyContext.Provider>
  )
}

export const useLobbyContext = () => useContext(LobbyContext)
