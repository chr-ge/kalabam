import { useState, useEffect } from 'react'
import {
  Box,
  Center,
  Input,
  Flex,
  SimpleGrid,
  Stack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text
} from '@chakra-ui/react'
import AnswerInput from '../../components/Games/AnswerInput'
import { useGameContext } from '../../context/Game/GameContext'

const Question = ({ question }) => {
  const { updateQuestion } = useGameContext()
  const [q, setQ] = useState(question)

  useEffect(() => {
    setQ(question)
  }, [question])

  useEffect(() => {
    updateQuestion(q)
  }, [q])

  return (
    <Box flex={1} p='10'>
      <Input
        py='14'
        value={q.question}
        placeholder='Click to start typing your question'
        onChange={(e) => setQ({ ...q, question: e.target.value })}
        borderColor='gray.400'
        focusBorderColor='purple.400'
        textAlign='center'
        fontWeight='bold'
        bgColor='white'
        fontSize='2xl'
      />
      <Flex py='16' justify='space-evenly'>
        <Stack w='40%' justify='center'>
          <Box mb='5'>
            <Text id='time_limit' mb='2'>Time Limit</Text>
            <Slider
              value={q.timeLimit}
              aria-labelledby='time_limit'
              onChange={(val) => setQ({ ...q, timeLimit: val })}
              colorScheme='pink'
              size='lg'
              min={5}
              max={60}
              step={5}
            >
              <SliderTrack h='2'>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb p='4' h='10' w='10'>
                <Text fontSize='sm'>{q.timeLimit}s</Text>
              </SliderThumb>
            </Slider>
          </Box>
          <Box>
            <Text id='points' mb='2'>
              Points
            </Text>
            <Slider
              value={q.points}
              aria-labelledby='points'
              onChange={(val) => setQ({ ...q, points: val })}
              colorScheme='purple'
              size='lg'
              min={0}
              max={2000}
              step={500}
            >
              <SliderTrack h='2'>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb p='4' h='10' w='10'>
                <Text fontSize='sm'>{q.points}</Text>
              </SliderThumb>
            </Slider>
          </Box>
        </Stack>
        <Center
          w={{ base: '50%', xl: '30%' }}
          border='1px'
          borderColor='gray.400'
          borderStyle='dashed'
          height='250px'
          rounded='md'
        >
          <Text align='center'>Drag and drop image from your computer</Text>
        </Center>
      </Flex>
      <SimpleGrid columns={[1, 1, 2]} spacing={4}>
        {q.answers.map((a) => (
          <AnswerInput key={a.id} answer={a} />
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default Question