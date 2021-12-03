import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  InputLeftElement,
  InputGroup,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Stack,
  Skeleton,
  useBreakpointValue,
  useDisclosure,
  useRadioGroup,
  chakra,
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import Masonry from 'react-masonry-css'
import { useGameContext } from '../../../contexts/Game/GameContext'
import RadioBox from './RadioBox'
import styles from './FindImage.module.css'

const CATEGORIES = [
  'Animals',
  'Business',
  'Cars',
  'Cryptocurrency',
  'Food',
  'Landscape',
  'School',
  'Sports',
  'Weather',
  'Work',
]
const ORIENTATIONS = ['landscape', 'squarish', 'portrait']

const ChakraMasonry = chakra(Masonry)

const FindImage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [images, setImages] = useState([])
  const [category, setCategory] = useState('game')
  const [orientation, setOrientation] = useState('landscape')
  const { setGameImage } = useGameContext()
  const masonryColumns = useBreakpointValue({ base: 2, sm: 3, xl: 4 })

  useEffect(() => {
    const getImages = async () => {
      const unsplash = await global.fetch(
        `/api/unsplash?category=${category}&orientation=${orientation}`
      )
      const {
        response: { results },
      } = await unsplash.json()
      setImages(results)
    }
    getImages()
  }, [category, orientation])

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'orientation',
    defaultValue: 'landscape',
    onChange: setOrientation,
  })

  const handleSearch = (e) => {
    if (e.key === 'Enter') setCategory(e.target.value)
  }

  const handleClick = (image) => {
    setGameImage({
      src: image.urls.regular,
      alt: image.alt_description,
    })
    onClose()
  }

  return (
    <>
      <Button mr='2' colorScheme='pink' onClick={onOpen}>
        Find
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size='full'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Find a Game Image | Images by Unsplash</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              align='center'
              mb='6'
              direction={{ base: 'column', sm: 'row' }}
            >
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <Search2Icon color='gray.300' />
                </InputLeftElement>
                <Input
                  aria-label='Search'
                  placeholder='Search...'
                  focusBorderColor='teal.300'
                  onKeyPress={handleSearch}
                />
              </InputGroup>
              <Stack
                ml={{ sm: '4' }}
                mt={{ base: '4', sm: '0' }}
                direction='row'
                {...getRootProps()}
              >
                {ORIENTATIONS.map((value) => {
                  const radio = getRadioProps({ value })
                  return (
                    <RadioBox key={value} {...radio}>
                      {value}
                    </RadioBox>
                  )
                })}
              </Stack>
            </Flex>
            <Flex>
              <Stack w='64' mr='6' display={{ base: 'none', sm: 'flex' }}>
                {CATEGORIES.map((c) => (
                  <Button key={c} onClick={() => setCategory(c)} isFullWidth>
                    {c}
                  </Button>
                ))}
              </Stack>
              {!images.length && (
                <Box as='p' w='100%'>
                  No Images Found.
                </Box>
              )}
              <ChakraMasonry
                h={images.length && '2xl'}
                w='100%'
                d='flex'
                overflowY='scroll'
                breakpointCols={masonryColumns}
                columnClassName={styles.masonryGridColumn}
              >
                {images.map((image) => (
                  <Box
                    key={image.id}
                    className={styles.unsplashContainer}
                    pos='relative'
                  >
                    <Image
                      src={image.urls.small}
                      fallback={<Skeleton h='56' w='100%' />}
                      onClick={() => handleClick(image)}
                      alt={image.alt_description}
                      _hover={{ opacity: 0.8, cursor: 'pointer' }}
                    />
                    <Link
                      p='1'
                      className={styles.unsplashLink}
                      href={`https://unsplash.com/@${image.user.username}?utm_source=kalabam&utm_medium=referral`}
                      pos='absolute'
                      bg='gray.600'
                      opacity='0.8'
                      fontSize='sm'
                      bottom='0'
                      right='0'
                      _hover={{
                        color: 'gray.400',
                        textDecoration: 'underline',
                      }}
                      isExternal
                    >
                      {image.user.name}
                    </Link>
                  </Box>
                ))}
              </ChakraMasonry>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default FindImage
