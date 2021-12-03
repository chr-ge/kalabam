import NextImage from 'next/image'
import { Box, Heading, Stack, Text, forwardRef } from '@chakra-ui/react'
import { motion, isValidMotionProp } from 'framer-motion'

const AnimatedBox = motion.custom(
  forwardRef((props, ref) => {
    const chakraProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => !isValidMotionProp(key))
    )
    return <Box ref={ref} {...chakraProps} />
  })
)

const HowItWorks = () => (
  <Box as='section' mt='24' maxW='5xl' mx={{ base: '4', md: '8', lg: 'auto' }}>
    <Heading
      as='h3'
      fontSize='5xl'
      bgGradient='linear(to-l, #7928CA,#FF0080)'
      bgClip='text'
      align='center'
    >
      How Kalabam works
    </Heading>
    <Stack spacing='4' mt='16' mb='4' direction={{ base: 'column', sm: 'row' }}>
      <AnimatedBox
        flex={1}
        pos='relative'
        align='center'
        bg='gray.100'
        whileHover={{
          y: 50,
          boxShadow:
            '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        }}
      >
        <NextImage
          src='/images/designer.svg'
          alt='person designing with a computer screen'
          height={250}
          width={250}
        />
        <Heading
          mb='3'
          bgGradient='linear(to-l, #F6E05E,#ED8936)'
          bgClip='text'
        >
          Create
        </Heading>
        <Text
          p='4'
          bg='white'
          borderWidth='thin'
          borderColor='gray.100'
          color='gray.600'
        >
          Build a game with multiple questions and answers. Make a quiz about
          anything in minutes.
        </Text>
      </AnimatedBox>
      <AnimatedBox
        flex={1}
        pos='relative'
        align='center'
        bg='gray.100'
        initial={{ y: 25 }}
        whileHover={{
          y: -25,
          boxShadow:
            '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        }}
      >
        <NextImage
          src='/images/team.svg'
          alt='two people presenting'
          height={250}
          width={250}
        />
        <Heading
          mb='3'
          bgGradient='linear(to-l, #7928CA,#FF0080)'
          bgClip='text'
        >
          Host
        </Heading>
        <Text
          p='4'
          bg='white'
          borderWidth='thin'
          borderColor='gray.100'
          color='gray.600'
        >
          Host a live game by sharing your screen or displaying the questions
          for everyone to see.
        </Text>
      </AnimatedBox>
      <AnimatedBox
        flex={1}
        pos='relative'
        align='center'
        bg='gray.100'
        whileHover={{
          y: 50,
          boxShadow:
            '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        }}
      >
        <NextImage
          src='/images/winner.svg'
          alt='Game winner'
          height={250}
          width={250}
        />
        <Heading
          mb='3'
          bgGradient='linear(to-l, #0BC5EA,#4FD1C5)'
          bgClip='text'
        >
          Play
        </Heading>
        <Text
          p='4'
          bg='white'
          borderWidth='thin'
          borderColor='gray.100'
          color='gray.600'
        >
          Ready! Join a game with a code provided by the host and answer
          questions on your device.
        </Text>
      </AnimatedBox>
    </Stack>
  </Box>
)

export default HowItWorks
