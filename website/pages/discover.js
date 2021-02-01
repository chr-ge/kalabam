import { getPublicGames } from '../models/Game'
import NextImage from 'next/image'
import { useRouter } from 'next/router'
import {
  Box, Button, Flex, Heading, Icon, Menu, MenuButton, MenuList, MenuItem, SimpleGrid, Text, chakra
} from '@chakra-ui/react'
import { FaChevronDown, FaChevronUp, FaCheck } from 'react-icons/fa'
import Tilt from 'react-parallax-tilt'
import Layout from '../components/Layout'
import { Link } from '../components/Link'

const ChakraTilt = chakra(Tilt)

const Discover = ({ games }) => {
  const router = useRouter()
  const sortBy = router.query.sortBy
  const isAsc = sortBy === 'asc' || !sortBy

  return (
    <Layout title='Discover | Kalabam' bg='gray.100'>
      <Box py='8' bg='pink.100'>
        <Heading maxW='5xl' mx='auto' color='pink.800'>Discover Games</Heading>
      </Box>
      <Box maxW='5xl' mx='auto'>
        <Flex my='6' justify='flex-end' align='center'>
          <Text mr='2'>{games.length} games sorted by</Text>
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  isActive={isOpen}
                  as={Button}
                  colorScheme='yellow'
                  size='sm'
                  rightIcon={isOpen ? <FaChevronUp /> : <FaChevronDown />}
                >
                  {isAsc ? 'Newest' : 'Oldest'}
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() => router.replace({ pathname: '/discover', query: { sortBy: 'asc' } })}
                  >
                    Newest {isAsc && <Icon ml='2' color='teal.400' as={FaCheck} />}
                  </MenuItem>
                  <MenuItem
                    onClick={() => router.replace({ pathname: '/discover', query: { sortBy: 'desc' } })}
                  >
                    Oldest {!isAsc && <Icon ml='2' color='teal.400' as={FaCheck} />}
                  </MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
        </Flex>
        <SimpleGrid columns={{ base: 2, sm: 3, md: 5 }} spacing={6}>
          {games.map((game) => (
            <ChakraTilt key={game._id} scale={1.03} tiltMaxAngleX={10} tiltMaxAngleY={10} d='flex'>
              <Link
                w='100%'
                bg='white'
                href={`/games/${game._id}`}
                borderWidth='thin'
                borderColor='purple.200'
                textDecoration='none !important'
                rounded='sm'
                boxShadow='lg'
                _focus={{ boxShadow: 'purple' }}
                isExternal
              >
                <Box h='44' w='100%' pos='relative'>
                  <NextImage
                    layout='fill'
                    objectFit='cover'
                    src={game.image.src || '/images/game.png'}
                    alt={game.image.alt}
                  />
                </Box>
                <Text fontSize='lg' p='3'>{game.title}</Text>
              </Link>
            </ChakraTilt>
          ))}
        </SimpleGrid>
      </Box>
    </Layout>
  )
}

export async function getServerSideProps (context) {
  const sortBy = context.query.sortBy === 'desc' ? 1 : -1

  return {
    props: {
      games: JSON.parse(
        JSON.stringify(await getPublicGames(sortBy))
      )
    }
  }
}

export default Discover
