import { useReducer, useContext, createContext } from 'react'
import GameCreateReducer from './GameCreateReducer'
import uniqid from 'uniqid'

const initialState = {
  title: '',
  description: '',
  questions: [
    {
      id: 1,
      question: '',
      timeLimit: 20,
      points: 1000,
      answers: [
        { id: 1, answer: '', color: 'tomato', isCorrect: false },
        { id: 2, answer: '', color: 'pink.400', isCorrect: false },
        { id: 3, answer: '', color: 'purple.400', isCorrect: false },
        { id: 4, answer: '', color: 'teal.400', isCorrect: false }
      ]
    }
  ]
}

const GameCreateContext = createContext(initialState)

export const GameCreateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GameCreateReducer, initialState)

  const updateGameSettings = ({ title, description }) => {
    dispatch({
      type: 'UPDATE_GAME_SETTINGS',
      payload: { title, description }
    })
  }

  const addQuestion = () => {
    dispatch({
      type: 'ADD_QUESTION',
      payload: {
        id: uniqid(),
        question: '',
        timeLimit: 20,
        points: 1000,
        answers: [
          { id: 1, answer: '', color: 'tomato', isCorrect: false },
          { id: 2, answer: '', color: 'pink.400', isCorrect: false },
          { id: 3, answer: '', color: 'purple.400', isCorrect: false },
          { id: 4, answer: '', color: 'teal.400', isCorrect: false }
        ]
      }
    })
  }

  const deleteQuestion = (questionId) => {
    dispatch({
      type: 'DELETE_QUESTION',
      payload: questionId
    })
  }

  return (
    <GameCreateContext.Provider
      value={{ ...state, updateGameSettings, addQuestion, deleteQuestion }}
    >
      {children}
    </GameCreateContext.Provider>
  )
}

export const useGameCreate = () => useContext(GameCreateContext)
