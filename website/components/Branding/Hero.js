import NextImage from 'next/image'
import { Box, Flex, Heading, Button } from '@chakra-ui/react'
import { ImArrowRight2 } from 'react-icons/im'
import { Link } from '../Link'

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
            <Heading fontSize={{ base: '5xl', md: '7xl' }} mb='6' color='purple.600'>Make your presentations fun.</Heading>
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
          <Flex w={{ md: '50%' }} h={{ base: '72', md: 'auto' }} mt={{ base: '2', md: '6' }} justify='flex-end' pos='relative'>
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
        <path fill='#FAF089' fill-opacity='1' d='M0,128L288,128L576,64L864,64L1152,32L1440,128L1440,0L1152,0L864,0L576,0L288,0L0,0Z' />
      </svg>
    </Box>
  )
}

export default Hero
