import { useRouter } from 'next/router'
import { Flex, IconButton, Spacer, Tooltip } from '@chakra-ui/react'
import { ViewIcon, DeleteIcon } from '@chakra-ui/icons'
import { ImPrinter } from 'react-icons/im'
import { useDeleteReport } from '../../lib/api-hooks'

const ReportButtons = ({ lobbyId, gameId, isDisabled }) => {
  const router = useRouter()
  const [deleteReport, { isLoading }] = useDeleteReport(lobbyId)

  const handleDelete = async () => {
    if (!global.confirm('Are you sure?')) return
    const result = await deleteReport()
    if (result) router.push('/')
  }

  return (
    <Flex direction='column' ml='5'>
      <Tooltip
        py='1'
        label='View Game'
        aria-label='View Game'
        placement='left'
        openDelay={400}
        bg='gray.500'
        hasArrow
      >
        <IconButton
          size='sm'
          aria-label='View Game'
          colorScheme='purple'
          icon={<ViewIcon />}
          onClick={() => router.push(`/games/${gameId}`)}
          isDisabled={isDisabled}
        />
      </Tooltip>
      <Spacer />
      <Tooltip
        py='1'
        label='Print Report'
        aria-label='Print Report'
        placement='left'
        openDelay={400}
        bg='gray.500'
        hasArrow
      >
        <IconButton
          size='sm'
          aria-label='Print Report'
          colorScheme='blue'
          icon={<ImPrinter />}
          isDisabled
        />
      </Tooltip>
      <Spacer />
      <Tooltip
        py='1'
        label='Delete Report'
        aria-label='Delete Report'
        placement='left'
        openDelay={400}
        bg='gray.500'
        hasArrow
      >
        <IconButton
          size='sm'
          aria-label='Delete Report'
          colorScheme='red'
          icon={<DeleteIcon />}
          onClick={handleDelete}
          isDisabled={isDisabled}
          isLoading={isLoading}
        />
      </Tooltip>
    </Flex>
  )
}

export default ReportButtons
