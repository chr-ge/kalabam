import Image from 'next/image'
import {
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tag,
  Text,
  Spacer,
  useToast
} from '@chakra-ui/react'
import { HiDotsVertical } from 'react-icons/hi'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Link } from '../Link'
import { useDeleteGame } from '../../lib/api-hooks'

dayjs.extend(relativeTime)

const GameRow = ({ game }) => {
  const [deleteGame, { isLoading }] = useDeleteGame(game._id.toString())
  const toast = useToast()

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
      <Image width={128} height={128} src={game.image || '/images/game.png'} />
      <Flex flex={1} p='2' direction='column'>
        <Text fontSize='lg'>{game.title}</Text>
        <Text fontSize='sm' pr='5' color='gray.600' noOfLines={2} isTruncated>
          {game.description}
        </Text>
        <Spacer />
        <Flex>
          <Tag colorScheme='purple'>
            {game.questionCount}{' '}
            {game.questionCount === 1 ? 'question' : 'questions'}
          </Tag>
          <Text ml='1' fontSize='sm'>
            • Created {dayjs(game.created).fromNow()}
          </Text>
        </Flex>
      </Flex>
      <Flex direction='column' justify='space-between'>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<HiDotsVertical />}
            isLoading={isLoading}
          />
          <MenuList>
            <MenuItem as={Link} href={`/games/${game._id}/edit`}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </MenuList>
        </Menu>
        <Button colorScheme='green'>Play</Button>
      </Flex>
    </Flex>
  )
}

export default GameRow
