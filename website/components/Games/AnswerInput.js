import { useState, useEffect } from 'react'
import { Center, Flex, IconButton, Text, Textarea } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import { motion } from 'framer-motion'

const MotionIconButton = motion.custom(IconButton)
const bounceTransition = {
  y: {
    duration: 0.3,
    repeat: 2,
    repeatType: 'mirror',
    ease: 'easeOut',
    delay: 10
  }
}

const AnswerInput = ({ answer, color }) => {
  const [chars, setChars] = useState(0)
  const [toggle, setToggle] = useState(answer.isCorrect)

  useEffect(() => {
    setToggle(answer.isCorrect)
  }, [answer])

  const handleToggle = () => {
    setToggle((prev) => !prev)
    answer.isCorrect = !answer.isCorrect
  }

  const hoverStyle = toggle ? 'transparent' : 'green.400'

  return (
    <Flex
      p='1'
      height='110px'
      align='center'
      rounded='md'
      shadow='lg'
      bgColor='white'
    >
      <Center width='15%' height='100%' bgColor={color} rounded='md'>
        <MotionIconButton
          aria-label='Toggle Correct Answer'
          icon={<CheckCircleIcon h='8' w='8' />}
          onClick={handleToggle}
          p='1'
          color={toggle ? 'green.400' : 'white'}
          bgColor={toggle ? 'white' : ''}
          variant='ghost'
          isRound
          _hover={{
            bgColor: hoverStyle
          }}
          transition={bounceTransition}
          animate={{
            y: ['5%', '-5%']
          }}
        />
      </Center>
      <Textarea
        mx='2'
        placeholder={`Add Answer ${answer.id}`}
        value={answer.answer}
        variant='unstyled'
        fontSize='lg'
        overflowWrap='break-word'
        wordBreak='break-word'
        textOverflow='ellipsis'
        whiteSpace='pre-line'
        onChange={(e) => {
          setChars(e.target.value)
          answer.answer = e.target.value
        }}
        maxLength={75}
        resize='none'
      />
      {chars.length > 0 && (
        <Text fontSize='sm' alignSelf='start'>
          {75 - (chars.length || 0)}
        </Text>
      )}
    </Flex>
  )
}

export default AnswerInput
