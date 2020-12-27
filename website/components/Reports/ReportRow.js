import { Badge, Flex, Link, Spacer, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'

const ReportRow = ({ report }) => (
  <Link
    w='100%'
    mt='2'
    p='2'
    border='1px'
    borderColor='purple.100'
    href={`/reports/${report._id}`}
    _hover={{ bg: 'purple.50', borderColor: 'purple.200' }}
  >
    <Flex align='center'>
      <Text mb='1' fontSize='lg' fontWeight='bold'>{dayjs(report.created).format('D MMMM YYYY')}</Text>
      <Spacer />
      {report.ended && <Badge variant='outline' colorScheme='green'>Completed</Badge>}
    </Flex>
    <Text>{report.game.title}</Text>
  </Link>
)

export default ReportRow
