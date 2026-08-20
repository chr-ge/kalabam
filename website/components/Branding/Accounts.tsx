import type { FC } from 'react'
import { Box, Circle, Heading, Icon, SimpleGrid, Text } from '@chakra-ui/react'
import { FcGraduationCap, FcBusinessman, FcBusinesswoman } from 'react-icons/fc'
import Tilt from 'react-parallax-tilt'

export const Accounts: FC = () => (
  <Box as='section' mt='6'>
    <SimpleGrid
      columns={[1, 1, 3]}
      spacing={8}
      maxW='5xl'
      mx={{ base: '4', md: '8', lg: 'auto' }}
    >
      <Tilt
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <Box
          p='6'
          bg='teal.200'
          rounded='md'
          textAlign='center'
          _hover={{ boxShadow: '0px 5px #234E52 inset' }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <Heading color='teal.800' fontSize='2xl'>
            Classrooms
          </Heading>
          <Text my='4'>Turn lessons and reviews into live games that keep the whole class involved.</Text>
          <Circle bg='teal.100' style={{ transformStyle: 'preserve-3d' }}>
            <Icon
              as={FcGraduationCap}
              boxSize='40'
              transform='translateZ(20px)'
            />
          </Circle>
        </Box>
      </Tilt>
      <Tilt
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <Box
          p='6'
          bg='pink.200'
          rounded='md'
          textAlign='center'
          _hover={{ boxShadow: '0px 5px #702459 inset' }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <Heading color='pink.800' fontSize='2xl'>
            Teams
          </Heading>
          <Text my='4'>
            Add an interactive quiz to meetings, presentations, workshops, and team events.
          </Text>
          <Circle bg='pink.100' style={{ transformStyle: 'preserve-3d' }}>
            <Icon
              as={FcBusinessman}
              boxSize='40'
              transform='translateZ(20px)'
            />
          </Circle>
        </Box>
      </Tilt>
      <Tilt
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <Box
          p='6'
          bg='purple.200'
          rounded='md'
          textAlign='center'
          _hover={{ boxShadow: '0px 5px #44337A inset' }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <Heading color='purple.800' fontSize='2xl'>
            Friends
          </Heading>
          <Text my='4'>
            Create quizzes, challenges, and inside-joke games for your friends and see who comes out on top.
          </Text>
          <Circle bg='purple.100' style={{ transformStyle: 'preserve-3d' }}>
            <Icon
              as={FcBusinesswoman}
              boxSize='40'
              transform='translateZ(20px)'
            />
          </Circle>
        </Box>
      </Tilt>
    </SimpleGrid>
  </Box>
)
