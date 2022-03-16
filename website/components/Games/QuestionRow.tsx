import { FC, useState } from 'react'
import NextImage from 'next/image'
import { Box, Divider, Flex, Icon, Spacer, Tag, Text } from '@chakra-ui/react'
import { ImCheckmark, ImCross } from 'react-icons/im'
import type { Question } from '../../utils/types'

const COLORS = ['yellow.400', 'pink.400', 'purple.400', 'teal.400']

interface QuestionRowProps {
  question: Question
  index: number
}

export const QuestionRow: FC<QuestionRowProps> = ({ question, index }) => {
  const [open, setOpen] = useState(false)

  return (
    <Box
      bg='white'
      rounded='md'
      boxShadow='md'
      overflow='hidden'
      _hover={{ boxShadow: 'lg', cursor: 'pointer' }}
      onClick={() => setOpen(!open)}
    >
      <Flex>
        <Flex flex='1' px='4' pt='4' pb='3' direction='column'>
          <Flex mb='2' align='center'>
            <Text mr='2'>{`${index}. Quiz`}</Text>
            <Tag colorScheme='pink' size='sm'>
              {question.timeLimit + 's'}
            </Tag>
          </Flex>
          <Text fontSize='xl'>{question.question}</Text>
        </Flex>
        <Box w='25%' pos='relative'>
          {question.image && (
            <NextImage
              src={question.image}
              layout='fill'
              objectFit='cover'
              objectPosition='right center'
              alt={question.question}
              draggable='false'
              unoptimized
            />
          )}
        </Box>
      </Flex>
      {open && (
        <>
          <Divider />
          <Box p='4'>
            {question.answers.map(({ id, answer, isCorrect }) => (
              <Flex key={id} align='center' _hover={{ bg: 'gray.100' }}>
                <Flex>
                  <Box boxSize='6' bg={COLORS[id - 1]} />
                  <Text ml='3'>{answer}</Text>
                </Flex>
                <Spacer />
                <Icon
                  as={isCorrect ? ImCheckmark : ImCross}
                  color={isCorrect ? 'green.400' : 'red.400'}
                />
              </Flex>
            ))}
          </Box>
        </>
      )}
    </Box>
  )
}
