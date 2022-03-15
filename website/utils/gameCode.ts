export function generateGameCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export function formatGameCode(gameCode: string): string {
  return gameCode.substring(0, 3) + ' ' + gameCode.substring(3, 6)
}
