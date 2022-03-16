export type Player = {
  id: string
  name: string
  averageAccuracy?: number
}

export type LobbyBase = {
  gameCode: string
  players: Player[]
  playerCount: number
  questionIndex: number
}

export type Lobby = LobbyBase & {
  _id: string
  gameId: string
  createdBy: string
  started: string
  ended: string
}
