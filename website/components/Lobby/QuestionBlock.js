import { useEffect } from 'react'
import { Box, Button, Circle, Flex, Text, SimpleGrid, Spacer } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { useCounter } from '../../lib/hooks'
import Answer from './Answer'

const QuestionBlock = ({ question, questionIndex, setQuestionIndex }) => {
  const [counter, setCounter] = useCounter(question.timeLimit)

  useEffect(() => {
    setCounter(question.timeLimit)
  }, [question])

  const handleSkipClick = () => {
    setQuestionIndex(questionIndex + 1)
  }

  const handleNextClick = () => {
    setQuestionIndex(questionIndex + 1)
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
        <Flex my='16'>
          <Circle bg='teal.100' w='10%'>
            <Text fontSize='3xl'>{counter}</Text>
          </Circle>
          <Spacer />
          {counter === 0
            ? (
              <Button
                aria-label='Next'
                colorScheme='blue'
                onClick={handleNextClick}
                rightIcon={<ArrowForwardIcon />}
              >
                Next
              </Button>
              )
            : (
              <Button aria-label='Skip' colorScheme='blue' onClick={handleSkipClick}>
                Skip
              </Button>
              )}
        </Flex>
        <SimpleGrid columns={[1, 1, 2]} spacing={4}>
          {question.answers.map(({ id, answer, color }) => <Answer key={id} answer={answer} color={color} />)}
        </SimpleGrid>
      </Box>
      <Flex py='4' px='12'>
        <Text>{`${questionIndex + 1} of ${3}`}</Text>
        <Spacer />
        <Text fontWeight='bold' color='blue.800'>Kalabam</Text>
      </Flex>
    </Flex>
  )
}

export default QuestionBlock
