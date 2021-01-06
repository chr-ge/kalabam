import NextImage from 'next/image'
import { Box, Flex, Icon, Spacer, Text } from '@chakra-ui/react'
import { ImCheckmark, ImCross } from 'react-icons/im'

const Answer = ({ answer, color, image, showResults }) => {
  const opacity = showResults && (!answer.isCorrect && 0.5)

  return (
    <Flex
      p='1'
      height='32'
      align='center'
      rounded='md'
      shadow='lg'
      bgColor='white'
    >
      <Box
        width='20%'
        height='100%'
        bgColor={color}
        rounded='md'
        pos='relative'
        opacity={opacity}
      >
        <NextImage src={image} layout='fill' objectFit='cover' />
      </Box>
      <Text
        mx='5'
        fontSize='2xl'
        overflowWrap='break-word'
        wordBreak='break-word'
        textOverflow='ellipsis'
        whiteSpace='pre-line'
        opacity={opacity}
      >
        {answer.answer}
      </Text>
      <Spacer />
      {showResults && (
        answer.isCorrect
          ? <Icon as={ImCheckmark} boxSize='12' color='green.500' mr='4' />
          : <Icon as={ImCross} boxSize='10' color='red.500' mr='4' />
      )}
    </Flex>
  )
}

export default Answer
