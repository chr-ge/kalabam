export const calculateAverageAccuracy = (answers) => {
  const correct = answers.filter((a) => a.isCorrect).length
  return Math.round((correct / answers.length + Number.EPSILON) * 100) / 100
}

export const calculateAveragePlayerAccuracy = (questions, playerId) => {
  const playerAnswers = questions.map((q) => q.answers.filter((a) => a.id === playerId)).flat()
  const correctAnswers = playerAnswers.filter((a) => a.isCorrect).length
  return Math.round((correctAnswers / playerAnswers.length + Number.EPSILON) * 100) / 100
}
