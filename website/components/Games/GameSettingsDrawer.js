import { useState, useEffect, useRef } from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormLabel,
  Image,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Tag,
  Textarea,
} from '@chakra-ui/react'
import { IoMdSettings, IoIosCheckmarkCircle } from 'react-icons/io'
import { useGameContext } from '../../contexts/Game/GameContext'
import { FindImage } from './Files'

export const GameSettingsDrawer = ({ isOpen, onOpen, onClose }) => {
  const titleField = useRef()
  const { title, description, visibility, image, updateGameSettings } =
    useGameContext()
  const [settings, setSettings] = useState({ title, description, visibility })

  useEffect(() => {
    if (title) setSettings({ title, description, visibility })
  }, [title])

  const handleDone = () => {
    updateGameSettings({
      title: settings.title,
      description: settings.description,
      visibility: settings.visibility,
    })
    onClose()
  }

  return (
    <>
      {title ? (
        <ButtonGroup size='sm' isAttached colorScheme='pink'>
          <Box
            d='flex'
            alignItems='center'
            mr='-px'
            px='4'
            verticalAlign='middle'
            borderLeftRadius='md'
            border='1px'
            borderColor='pink.500'
            bgColor='white'
          >
            {title}
          </Box>
          <IconButton
            aria-label='Open Game Settings'
            borderLeftRadius='0'
            icon={<IoMdSettings size='18' />}
            onClick={onOpen}
          />
        </ButtonGroup>
      ) : (
        <Button
          leftIcon={<IoMdSettings size='18' />}
          colorScheme='pink'
          onClick={onOpen}
          size='sm'
          px='5'
        >
          Game Settings
        </Button>
      )}
      <Drawer
        isOpen={isOpen}
        placement='right'
        size='sm'
        initialFocusRef={titleField}
        onClose={onClose}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px' borderColor='gray.200'>
              <Tag fontSize='2xl' px='2' py='1' colorScheme='teal'>
                Game Settings
              </Tag>
            </DrawerHeader>
            <DrawerBody>
              <Stack spacing={6}>
                <Box>
                  <FormLabel htmlFor='title'>Title</FormLabel>
                  <Input
                    id='title'
                    ref={titleField}
                    value={settings.title}
                    placeholder='Enter game title...'
                    borderColor='gray.200'
                    focusBorderColor='teal.200'
                    onChange={(e) =>
                      setSettings({ ...settings, title: e.target.value })
                    }
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor='description'>
                    Description
                    <Box as='span' ml='2' fontWeight='normal' color='gray.500'>
                      (Optional)
                    </Box>
                  </FormLabel>
                  <Textarea
                    minH='150px'
                    maxH='250px'
                    id='description'
                    borderColor='gray.200'
                    focusBorderColor='teal.200'
                    value={settings.description}
                    onChange={(e) =>
                      setSettings({ ...settings, description: e.target.value })
                    }
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor='visibility'>Visibility</FormLabel>
                  <RadioGroup
                    onChange={(e) =>
                      setSettings({ ...settings, visibility: e })
                    }
                    value={settings.visibility}
                  >
                    <Stack direction='row' spacing={4}>
                      <Radio colorScheme='purple' value='0'>
                        Private
                      </Radio>
                      <Radio colorScheme='teal' value='1'>
                        Public
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Box>
                <Box>
                  <FormLabel htmlFor='image'>Game Image</FormLabel>
                  <Box
                    d='flex'
                    p='2'
                    borderColor='gray.200'
                    borderWidth='thin'
                    rounded='md'
                  >
                    <Box w='50%'>
                      <FindImage />
                      <Button colorScheme='blue'>Upload</Button>
                    </Box>
                    <Box w='50%'>
                      {image.src && (
                        <Image src={image.src} alt={image.alt} w='100%' />
                      )}
                    </Box>
                  </Box>
                </Box>
              </Stack>
            </DrawerBody>
            <DrawerFooter
              borderTopWidth='1px'
              borderColor='gray.200'
              justifyContent='center'
            >
              <Button
                mr={3}
                aria-label='Cancel'
                variant='outline'
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                aria-label='Done'
                colorScheme='green'
                onClick={handleDone}
                rightIcon={<IoIosCheckmarkCircle size='20' />}
              >
                Done
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}
