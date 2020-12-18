import { Box, Flex, Text } from '@chakra-ui/react'

const Answer = ({ answer, color }) => (
  <Flex
    p='1'
    height='110px'
    align='center'
    rounded='md'
    shadow='lg'
    bgColor='white'
  >
    <Box width='15%' height='100%' bgColor={color} rounded='md' />
    <Text
      mx='2'
      fontSize='2xl'
      overflowWrap='break-word'
      wordBreak='break-word'
      textOverflow='ellipsis'
      whiteSpace='pre-line'
    >
      {answer}
    </Text>
  </Flex>
)

export default Answer
