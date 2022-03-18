import type { FC } from 'react'
import NextLink from 'next/link'
import {
  Box,
  Container,
  Flex,
  Heading,
  Link,
  Text,
  Spacer,
} from '@chakra-ui/react'

export const Footer: FC = () => (
  <Box as='footer' bg='gray.600' color='white'>
    <Container py='12' maxW='3xl'>
      <Flex direction={{ base: 'column', sm: 'row' }}>
        <Flex direction='column'>
          <Heading as='p' mb='1' cursor='default'>
            Kalabam
          </Heading>
          <Text flex='1'>Montreal, Canada 🍁</Text>
          <Text>© {new Date().getFullYear()} Kalabam</Text>
        </Flex>
        <Spacer />
        <Flex direction='column'>
          <Text
            mb='2'
            mt={{ base: '4', sm: '0' }}
            fontWeight='bold'
            color='pink.200'
            letterSpacing='wide'
          >
            Company
          </Text>
          <Link href='https://chr-ge.com/?ref=kalabam.com' isExternal>
            About Us
          </Link>
          <Link
            href='https://github.com/chr-ge/kalabam/graphs/contributors'
            isExternal
          >
            Team
          </Link>
        </Flex>
        <Spacer />
        <Flex direction='column'>
          <Text
            mb='2'
            mt={{ base: '4', sm: '0' }}
            fontWeight='bold'
            color='pink.200'
            letterSpacing='wide'
          >
            Community
          </Text>
          <Link href='https://github.com/chr-ge/kalabam' isExternal>
            Github
          </Link>
          <Link href='https://www.reddit.com' isExternal>
            Reddit
          </Link>
        </Flex>
        <Spacer />
        <Flex direction='column'>
          <Text
            mb='2'
            mt={{ base: '4', sm: '0' }}
            fontWeight='bold'
            color='pink.200'
            letterSpacing='wide'
          >
            Help
          </Text>
          <Link href='mailto:hello@kalabam.com'>Contact</Link>
          <Link onClick={() => window.$crisp.push(['do', 'chat:open'])}>
            Get Support
          </Link>
          <NextLink href='/tos' passHref>
            <Link>Terms of Service</Link>
          </NextLink>
          <NextLink href='/privacy' passHref>
            <Link>Privacy Policy</Link>
          </NextLink>
        </Flex>
      </Flex>
    </Container>
  </Box>
)
