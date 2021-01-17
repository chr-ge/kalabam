const initialState = {
  title: '',
  description: '',
  visibility: '0',
  questions: [
    {
      id: 1,
      question: '',
      timeLimit: 20,
      points: 1000,
      answers: [
        { id: 1, answer: '', isCorrect: false },
        { id: 2, answer: '', isCorrect: false },
        { id: 3, answer: '', isCorrect: false },
        { id: 4, answer: '', isCorrect: false }
      ]
    }
  ],
  activeQuestion: {
    id: 1,
    question: '',
    timeLimit: 20,
    points: 1000,
    answers: [
      { id: 1, answer: '', isCorrect: false },
      { id: 2, answer: '', isCorrect: false },
      { id: 3, answer: '', isCorrect: false },
      { id: 4, answer: '', isCorrect: false }
    ]
  }
}

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
        description: action.payload.description,
        visibility: action.payload.visibility
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
      return initialState
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}
