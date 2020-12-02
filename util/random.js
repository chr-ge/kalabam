export const generateGameCode = () => {
  const digits = Math.floor(100000 + Math.random() * 900000).toString()
  return digits.substring(0, 3) + ' ' + digits.substring(3, 6)
}
