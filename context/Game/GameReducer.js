export default function reducer (state, action) {
  switch (action.type) {
    case 'SET_GAME':
      return {
        ...action.payload,
        activeQuestion: action.payload.questions[0]
      }
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
    case 'SET_ACTIVE_QUESTION':
      return {
        ...state,
        activeQuestion: action.payload
      }
    case 'UPDATE_QUESTION': {
      const index = state.questions.findIndex(
        (question) => question.id === action.payload.id
      )
      state.questions[index] = action.payload
      return {
        ...state
      }
    }
    case 'DELETE_QUESTION':
      return {
        ...state,
        questions: state.questions.filter((q) => q.id !== action.payload)
      }
    case 'RESET':
      return action.payload
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}
