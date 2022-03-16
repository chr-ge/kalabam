export type Answer = {
  id: number
  answer: string
  isCorrect: boolean
}

export type Question = {
  id: number
  question: string
  timeLimit: number
  points: number
  answers: Answer[]
  image?: string
}

export type GameBase = {
  title: string
  description: string
  visibility: '1' | '0'
  image: { src: string; alt: string }
  questions: Question[]
}

export type Game = GameBase & {
  _id: string
  createdBy: string
  created: string
  updated: string
  featured: number
  questionCount?: number
}
