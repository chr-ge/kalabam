import { useState, useEffect } from 'react'
import { getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { Box, Button, Flex, Heading, Icon, Skeleton, Tag } from '@chakra-ui/react'
import { FaRegUserCircle, FaPlayCircle } from 'react-icons/fa'
import { useCreateLobby } from '../../../lib/api-hooks'
import { formatGameCode } from '../../../util/gameCode'
import Layout from '../../../components/Layout'
import Players from '../../../components/Lobby/Players'

function Play ({ gameId }) {
  const router = useRouter()
  const [createLobby, { isLoading, data }] = useCreateLobby()
  const [playerCount, setPlayerCount] = useState(0)

  useEffect(() => {
    const create = async () => {
      try {
        await createLobby({ gameId })
      } catch (err) {
        global.alert(err)
      }
    }
    create()
  }, [])

  const onStartClick = () => {
    router.push(`/play/lobby/question/${gameId}`)
  }

  return (
    <Layout title='Play Game | Kalabam'>
      <Flex h='100%' direction='column'>
        <Flex
          h='44'
          bg='purple.400'
          align='center'
          justify='center'
          borderBottomColor='purple.500'
          borderBottomWidth='thick'
        >
          <Box h='28' px='6' py='3' bg='yellow.100'>
            <Heading fontSize='4xl'>Join at</Heading>
            <Heading fontSize='4xl' color='blue.800'>play.kalabam.com</Heading>
          </Box>
          <Skeleton startColor='teal.100' endColor='teal.300' speed={0.7} isLoaded={!isLoading}>
            <Heading h='28' px='8' py='3' bg='teal.200' fontSize={{ base: '5xl', lg: '7xl' }}>
              {data ? formatGameCode(data.data) : '000 000'}
            </Heading>
          </Skeleton>
        </Flex>
        <Flex flex={1} align='center' bg='lightPink' direction='column'>
          <Flex p='4' justify='space-between' w='100%'>
            <Tag px='3' colorScheme='teal' fontSize='2xl'>
              <Icon as={FaRegUserCircle} mr='2' />
              {playerCount}
            </Tag>
            <Button
              rightIcon={<FaPlayCircle />}
              colorScheme='green'
              onClick={onStartClick}
              // isDisabled={playerCount === 0}
            >
              Start
            </Button>
          </Flex>
          {data
            ? <Players gameCode={data.data} setPlayerCount={setPlayerCount} />
            : (
              <Heading mt='40' py='4' px='8' bg='white' rounded='md' boxShadow='2xl'>
                Waiting for players...
              </Heading>)}
        </Flex>
      </Flex>
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
      gameId: context.query.gameId
    }
  }
}

export default Play
