import { useState, useEffect } from 'react'
import {
  Button, Flex, Image, Input, InputLeftElement, InputGroup, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalBody, ModalCloseButton, Stack, SimpleGrid, useDisclosure, useRadioGroup
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { useGameContext } from '../../../contexts/Game/GameContext'
import RadioBox from './RadioBox'

const CATEGORIES = [
  'Animals', 'Business', 'Cars', 'Cryptocurrency', 'Food', 'Landscape', 'School', 'Sports', 'Weather', 'Work'
]
const ORIENTATIONS = ['landscape', 'squarish', 'portrait']

const FindImage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [images, setImages] = useState([])
  const [category, setCategory] = useState('game')
  const [orientation, setOrientation] = useState('landscape')
  const { setGameImage } = useGameContext()

  useEffect(() => {
    const getImages = async () => {
      const unsplash = await global.fetch(`/api/unsplash?category=${category}&orientation=${orientation}`)
      const { response: { results } } = await unsplash.json()
      setImages(results)
    }
    getImages()
  }, [category, orientation])

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'orientation',
    defaultValue: 'landscape',
    onChange: setOrientation
  })

  const handleSearch = (e) => {
    if (e.key === 'Enter') setCategory(e.target.value)
  }

  const handleClick = (image) => {
    setGameImage({
      src: image.urls.regular,
      alt: image.alt_description
    })
    onClose()
  }

  return (
    <>
      <Button mr='2' colorScheme='pink' onClick={onOpen}>Find</Button>
      <Modal isOpen={isOpen} onClose={onClose} size='full'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Find a Game Image | Images by Unsplash</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex align='center' mb='6' direction={{ base: 'column', sm: 'row' }}>
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
              <Stack ml={{ sm: '4' }} mt={{ base: '4', sm: '0' }} direction='row' {...getRootProps()}>
                {ORIENTATIONS.map((value) => {
                  const radio = getRadioProps({ value })
                  return <RadioBox key={value} {...radio}>{value}</RadioBox>
                })}
              </Stack>
            </Flex>
            <Flex>
              <Stack w='64' mr='6' display={{ base: 'none', sm: 'flex' }}>
                {CATEGORIES.map((c) => (
                  <Button key={c} onClick={() => setCategory(c)} isFullWidth>{c}</Button>
                ))}
              </Stack>
              <SimpleGrid columns={{ base: '3', xl: '4' }} overflowY='scroll' h='2xl'>
                {images.map((image) => (
                  <Image
                    key={image.id}
                    src={image.urls.small}
                    onClick={() => handleClick(image)}
                    alt={image.alt_description}
                    title={`Photo by ${image.user.name}`}
                    _hover={{ opacity: 0.8, cursor: 'pointer' }}
                  />
                ))}
              </SimpleGrid>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default FindImage
