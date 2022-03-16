import { useReducer, useContext, createContext } from 'react'
import uniqid from 'uniqid'
import GameReducer from './GameReducer'
import type { GameBase, Question } from '../../utils/types'

export type InitialGameState = GameBase & {
  _id?: string
  activeQuestion: Question
}

type GameContextType = InitialGameState & {
  setGame: (game: GameBase) => void
  updateGameSettings: ({
    title,
    description,
    visibility,
  }: Pick<GameBase, 'title' | 'description' | 'visibility'>) => void
  setGameImage: ({ src, alt }: GameBase['image']) => void
  addQuestion: () => void
  setActiveQuestion: (question: Question) => void
  updateQuestion: (question: Question) => void
  deleteQuestion: (questionId: number) => void
  reorderQuestions: (questions: Question[]) => void
  resetContext: () => void
}

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

const GameContext = createContext<GameContextType>(
  initialState as GameContextType
)

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GameReducer, initialState)

  const setGame = (game: GameBase): void => {
    dispatch({
      type: 'SET_GAME',
      payload: game,
    })
  }

  const updateGameSettings = ({ title, description, visibility }): void => {
    dispatch({
      type: 'UPDATE_GAME_SETTINGS',
      payload: { title, description, visibility },
    })
  }

  const setGameImage = ({ src, alt }): void => {
    dispatch({
      type: 'SET_GAME_IMAGE',
      payload: { src, alt },
    })
  }

  const addQuestion = (): void => {
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
          { id: 4, answer: '', isCorrect: false },
        ],
      },
    })
  }

  const setActiveQuestion = (question: Question): void => {
    dispatch({
      type: 'SET_ACTIVE_QUESTION',
      payload: question,
    })
  }

  const updateQuestion = (question: Question): void => {
    dispatch({
      type: 'UPDATE_QUESTION',
      payload: question,
    })
  }

  const deleteQuestion = (questionId: number): void => {
    dispatch({
      type: 'DELETE_QUESTION',
      payload: questionId,
    })
  }

  const reorderQuestions = (questions: Question[]): void => {
    dispatch({
      type: 'REORDER_QUESTIONS',
      payload: questions,
    })
  }

  const resetContext = (): void => {
    dispatch({
      type: 'RESET',
    })
  }

  return (
    <GameContext.Provider
      value={{
        ...state,
        setGame,
        updateGameSettings,
        setGameImage,
        addQuestion,
        setActiveQuestion,
        updateQuestion,
        deleteQuestion,
        reorderQuestions,
        resetContext,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext = () => useContext(GameContext)
