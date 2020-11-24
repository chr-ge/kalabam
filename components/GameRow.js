import Image from 'next/image'
import { Button, Flex, Tag, Text, Spacer } from '@chakra-ui/react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

const GameRow = ({ game }) => {
  dayjs.extend(relativeTime)

  return (
    <Flex mt='2' p='1' border='1px' borderColor='blue.100'>
      <Image
        width={128}
        height={128}
        src={game.image || '/images/game.png'}
      />
      <Flex flex={1} p='2' direction='column'>
        <Text fontSize='lg'>{game.title}</Text>
        <Text fontSize='sm' color='gray.600' noOfLines={2} isTruncated>{game.description}</Text>
        <Spacer />
        <Flex>
          <Tag colorScheme='purple'>
            {game.questionCount}{' '}
            {game.questionCount === 1 ? 'question' : 'questions'}
          </Tag>
          <Text ml='1' fontSize='sm'>• Created {dayjs(game.created).fromNow()}</Text>
        </Flex>
      </Flex>
      <Flex direction='column' justify='flex-end'>
        <Button colorScheme='green' mb='2'>
          Play
        </Button>
        <Button colorScheme='blue'>Edit</Button>
      </Flex>
    </Flex>
  )
}

export default GameRow
