import { Box, Container, Flex, Heading, Text, Spacer, chakra } from '@chakra-ui/react'
import { Link } from '../Link'

const Footer = () => (
  <Box bg='gray.600' color='white'>
    <Container py='10' maxW='3xl'>
      <Flex direction={{ base: 'column', sm: 'row' }}>
        <Flex direction='column'>
          <Heading mb='1'>Kalabam</Heading>
          <Text flex={1}>Montreal, Canada 🍁</Text>
          <Text>© 2020 Kalabam </Text>
        </Flex>
        <Spacer />
        <Flex direction='column'>
          <Text mb='2' mt={{ base: '4', sm: '0' }} fontWeight='bold'>Company</Text>
          <Link href='/about'>About Us</Link>
          <Link href='/team'>Team</Link>
        </Flex>
        <Spacer />
        <Flex direction='column'>
          <Text mb='2' mt={{ base: '4', sm: '0' }} fontWeight='bold'>Community</Text>
          <Link href='https://www.reddit.com' isExternal>Reddit</Link>
          <Link href='https://github.com/chr-ge' isExternal>Github Discussions</Link>
        </Flex>
        <Spacer />
        <Flex direction='column'>
          <Text mb='2' mt={{ base: '4', sm: '0' }} fontWeight='bold'>Help</Text>
          <Link href='mailto:hello@kalabam.com'>Contact</Link>
          <chakra.a
            onClick={() => $crisp.push(['do', 'chat:open'])}
            _hover={{
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Get Support
          </chakra.a>
          <Link href='/tos'>Terms of Service</Link>
          <Link href='/privacy'>Privacy Policy</Link>
        </Flex>
      </Flex>
    </Container>
  </Box>
)

export default Footer
