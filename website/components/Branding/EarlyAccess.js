import { useState } from 'react'
import { Box, Flex, Heading, Icon, Image, InputGroup, Input, InputLeftElement, Button, Text, Spacer } from '@chakra-ui/react'
import { HiOutlineMail } from 'react-icons/hi'
import { useSaveEmail } from '../../lib/api-hooks'
import { Link } from '../Link'

const EarlyAccess = () => {
  const [email, setEmail] = useState('')
  const [saveEmail, { isLoading }] = useSaveEmail()

  const handleClick = () => {
    try {
      saveEmail({ email })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Box>
      <Flex
        maxW='5xl'
        mx={{ base: '2', md: '8', lg: 'auto' }}
        direction={{ base: 'column', md: 'row' }}
        rounded='md'
        boxShadow='md'
        bgGradient='linear(to-l, #FF0080, #7928CA)'
      >
        <Box w={{ base: '100%', md: '50%' }} p='8'>
          <Heading fontSize='3xl' mb='2' color='white'>Get early access to Kalabam</Heading>
          <Text color='gray.100' fontSize='sm'>
            Join the waitlist and be one of the first to try Kalabam.
          </Text>
          <InputGroup mt='4' mb='3'>
            <InputLeftElement pointerEvents='none'>
              <Icon as={HiOutlineMail} color='white' />
            </InputLeftElement>
            <Input
              w='50%'
              color='white'
              type='email'
              placeholder='Your email'
              borderTopRightRadius='0'
              borderBottomRightRadius='0'
              onChange={(e) => setEmail(e.target.value)}
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
            We care about protecting your data. Here's our
            <Link href='/privacy' fontSize='xs' color='purple.200'> Privacy Policy.</Link>
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
          />
        </Box>
      </Flex>
    </Box>
  )
}

export default EarlyAccess
