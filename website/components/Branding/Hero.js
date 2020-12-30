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
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
        <path fill='#FAF089' fill-opacity='1' d='M0,192L34.3,176C68.6,160,137,128,206,101.3C274.3,75,343,53,411,74.7C480,96,549,160,617,165.3C685.7,171,754,117,823,106.7C891.4,96,960,128,1029,149.3C1097.1,171,1166,181,1234,165.3C1302.9,149,1371,107,1406,85.3L1440,64L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z' />
      </svg>
    </Box>
  )
}

export default Hero
