import { Badge, Flex, Link, Spacer, Text } from '@chakra-ui/react'
import { formatDateTime } from '../../utils/format'

export const ReportRow = ({ report }) => (
  <Link
    w='100%'
    mt='2'
    p='2'
    border='1px'
    borderColor='purple.100'
    href={`/reports/${report._id}`}
    _hover={{ bg: 'purple.50', borderColor: 'purple.200' }}
    _focus={{ boxShadow: 'purple' }}
  >
    <Flex align='center'>
      <Text mb='1' fontSize='lg' fontWeight='bold'>
        {formatDateTime(report.created)}
      </Text>
      <Spacer />
      {report.ended && (
        <Badge variant='outline' colorScheme='green'>
          Completed
        </Badge>
      )}
    </Flex>
    <Text>{report.game.title}</Text>
  </Link>
)
