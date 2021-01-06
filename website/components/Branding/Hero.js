import NextImage from 'next/image'
import { Box, Flex, Heading, Button, forwardRef, chakra } from '@chakra-ui/react'
import { ImArrowRight2 } from 'react-icons/im'
import { motion, isValidMotionProp } from 'framer-motion'
import { Link } from '../Link'

const HeroHeading = motion.custom(
  forwardRef((props, ref) => {
    const chakraProps = Object.fromEntries(Object.entries(props).filter(([key]) => !isValidMotionProp(key)))
    return <Heading ref={ref} {...chakraProps} />
  })
)

const Hero = () => {
  return (
    <Box>
      <Box bg='yellow.200'>
        <Flex
          maxW='5xl'
          pt={{ md: '6' }}
          mx={{ base: '4', md: '8', lg: 'auto' }}
          direction={{ base: 'column-reverse', md: 'row' }}
        >
          <Flex pt={{ base: '2', md: '16' }} w={{ md: '50%' }} direction='column'>
            <HeroHeading
              mb='6'
              fontSize={{ base: '5xl', md: '7xl' }}
              color='purple.600'
              // animation:
              initial='hidden'
              animate='visible'
              variants={{
                hidden: { scale: 0.8, opacity: 0 },
                visible: { scale: 1, opacity: 1, transition: { delay: 0.2 } }
              }}
            >
              Make your presentations
              <chakra.span bgClip='text' bgGradient='linear(to-l, #7928CA,#FF0080)'>fun</chakra.span>.
            </HeroHeading>
            <Button
              as={Link}
              href='/auth/signup'
              mb={{ base: '4', md: '0' }}
              w={{ base: '75%', md: '33%' }}
              textDecoration='none !important'
              aria-label='Sign up free'
              size='lg'
              colorScheme='pink'
              rightIcon={<ImArrowRight2 />}
            >
              Sign up free
            </Button>
          </Flex>
          <Flex
            w={{ md: '50%' }}
            h={{ base: '72', md: 'auto' }}
            mt={{ base: '2', md: '6' }}
            justify='flex-end'
            pos='relative'
          >
            <NextImage
              alt='Presentation'
              src='/images/presentation.svg'
              layout='fill'
              objectFit='contain'
            />
          </Flex>
        </Flex>
      </Box>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 140'>
        <path fill='#FAF089' fillOpacity='1' d='M0,128L288,128L576,64L864,64L1152,32L1440,128L1440,0L1152,0L864,0L576,0L288,0L0,0Z' />
      </svg>
    </Box>
  )
}

export default Hero
