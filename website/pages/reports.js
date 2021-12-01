import { useState } from 'react'
import { getSession } from 'next-auth/client'
import { getUserReports } from '../models/Reports'
import { useRouter } from 'next/router'
import {
  Badge,
  Container,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import dayjs from 'dayjs'
import Layout from '../components/Layout'

const Reports = ({ reports }) => {
  const router = useRouter()
  const [filter, setFilter] = useState('')

  return (
    <Layout title='My Reports | Kalabam' bg='gray.100'>
      <Container my='8' mx='auto' maxW='6xl'>
        <Flex align='center' mb='8' direction={{ base: 'column', md: 'row' }}>
          <Heading fontSize='3xl' alignSelf='start' color='purple.600'>
            My Reports
          </Heading>
          <Spacer />
          <InputGroup mt={{ base: 2, md: 0 }} w={{ base: '100%', md: '25%' }}>
            <InputLeftElement pointerEvents='none'>
              <Search2Icon color='gray.300' />
            </InputLeftElement>
            <Input
              bg='white'
              aria-label='Filter by Name'
              placeholder='Filter by Name'
              focusBorderColor='teal.300'
              onChange={(e) => setFilter(e.target.value)}
            />
          </InputGroup>
        </Flex>
        <Table colorScheme='purple'>
          <Thead>
            <Tr bg='purple.100'>
              <Th fontSize='md' color='purple.600'>
                Name
              </Th>
              <Th />
              <Th fontSize='md' color='purple.600'>
                Date
              </Th>
              <Th fontSize='md' color='purple.600'>
                Game Mode
              </Th>
              <Th fontSize='md' color='purple.600' isNumeric>
                No. of Players
              </Th>
              {/* isNumeric: Aligns the cell content to the right */}
            </Tr>
          </Thead>
          <Tbody bg='white'>
            {reports.length ? (
              reports
                .filter((report) =>
                  report.game.title.toLowerCase().includes(filter.toLowerCase())
                )
                .map((report) => (
                  <Tr
                    key={report._id}
                    onClick={() => router.push(`/reports/${report._id}`)}
                    cursor='pointer'
                    _hover={{ bg: 'purple.50' }}
                  >
                    <Td>{report.game.title}</Td>
                    <Td isNumeric>
                      {report.ended && (
                        <Badge variant='outline' colorScheme='green'>
                          Completed
                        </Badge>
                      )}
                    </Td>
                    <Td>
                      {dayjs(report.created).format('MMM D YYYY, h:mm a')}
                    </Td>
                    <Td>Live</Td>
                    <Td isNumeric>{report.players.length}</Td>
                  </Tr>
                ))
            ) : (
              <Tr>
                <Td colspan={5}>
                  <Flex justify='center'>You have no reports yet.</Flex>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Container>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    }
  }

  return {
    props: {
      reports: JSON.parse(
        JSON.stringify(await getUserReports(session.user.id))
      ),
    },
  }
}

export default Reports
