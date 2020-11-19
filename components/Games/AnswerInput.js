import { useState } from 'react'
import { Center, Flex, IconButton, Textarea, Text } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import { motion } from 'framer-motion'

const MotionIconButton = motion.custom(IconButton)
const bounceTransition = {
  y: {
    duration: 0.3,
    yoyo: 2,
    ease: 'easeOut',
    delay: 10
  }
}

const AnswerInput = ({ answer }) => {
  const [chars, setChars] = useState(0)
  const [toggle, setToggle] = useState(false)

  const handleToggle = () => {
    setToggle((prev) => !prev)
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
      <Center width='15%' height='100%' bgColor={answer.color} rounded='md'>
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
        placeholder={`Add Answer ${answer.id}`}
        variant='unstyled'
        mx='2'
        fontSize='lg'
        overflowWrap='break-word'
        wordBreak='break-word'
        textOverflow='ellipsis'
        whiteSpace='pre-line'
        onChange={(e) => setChars(e.target.value)}
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