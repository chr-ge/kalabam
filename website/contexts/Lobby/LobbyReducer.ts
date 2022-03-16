type LobbyAction =
  | 'SET_GAME_CODE'
  | 'ADD_PLAYER'
  | 'REMOVE_PLAYER'
  | 'SET_PLAYER_COUNT'
  | 'SET_QUESTION_INDEX'
  | 'RESET'

export default function reducer(
  state,
  action: { type: LobbyAction; payload: unknown }
) {
  switch (action.type) {
    case 'SET_GAME_CODE':
      return {
        ...state,
        gameCode: action.payload,
      }
    case 'ADD_PLAYER':
      return {
        ...state,
        players: [...state.players, action.payload],
      }
    case 'REMOVE_PLAYER':
      return {
        ...state,
        players: state.players.filter((p) => p.id !== action.payload),
      }
    case 'SET_PLAYER_COUNT':
      return {
        ...state,
        playerCount: action.payload,
      }
    case 'SET_QUESTION_INDEX':
      return {
        ...state,
        questionIndex: action.payload,
      }
    case 'RESET':
      return action.payload
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}
