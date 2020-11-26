import { useReducer, useContext, createContext } from 'react'
import GameReducer from './GameReducer'
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
  ],
  activeQuestion: {
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
}

const GameContext = createContext(initialState)

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GameReducer, initialState)

  const setGame = (game) => {
    dispatch({
      type: 'SET_GAME',
      payload: game
    })
  }

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

  const setActiveQuestion = (question) => {
    dispatch({
      type: 'SET_ACTIVE_QUESTION',
      payload: question
    })
  }

  const updateQuestion = (question) => {
    dispatch({
      type: 'UPDATE_QUESTION',
      payload: question
    })
  }

  const deleteQuestion = (questionId) => {
    dispatch({
      type: 'DELETE_QUESTION',
      payload: questionId
    })
  }

  const resetContext = () => {
    dispatch({
      type: 'RESET'
    })
  }

  return (
    <GameContext.Provider
      value={{
        ...state,
        setGame,
        updateGameSettings,
        addQuestion,
        setActiveQuestion,
        updateQuestion,
        deleteQuestion,
        resetContext
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext = () => useContext(GameContext)
