export const calculateAverageAccuracy = (answers) => {
  const correct = answers.filter((a) => a.isCorrect).length
  return Math.round((correct / answers.length + Number.EPSILON) * 100) / 100
}
