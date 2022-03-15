import { useState, useEffect, FC } from 'react'
import { Center, Flex, IconButton, Text, Textarea } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import { motion } from 'framer-motion'
import type { Answer } from '../../utils/types'

const MotionIconButton = motion(IconButton)
const bounceTransition = {
  y: {
    duration: 0.3,
    repeat: 2,
    repeatType: 'mirror',
    ease: 'easeOut',
    delay: 10,
  },
}

interface AnswerInputProps {
  answer: Answer
  color: string
}

export const AnswerInput: FC<AnswerInputProps> = ({ answer, color }) => {
  const [text, setText] = useState('')
  const [toggle, setToggle] = useState<boolean>(answer.isCorrect)

  useEffect(() => {
    setToggle(answer.isCorrect)
  }, [answer])

  const handleToggle = (): void => {
    setToggle((prev) => !prev)
    answer.isCorrect = !answer.isCorrect
  }

  const hoverStyle = toggle ? 'transparent' : 'green.400'

  return (
    <Flex
      p='1'
      h='110px'
      align='center'
      rounded='md'
      shadow='lg'
      bgColor='white'
    >
      <Center width='15%' h='100%' bgColor={color} rounded='md'>
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
            bgColor: hoverStyle,
          }}
          transition={bounceTransition}
          animate={{
            y: ['5%', '-5%'],
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
          setText(e.target.value)
          answer.answer = e.target.value
        }}
        maxLength={75}
        resize='none'
      />
      {text.length > 0 && (
        <Text fontSize='sm' alignSelf='start'>
          {75 - (text.length || 0)}
        </Text>
      )}
    </Flex>
  )
}
