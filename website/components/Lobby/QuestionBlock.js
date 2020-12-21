import { useState, useEffect } from 'react'
import { useEvent } from '@harelpls/use-pusher'
import { Box, Button, Circle, Flex, Text, SimpleGrid, Spacer } from '@chakra-ui/react'
import { ImArrowRight2 } from 'react-icons/im'
import { useCountDown } from '../../lib/hooks'
import { useLobbyContext } from '../../contexts/Lobby/LobbyContext'
import Answer from './Answer'
import ResultsChart from './ResultsChart'

const findCorrectAnswersIndex = (answers) => {
  // eslint-disable-next-line no-sequences
  return answers.reduce((acc, { isCorrect }, i) => (isCorrect && acc.push(i), acc), [])
}

const QuestionBlock = ({ question, questionCount }) => {
  const { presenceChannel, trigger, playerCount, questionIndex, setQuestionIndex } = useLobbyContext()
  const [count, setCount] = useCountDown(question.timeLimit)
  const [answers, setAnswers] = useState([])

  const timesUp = count === 0
  const showResults = timesUp || answers.length === playerCount
  const correctAnswerIndex = findCorrectAnswersIndex(question.answers)

  useEffect(() => {
    trigger('client-question', {
      data: {
        totalQuestions: questionCount,
        questionIndex: questionIndex + 1,
        timeLimit: question.timeLimit,
        answersCount: question.answers.length
      }
    })
  }, [question])

  useEffect(() => {
    if (showResults) {
      setCount(0)
      trigger('client-question-results', {
        data: {
          correctAnswerIndex
        }
      })
    }
  }, [showResults])

  useEvent(presenceChannel.channel, 'client-answer', (data, metadata) =>
    setAnswers((a) => [...a, { id: metadata.user_id, answer: data }])
  )

  const handleSkipClick = () => {
    if (questionIndex < questionCount - 1) {
      setAnswers([])
      setQuestionIndex(questionIndex + 1)
    }
  }

  const handleNextClick = () => {
    if (questionIndex < questionCount - 1) {
      setAnswers([])
      setQuestionIndex(questionIndex + 1)
    }
  }

  return (
    <Flex direction='column' h='100vh'>
      <Text
        py='4'
        fontSize='5xl'
        align='center'
        bg='white'
        borderBottomColor='gray.200'
        borderBottomWidth='thick'
      >
        {question.question}
      </Text>
      <Box flex={1} px='12' bg='lightPink'>
        <Flex mt='20' pb='10' align='center'>
          <Circle bg='teal.100' w='10%'>
            <Text fontSize='3xl'>{count}</Text>
          </Circle>
          <Spacer />
          <Button
            aria-label={`${timesUp ? 'Next' : 'Skip'} Question`}
            colorScheme='blue'
            onClick={timesUp ? handleNextClick : handleSkipClick}
            rightIcon={timesUp && <ImArrowRight2 />}
          >
            {timesUp ? 'Next' : 'Skip'}
          </Button>
        </Flex>
        {showResults && (
          <ResultsChart
            correct={correctAnswerIndex}
            answers={answers}
            answersCount={question.answers.length}
          />
        )}
        <SimpleGrid columns={[1, 1, 2]} spacing={4}>
          {question.answers.map((a) => <Answer key={a.id} answer={a} showResults={showResults} />)}
        </SimpleGrid>
      </Box>
      <Flex py='4' px='12'>
        <Text fontSize='xl'>{`${questionIndex + 1} of ${questionCount}`}</Text>
        <Spacer />
        <Text fontSize='xl'>{`${answers.length} answered`}</Text>
        <Spacer />
        <Text fontSize='xl' fontWeight='bold' color='blue.800'>Kalabam</Text>
      </Flex>
    </Flex>
  )
}

export default QuestionBlock
