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

const Question = ({ question }) => {
  const handleChange = (value) => {
    question.points = value
  }

  return (
    <Box flex='1' p='10'>
      <Text>{question.id}</Text>
      <Input
        py='14'
        placeholder='Click to start typing your question'
        onChange={(e) => (question.title = e.target.value)}
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
            <Text id='time_limit' mb='2'>
              Time Limit
            </Text>
            <Slider
              defaultValue={20}
              aria-labelledby='time_limit'
              onChange={(e) => (question.timeLimit = e.target.value)}
              colorScheme='pink'
              size='lg'
              min={5}
              max={60}
              step={5}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb p='4'>
                <Text fontSize='xs'>{question.timeLimit}s</Text>
              </SliderThumb>
            </Slider>
          </Box>
          <Box>
            <Text id='points' mb='2'>
              Points
            </Text>
            <Slider
              defaultValue={1000}
              aria-labelledby='points'
              onChange={handleChange}
              colorScheme='purple'
              size='lg'
              min={0}
              max={2000}
              step={500}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb p='4'>
                <Text fontSize='xs'>{question.points}</Text>
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
        {question.answers.map((a) => (
          <AnswerInput key={a.id} index={a.id} />
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default Question
