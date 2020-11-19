export default (state, action) => {
  switch (action.type) {
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
