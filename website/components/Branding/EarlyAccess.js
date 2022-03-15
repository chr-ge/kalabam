import { useState } from 'react'
import NextLink from 'next/link'
import {
  Box,
  Button,
  Circle,
  Flex,
  Heading,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Spacer,
  Text,
} from '@chakra-ui/react'
import { HiOutlineMail, HiCheckCircle } from 'react-icons/hi'
import { useSaveEmail } from '../../lib/api-hooks'

export const EarlyAccess = () => {
  const [email, setEmail] = useState('')
  const [saveEmail, { isLoading, isError, isSuccess }] = useSaveEmail()

  const handleClick = async () => {
    try {
      await saveEmail({ email })
    } catch (err) {
      console.error(err.status)
    }
  }

  return (
    <Box as='section' mt='24'>
      <Flex
        maxW='5xl'
        mx={{ base: '4', md: '8', lg: 'auto' }}
        direction={{ base: 'column', md: 'row' }}
        rounded='md'
        boxShadow='md'
        bgGradient='linear(to-l, #FF0080, #7928CA)'
      >
        <Box w={{ base: '100%', md: '50%' }} p='8'>
          <Heading fontSize='3xl' mb='2' color='white'>
            Get early access to Kalabam
          </Heading>
          <Text color='gray.100' fontSize='sm'>
            Join the waitlist and be one of the first to try Kalabam.
          </Text>
          <InputGroup mt='4' mb='3'>
            <InputLeftElement pointerEvents='none'>
              <Circle bg={isSuccess && 'white'}>
                <Icon
                  as={isSuccess ? HiCheckCircle : HiOutlineMail}
                  color={isSuccess ? 'green.500' : 'white'}
                />
              </Circle>
            </InputLeftElement>
            <Input
              w='50%'
              color='white'
              type='email'
              placeholder='Your email'
              autoComplete='email'
              borderTopRightRadius='0'
              borderBottomRightRadius='0'
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={isError}
              _placeholder={{ color: 'white' }}
            />
            <Button
              px='8'
              color='#7928CA'
              aria-label='Sign me up'
              borderTopLeftRadius='0'
              borderBottomLeftRadius='0'
              onClick={handleClick}
              isLoading={isLoading}
              disabled={!email}
              _disabled={{ cursor: 'not-allowed' }}
            >
              Sign me up
            </Button>
          </InputGroup>
          <Text mr='1' fontSize='xs' color='gray.100'>
            We care about protecting your data. Here's our{' '}
            <NextLink href='/privacy' passHref>
              <Link fontSize='xs' color='purple.200'>
                Privacy Policy.
              </Link>
            </NextLink>
          </Text>
        </Box>
        <Spacer />
        <Box w={{ base: '100%', md: '40%' }} pos='relative'>
          <Image
            minH='100%'
            alt='Early Access Rocket'
            src='/images/early_access.svg'
            pos='absolute'
            inset='auto 0 0% auto'
            objectFit='cover'
            visibility={{ base: 'hidden', md: 'visible' }}
            draggable='false'
          />
        </Box>
      </Flex>
    </Box>
  )
}
