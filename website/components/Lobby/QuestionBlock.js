import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useEvent } from '@harelpls/use-pusher'
import { Box, Button, Circle, Flex, Text, SimpleGrid, Spacer } from '@chakra-ui/react'
import { ImArrowRight2 } from 'react-icons/im'
import { useCountDown } from '../../lib/hooks'
import { useSaveLobby } from '../../lib/api-hooks'
import { useLobbyContext } from '../../contexts/Lobby/LobbyContext'
import Answer from './Answer'
import ResultsChart from './ResultsChart'

const CHOICES = [
  { color: 'yellow.400', image: '/images/cylinder.png' },
  { color: 'pink.400', image: '/images/cube.png' },
  { color: 'purple.400', image: '/images/pyramid.png' },
  { color: 'teal.400', image: '/images/torus.png' }
]

const findCorrectAnswersIndex = (answers) => {
  // eslint-disable-next-line no-sequences
  return answers.reduce((acc, { isCorrect }, i) => (isCorrect && acc.push(i), acc), [])
}

const QuestionBlock = ({ question, questionCount, started }) => {
  const {
    presenceChannel, trigger, gameCode, players, playerCount, questionIndex, setQuestionIndex, reset
  } = useLobbyContext()
  const [count, setCount] = useCountDown(question.timeLimit)
  const [answers, setAnswers] = useState([])
  const router = useRouter()
  const [saveLobby] = useSaveLobby(gameCode)

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

  useEffect(async () => {
    if (showResults) {
      setCount(0)

      trigger('client-question-results', {
        data: {
          correctAnswerIndex
        }
      })

      const save = async () => {
        try {
          await saveLobby({
            question: {
              _id: question.id,
              question: question.question,
              answers
            }
          })
        } catch (err) {
          global.alert(err)
        }
      }
      save()
    }
  }, [showResults])

  useEvent(presenceChannel.channel, 'client-answer', (data, metadata) =>
    setAnswers((a) => [...a, { id: metadata.user_id, answer: data, isCorrect: correctAnswerIndex.includes(data) }])
  )

  const handleClick = async () => {
    if (questionIndex < questionCount - 1) {
      setAnswers([])
      setQuestionIndex(questionIndex + 1)
    } else {
      try {
        await saveLobby({ players, started, ended: new Date() })
        reset()
      } catch (err) {
        global.alert(err)
      }
      router.push('/dashboard')
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
        <Flex mt='14' mb='8' align='center'>
          <Circle bg='teal.100'>
            <Text fontSize='4xl' px='5' py='1'>{count}</Text>
          </Circle>
          <Spacer />
          <Button
            aria-label={`${timesUp ? 'Next' : 'Skip'} Question`}
            colorScheme='blue'
            onClick={handleClick}
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
        <SimpleGrid columns={[1, 1, 2]} spacing={6}>
          {question.answers.map((a, i) =>
            <Answer
              key={a.id}
              answer={a}
              color={CHOICES[i].color}
              image={CHOICES[i].image}
              showResults={showResults}
            />
          )}
        </SimpleGrid>
      </Box>
      <Flex py='4' px='12'>
        <Text fontSize='xl'>{`${questionIndex + 1} of ${questionCount}`}</Text>
        <Spacer />
        <Text fontSize='xl'>{`${answers.length} answered`}</Text>
        <Spacer />
        <Text fontSize='xl' fontWeight='bold' color='blue.800'>{gameCode}</Text>
      </Flex>
    </Flex>
  )
}

export default QuestionBlock
