import { useState, useRef } from 'react'
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
  Stack,
  FormLabel,
  Input,
  Tag,
  Textarea,
  useDisclosure
} from '@chakra-ui/react'
import { IoMdSettings, IoIosCheckmarkCircle } from 'react-icons/io'
import { useGameCreate } from '../../context/Game/GameCreateContext'

const GameSettingsDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const titleField = useRef()

  const { title, description, updateGameSettings } = useGameCreate()

  const [settings, setSettings] = useState({
    title,
    description
  })

  const handleDone = () => {
    updateGameSettings({
      title: settings.title,
      description: settings.description
    })
    onClose()
  }

  return (
    <>
      {title
        ? (
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
              icon={<IoMdSettings />}
              onClick={onOpen}
            />
          </ButtonGroup>)
        : (
          <Button
            leftIcon={<IoMdSettings size='18' />}
            colorScheme='pink'
            onClick={onOpen}
            size='sm'
            px='5'
          >
            Game Settings
          </Button>)}
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
              <Stack spacing='24px'>
                <Box>
                  <FormLabel htmlFor='title'>Title</FormLabel>
                  <Input
                    ref={titleField}
                    id='title'
                    value={settings.title}
                    onChange={(e) =>
                      setSettings({ ...settings, title: e.target.value })}
                    borderColor='gray.200'
                    placeholder='Enter game title...'
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor='description'>
                    Description{' '}
                    <Box as='span' ml='1' fontWeight='normal' color='gray.500'>
                      (Optional)
                    </Box>
                  </FormLabel>
                  <Textarea
                    maxH='250px'
                    id='description'
                    borderColor='gray.200'
                    value={settings.description}
                    onChange={(e) =>
                      setSettings({ ...settings, description: e.target.value })}
                  />
                </Box>
              </Stack>
            </DrawerBody>
            <DrawerFooter
              borderTopWidth='1px'
              borderColor='gray.200'
              justifyContent='center'
            >
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                rightIcon={<IoIosCheckmarkCircle size='20' />}
                colorScheme='green'
                onClick={handleDone}
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

export default GameSettingsDrawer
