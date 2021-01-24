import Image from 'next/image'
import { useRouter } from 'next/router'
import {
  Box, Button, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Tag, Text, Spacer, useToast
} from '@chakra-ui/react'
import { HiDotsVertical } from 'react-icons/hi'
import { InfoOutlineIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useDeleteGame } from '../../lib/api-hooks'

dayjs.extend(relativeTime)

const GameRow = ({ game }) => {
  const toast = useToast()
  const router = useRouter()
  const [deleteGame, { isLoading }] = useDeleteGame(game._id.toString())

  const handleDelete = async () => {
    if (!global.confirm('Are you sure?')) return

    const result = await deleteGame()
    if (result) {
      toast({
        title: 'Deleted Successfully.',
        description: 'Your game was deleted successfully.',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
    }
  }

  return (
    <Flex mt='2' p='1' border='1px' borderColor='blue.100'>
      <Box width='32' height='32' pos='relative'>
        <Image
          layout='fill'
          objectFit='cover'
          src={game.image.src || '/images/game.png'}
          alt={game.image.alt}
        />
      </Box>
      <Flex flex={1} p='2' direction='column'>
        <Text fontSize='lg'>{game.title}</Text>
        <Text fontSize='sm' pr={{ sm: '5' }} color='gray.600' noOfLines={2} isTruncated>
          {game.description}
        </Text>
        <Spacer />
        <Flex direction={{ base: 'column', sm: 'row' }}>
          <Tag colorScheme='purple'>
            {game.questionCount}
            {game.questionCount === 1 ? ' question' : ' questions'}
          </Tag>
          <Text ml='1' fontSize='sm'>• Created {dayjs(game.created).fromNow()}</Text>
        </Flex>
      </Flex>
      <Flex direction='column' justify='space-between'>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Toggle game options'
            icon={<HiDotsVertical />}
            isLoading={isLoading}
          />
          <MenuList>
            <MenuItem onClick={() => router.push(`/games/${game._id}`)}>
              <InfoOutlineIcon mr='2' />View
            </MenuItem>
            <MenuItem onClick={() => router.push(`/games/${game._id}/edit`)}>
              <EditIcon mr='2' />Edit
            </MenuItem>
            <MenuItem onClick={handleDelete}>
              <DeleteIcon mr='2' />Delete
            </MenuItem>
          </MenuList>
        </Menu>
        <Button
          colorScheme='green'
          onClick={() => router.push(`/play/lobby/${game._id.toString()}`)}
        >
          Play
        </Button>
      </Flex>
    </Flex>
  )
}

export default GameRow
