import { getSession } from 'next-auth/client'
import { Box, Divider, Flex, Icon, SimpleGrid, Skeleton, Spacer, Spinner, Stack, Text } from '@chakra-ui/react'
import { ImUsers } from 'react-icons/im'
import { FaQuestionCircle } from 'react-icons/fa'
import { MdTimer } from 'react-icons/md'
import dayjs from 'dayjs'
import { useReportById } from '../../lib/api-hooks'
import { ReportButtons } from '../../components/Reports'
import Layout from '../../components/Layout'

const calculateCorrectPercent = (answers) => {
  // eslint-disable-next-line no-sequences
  const data = answers.reduce((acc, { isCorrect }) => ((acc[isCorrect] = (acc[isCorrect] || 0) + 1), acc), {})
  return (100 * data.true || 0) / answers.length
}

const Report = ({ lobbyId, name }) => {
  const { isLoading, data } = useReportById(lobbyId)
  const startTime = !isLoading && dayjs(data.started)
  const endTime = !isLoading && dayjs(data.ended)
  
  return (
    <Layout title={`${data ? data.game.title : 'Game'} Report | Kalabam`} bg='lightPink'>
      <Box h='100%' p='8'>
        <Flex direction={{ base: 'column', sm: 'row' }}>
          <Box>
            <Text fontSize='xl'>Report</Text>
            <Text fontSize='4xl'>Cool Beans Man!</Text>
            <Flex align='center'>
              <Text fontSize='lg'>Time</Text>
              <Icon as={MdTimer} ml='1' boxSize='6' color='orange.500' />
              {isLoading
                ? <Spinner ml='2' size='xs' label='Loading...' speed='1s' />
                : <Text fontSize='lg'>: {endTime.diff(startTime)}</Text>}
            </Flex>
          </Box>
          <Spacer />
          <Flex mt={{ base: '6', sm: '0' }}>
            <Box w='100%' ml={{ sm: '4' }} p='1' boxShadow='md' rounded='md' bg='white'>
              <Flex direction='column' py='5' px='8' borderWidth='thick' borderColor='pink.200' rounded='md'>
                <Text mb='2' fontSize='lg'>Live Game</Text>
                <Divider />
                {isLoading
                  ? <Skeleton h='27px' my='2' />
                  : <Text my='2' fontSize='lg'>{dayjs(data.created).format('MMM D YYYY, h:mm a')}</Text>}
                <Divider />
                <Text mt='2' fontSize='lg'>Hosted by {name}</Text>
              </Flex>
            </Box>
            <ReportButtons gameId={data && data.game._id} isDisabled={isLoading} />
          </Flex>
        </Flex>
        <Flex mt='8' direction={{ base: 'column', lg: 'row' }}>
          <Stack w={{ base: '100%', lg: '50%' }} p='4' mr='4' h='100%' boxShadow='md' rounded='md' bg='white'>
            <Flex w='100%' p='2' align='center' bg='purple.100'>
              <Text fontSize='xl'>Players</Text>
              <Spacer />
              <Icon as={ImUsers} boxSize='6' color='purple.800' />
            </Flex>
            <SimpleGrid w='100%' px='2' py='1' columns={3} bg='purple.200' mt='0 !important'>
              <Text fontSize='sm' casing='uppercase'>Name</Text>
              <Text fontSize='sm' casing='uppercase' align='center'>Correct Answers</Text>
              <Text fontSize='sm' casing='uppercase' align='right'>Final Score</Text>
            </SimpleGrid>
            <Stack>
              {isLoading
                ? [1, 2, 3, 4, 5].map((n) => <Skeleton key={n} mt='2' h='10' />)
                : data.questions.map((q) => (
                  <SimpleGrid
                    key={q._id}
                    p='2'
                    mt='2'
                    columns={3}
                    border='1px'
                    borderColor='purple.100'
                  >
                    <Text>{q.question}</Text>
                    <Text align='center'>Quiz</Text>
                    <Text align='right'>50%</Text>
                  </SimpleGrid>
                ))}
            </Stack>
          </Stack>
          <Stack
            p='4'
            w={{ base: '100%', lg: '50%' }}
            ml={{ lg: '4' }}
            mt={{ base: '6', lg: '0' }}
            boxShadow='md'
            rounded='md'
            bg='white'
          >
            <Flex w='100%' p='2' align='center' bg='teal.100'>
              <Text fontSize='xl'>Questions</Text>
              <Text ml='2' fontSize='lg'>{!isLoading && `(${data.questions.length})`}</Text>
              <Spacer />
              <Icon as={FaQuestionCircle} boxSize='6' color='teal.800' />
            </Flex>
            <SimpleGrid w='100%' px='2' py='1' columns={3} bg='teal.200' mt='0 !important'>
              <Text fontSize='sm' casing='uppercase'>Question</Text>
              <Text fontSize='sm' casing='uppercase' align='center'>Type</Text>
              <Text fontSize='sm' casing='uppercase' align='right'>Answered Correctly</Text>
            </SimpleGrid>
            <Stack>
              {isLoading
                ? [1, 2, 3, 4, 5].map((n) => <Skeleton key={n} mt='2' h='10' />)
                : data.questions.map((q) => (
                  <SimpleGrid
                    key={q._id}
                    p='2'
                    mt='2'
                    columns={3}
                    border='1px'
                    borderColor='teal.100'
                  >
                    <Text>{q.question}</Text>
                    <Text align='center'>Quiz</Text>
                    <Text align='right'>{calculateCorrectPercent(q.answers) + '%'}</Text>
                  </SimpleGrid>
                ))}
            </Stack>
          </Stack>
        </Flex>
      </Box>
    </Layout>
  )
}

export async function getServerSideProps (context) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false
      }
    }
  }

  return {
    props: {
      lobbyId: context.query.lobbyId,
      name: session.user.name
    }
  }
}

export default Report