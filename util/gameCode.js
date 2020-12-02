export const generateGameCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export const formatGameCode = (gameCode) => {
  return gameCode.substring(0, 3) + ' ' + gameCode.substring(3, 6)
}
