import type { GetServerSideProps, NextPage } from 'next'
import { useState, useEffect } from 'react'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Icon,
  IconButton,
  Skeleton,
  Tag,
  Tooltip,
} from '@chakra-ui/react'
import { LockIcon, UnlockIcon } from '@chakra-ui/icons'
import { FaRegUserCircle, FaPlayCircle } from 'react-icons/fa'
import { useCreateLobby, useSaveLobby } from '../../../lib/api-hooks'
import { formatGameCode } from '../../../utils/gameCode'
import { Layout } from '../../../components/Layout'
import { Players } from '../../../components/Lobby/Players'
import { useLobbyContext } from '../../../contexts/Lobby/LobbyContext'

interface PlayProps {
  gameId: string
}

const Play: NextPage<PlayProps> = ({ gameId }) => {
  const router = useRouter()
  const [createLobby, { isLoading: lobbyIsLoading, data }] = useCreateLobby()
  const [saveLobby, { isLoading: lockIsLoading }] = useSaveLobby(
    data && data.data
  )
  const [locked, setLocked] = useState(false)
  const { setGameCode, playerCount } = useLobbyContext()

  const lockMessage = locked
    ? 'Unlock to allow more players to join.'
    : 'Lock this game to prevent more players from joining.'

  useEffect(() => {
    const create = async () => {
      try {
        const { data } = await createLobby({ gameId })
        setGameCode(data)
      } catch (err) {
        global.alert(err)
      }
    }
    create()
  }, [])

  const onStartClick = (): void => {
    router.push(`/play/lobby/live/${gameId}`)
  }

  const onLockClick = async (): Promise<void> => {
    try {
      const res = await saveLobby({ locked: !locked })
      if (res.success) setLocked(!locked)
    } catch (err) {
      global.alert(err)
    }
  }

  return (
    <Layout title='Play Game | Kalabam' bg='lightPink'>
      <Flex direction='column'>
        <Flex
          py='8'
          px='2'
          h='48'
          bg='purple.400'
          justify='center'
          borderBottomColor='purple.500'
          borderBottomWidth='thick'
          direction={{ base: 'column', md: 'row' }}
        >
          <Flex
            h='100%'
            px='4'
            pt='1'
            pb='2'
            direction='column'
            justify='center'
            bg='yellow.100'
          >
            <Heading fontSize='4xl'>Join at</Heading>
            <Heading fontSize='4xl' color='blue.800'>
              play.kalabam.com
            </Heading>
          </Flex>
          <Skeleton
            h='100%'
            startColor='teal.100'
            endColor='teal.300'
            speed={0.7}
            isLoaded={!lobbyIsLoading}
          >
            <Flex px='8' h='100%' bg='teal.200' align='center' justify='center'>
              {locked ? (
                <LockIcon mx='8' fontSize={{ base: '4xl', lg: '5xl' }} />
              ) : (
                <Heading fontSize={{ base: '5xl', lg: '7xl' }}>
                  {data ? formatGameCode(data.data) : '000 000'}
                </Heading>
              )}
            </Flex>
          </Skeleton>
        </Flex>
        <Flex flex={1} align='center' direction='column'>
          <Flex p='4' justify='space-between' w='100%'>
            <Tag px='3' colorScheme='teal' fontSize='2xl'>
              <Icon as={FaRegUserCircle} mr='2' />
              {playerCount}
            </Tag>
            <ButtonGroup>
              <Tooltip
                aria-label={lockMessage}
                label={lockMessage}
                bg='gray.500'
                openDelay={200}
                placement='left'
                hasArrow
              >
                <IconButton
                  aria-label='Lock this game'
                  colorScheme='yellow'
                  icon={locked ? <LockIcon /> : <UnlockIcon />}
                  onClick={onLockClick}
                  isLoading={lockIsLoading}
                />
              </Tooltip>
              <Button
                rightIcon={<FaPlayCircle />}
                colorScheme='green'
                onClick={onStartClick}
                isDisabled={playerCount === 0}
              >
                Start
              </Button>
            </ButtonGroup>
          </Flex>
          {data ? (
            <Players />
          ) : (
            <Heading
              mt='40'
              py='4'
              px='8'
              bg='white'
              rounded='md'
              boxShadow='2xl'
            >
              Waiting for players...
            </Heading>
          )}
        </Flex>
      </Flex>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<PlayProps> = async (
  context
) => {
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
      gameId: context.query.gameId as string,
    },
  }
}

export default Play
