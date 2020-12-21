import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { ImCheckmark } from 'react-icons/im'

const calculateMostAnswers = (data) => data.reduce((acc, { answers }) => {
  return answers > acc ? answers : acc
}, 0)

const ResultsChart = ({ correct, answers, answersCount }) => {
  const VALUES = answers.reduce((acc, { answer }) => {
    return ((acc[answer] = (acc[answer] || 0) + 1), acc)
  }, {}
  )

  const data = [
    { color: 'yellow.500', answers: VALUES[0] || 0 },
    { color: 'purple.500', answers: VALUES[1] || 0 },
    { color: 'pink.500', answers: VALUES[2] || 0 },
    { color: 'teal.500', answers: VALUES[3] || 0 }
  ]

  const mostAnswers = calculateMostAnswers(data)
  const height = mostAnswers === 0 ? '36' : (Math.ceil(mostAnswers / 4) * 4) * 12

  return (
    <Flex h={height} maxW='2xl' mx='auto' mb='16' justify='space-between'>
      {data.filter((_, i) => i < answersCount).map(({ color, answers }, i) => (
        <Flex key={color} direction='column' justify='end' align='center'>
          <Flex align='center' justify='center'>
            {correct.includes(i) && <Icon as={ImCheckmark} color={color} mr='2' boxSize={6} />}
            <Text color={color} align='center' fontSize='5xl'>{answers}</Text>
          </Flex>
          <Box height={`${answers * 4}%`} bg={color} w='32' mt='2' _hover={{ opacity: 0.8 }} />
          <Box bg={color} h='6' w='32' mt='1' rounded='md' />
        </Flex>
      ))}
    </Flex>
  )
}

export default ResultsChart
