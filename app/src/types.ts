export type GameState = {
  questionIndex: string
  answersCount: string
  timeLimit?: string
}

export type QuestionData = GameState & {
  totalQuestions: string
}

export type Game = {
  name: string
  code: string
  totalQuestions: string
  gameState: GameState
}
