export const initialState = {
  title: '',
  description: '',
  questions: [
    {
      id: 1,
      question: '',
      timeLimit: 20,
      points: 1000,
      answers: [
        { id: 1, answer: '', color: 'tomato', isCorrect: false },
        { id: 2, answer: '', color: 'pink.400', isCorrect: false },
        { id: 3, answer: '', color: 'purple.400', isCorrect: false },
        { id: 4, answer: '', color: 'teal.400', isCorrect: false }
      ]
    }
  ],
  activeQuestion: {
    id: 1,
    question: '',
    timeLimit: 20,
    points: 1000,
    answers: [
      { id: 1, answer: '', color: 'tomato', isCorrect: false },
      { id: 2, answer: '', color: 'pink.400', isCorrect: false },
      { id: 3, answer: '', color: 'purple.400', isCorrect: false },
      { id: 4, answer: '', color: 'teal.400', isCorrect: false }
    ]
  }
}
