export default function reducer (state, action) {
  switch (action.type) {
    case 'UPDATE_GAME_SETTINGS':
      return {
        ...state,
        title: action.payload.title,
        description: action.payload.description
      }
    case 'ADD_QUESTION':
      return {
        ...state,
        questions: [...state.questions, action.payload]
      }
    case 'DELETE_QUESTION':
      return {
        ...state,
        questions: state.questions.filter((q) => q.id !== action.payload)
      }
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}
