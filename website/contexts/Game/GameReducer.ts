import type { InitialGameState } from './GameContext'

const initialState: InitialGameState = {
  title: '',
  description: '',
  visibility: '0',
  image: { src: '', alt: '' },
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
        { id: 4, answer: '', isCorrect: false },
      ],
    },
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
      { id: 4, answer: '', isCorrect: false },
    ],
  },
}

type GameAction =
  | 'SET_GAME'
  | 'UPDATE_GAME_SETTINGS'
  | 'SET_GAME_IMAGE'
  | 'ADD_QUESTION'
  | 'SET_ACTIVE_QUESTION'
  | 'UPDATE_QUESTION'
  | 'DELETE_QUESTION'
  | 'REORDER_QUESTIONS'
  | 'RESET'

export default function reducer(
  state: InitialGameState,
  action: { type: GameAction; payload?: any }
) {
  switch (action.type) {
    case 'SET_GAME':
      return {
        ...action.payload,
        activeQuestion: action.payload.questions[0],
      }
    case 'UPDATE_GAME_SETTINGS':
      return {
        ...state,
        title: action.payload.title,
        description: action.payload.description,
        visibility: action.payload.visibility,
      }
    case 'SET_GAME_IMAGE':
      return {
        ...state,
        image: action.payload,
      }
    case 'ADD_QUESTION':
      return {
        ...state,
        questions: [...state.questions, action.payload],
      }
    case 'SET_ACTIVE_QUESTION':
      return {
        ...state,
        activeQuestion: action.payload,
      }
    case 'UPDATE_QUESTION': {
      const index = state.questions.findIndex(
        (question) => question.id === action.payload.id
      )
      state.questions[index] = action.payload
      return {
        ...state,
      }
    }
    case 'DELETE_QUESTION':
      return {
        ...state,
        questions: state.questions.filter((q) => q.id !== action.payload),
      }
    case 'REORDER_QUESTIONS':
      return {
        ...state,
        questions: action.payload,
      }
    case 'RESET':
      return initialState
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}
