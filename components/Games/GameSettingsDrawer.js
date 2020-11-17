import { useRef } from 'react'
import {
  Button,
  Box,
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
  Textarea,
  useDisclosure
} from '@chakra-ui/core'
import { SettingsIcon } from '@chakra-ui/icons'

const GameSettingsDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const titleField = useRef()

  return (
    <>
      <Button
        leftIcon={<SettingsIcon />}
        colorScheme='pink'
        onClick={onOpen}
        size='sm'
        px='5'
      >
        Game Settings
      </Button>
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
              Game Summary
            </DrawerHeader>
            <DrawerBody>
              <Stack spacing='24px'>
                <Box>
                  <FormLabel htmlFor='title'>Title</FormLabel>
                  <Input
                    ref={titleField}
                    id='title'
                    borderColor='gray.200'
                    placeholder='Enter game title...'
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor='description'>Description</FormLabel>
                  <Textarea id='description' borderColor='gray.200' />
                </Box>
              </Stack>
            </DrawerBody>
            <DrawerFooter borderTopWidth='1px' borderColor='gray.200'>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='green'>Done</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default GameSettingsDrawer
