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
        { id: 1, answer: '', isCorrect: false },
        { id: 2, answer: '', isCorrect: false },
        { id: 3, answer: '', isCorrect: false },
        { id: 4, answer: '', isCorrect: false }
      ]
    }
  ]
}

const GameCreateContext = createContext(initialState)

export const GameCreateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GameCreateReducer, initialState)

  const deleteQuestion = (questionId) => {
    dispatch({
      type: 'DELETE_QUESTION',
      payload: questionId
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
          { id: 1, answer: '', isCorrect: false },
          { id: 2, answer: '', isCorrect: false },
          { id: 3, answer: '', isCorrect: false },
          { id: 4, answer: '', isCorrect: false }
        ]
      }
    })
  }

  return (
    <GameCreateContext.Provider
      value={{ ...state, deleteQuestion, addQuestion }}
    >
      {children}
    </GameCreateContext.Provider>
  )
}

export const useGameCreate = () => useContext(GameCreateContext)
