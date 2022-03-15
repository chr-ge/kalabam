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

export type Game = {
  _id: string
  title: string
  description: string
  questions: Question[]
  createdBy: string
  created: string
  updated: string
  visibility: '1' | '0'
  image: { src: string; alt: string }
  featured: number
  questionCount?: number
}
