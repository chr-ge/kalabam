import { Box, Circle, Heading, Icon, SimpleGrid, Text } from '@chakra-ui/react'
import { FcGraduationCap, FcBusinessman, FcBusinesswoman } from 'react-icons/fc'

const Accounts = () => (
  <Box mt='4'>
    <SimpleGrid columns={[1, 1, 3]} spacing={8} maxW='5xl' mx={{ base: '4', md: '8', lg: 'auto' }}>
      <Box bg='teal.200' p='6' rounded='md' align='center'>
        <Heading color='teal.800' fontSize='2xl'>Students and Teachers</Heading>
        <Text my='4'>Make class activities interesting for any subject.</Text>
        <Circle bg='teal.100'>
          <Icon as={FcGraduationCap} boxSize='40' />
        </Circle>
      </Box>
      <Box bg='pink.200' p='6' rounded='md' align='center'>
        <Heading color='pink.800' fontSize='2xl'>Professionals</Heading>
        <Text my='4'>Turn your work presentation into an interactive one.</Text>
        <Circle bg='pink.100'>
          <Icon as={FcBusinessman} boxSize='40' />
        </Circle>
      </Box>
      <Box bg='purple.200' p='6' rounded='md' align='center'>
        <Heading color='purple.800' fontSize='2xl'>Individuals</Heading>
        <Text my='4'>Create games to your hearts desire and play with your friends.</Text>
        <Circle bg='purple.100'>
          <Icon as={FcBusinesswoman} boxSize='40' />
        </Circle>
      </Box>
    </SimpleGrid>
  </Box>
)

export default Accounts
