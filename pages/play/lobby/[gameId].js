import { useEffect } from 'react'
import { getSession } from 'next-auth/client'
import { Button, Flex, Heading, Icon, Skeleton, Tag } from '@chakra-ui/react'
import { FaRegUserCircle, FaPlayCircle } from 'react-icons/fa'
import Layout from '../../../components/Layout'
import { useCreateLobby } from '../../../lib/api-hooks'

function Play ({ gameId }) {
  const [createLobby, { isLoading, data }] = useCreateLobby()

  useEffect(() => {
    const request = async () => {
      try {
        await createLobby({ gameId })
      } catch (err) {
        global.alert(err)
      }
    }
    request()
  }, [gameId])

  return (
    <Layout title='My Games'>
      <Flex h='100%' direction='column'>
        <Flex
          h='44' bg='purple.400' align='center' justify='center'
          borderBottomColor='purple.500'
          borderBottomWidth='thick'
        >
          <Heading p='6' bg='yellow.100' color='blue.800' fontSize='5xl'>Game Code:</Heading>
          <Skeleton startColor='teal.100' endColor='teal.300' speed={0.7} isLoaded={!isLoading}>
            <Heading p='6' bg='teal.200' fontSize='6xl'>{data ? data.data.gameCode : '000 000'}</Heading>
          </Skeleton>
        </Flex>
        <Flex flex={1} align='center' bg='lightPink' direction='column'>
          <Flex p='4' justify='space-between' w='100%'>
            <Tag px='3' colorScheme='teal' fontSize='2xl'>
              <Icon as={FaRegUserCircle} mr='2' />
              {0}
            </Tag>
            <Button rightIcon={<FaPlayCircle />} colorScheme='green' isDisabled>Start</Button>
          </Flex>
          <Heading mt='40' py='4' px='8' bg='white' rounded='md' boxShadow='2xl'>
            Waiting for players...
          </Heading>
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
