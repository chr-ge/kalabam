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
  Stack,
  FormLabel,
  Input,
  Tag,
  Textarea
} from '@chakra-ui/react'
import { IoMdSettings, IoIosCheckmarkCircle } from 'react-icons/io'
import { useGameContext } from '../../contexts/Game/GameContext'

const GameSettingsDrawer = ({ isOpen, onOpen, onClose }) => {
  const titleField = useRef()
  const { title, description, updateGameSettings } = useGameContext()
  const [settings, setSettings] = useState({ title, description })

  useEffect(() => {
    if (title) {
      setSettings({ title, description })
    }
  }, [title])

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
              icon={<IoMdSettings size='18' />}
              onClick={onOpen}
            />
          </ButtonGroup>
          )
        : (
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
              <Stack spacing='24px'>
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
                      setSettings({ ...settings, title: e.target.value })}
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
                    minH='150px'
                    maxH='250px'
                    id='description'
                    borderColor='gray.200'
                    focusBorderColor='teal.200'
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
