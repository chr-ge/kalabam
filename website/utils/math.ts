export const calculateAverageAccuracy = (answers: any[]): number => {
  const correct = answers.filter((a) => a.isCorrect).length
  return Math.round((correct / answers.length + Number.EPSILON) * 100) / 100
}

export const calculateAveragePlayerAccuracy = (
  questions: any[],
  playerId: string
): number => {
  const playerAnswers = questions.map((q) =>
    q.answers.filter((a) => a.id === playerId)
  )
  // The flat method is not yet implemented in common browsers. It’s an experimental feature.
  const flatPlayerAnswers = [].concat(...playerAnswers)
  const correctAnswers = flatPlayerAnswers.filter((a) => a.isCorrect).length
  return (
    Math.round(
      (correctAnswers / flatPlayerAnswers.length + Number.EPSILON) * 100
    ) / 100
  )
}
