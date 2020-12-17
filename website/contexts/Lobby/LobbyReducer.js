export default function reducer (state, action) {
  switch (action.type) {
    case 'SET_GAME_CODE':
      return {
        ...state,
        gameCode: action.payload
      }
    case 'SET_PLAYER_COUNT':
      return {
        ...state,
        playerCount: action.payload
      }
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}
