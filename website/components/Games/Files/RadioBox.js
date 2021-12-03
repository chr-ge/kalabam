import { Box, useRadio } from '@chakra-ui/react'

const RadioBox = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)
  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='thin'
        borderRadius='md'
        boxShadow='md'
        _checked={{
          bg: 'teal.400',
          color: 'white',
          borderColor: 'teal.200',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={3}
        py={2}
      >
        {props.children}
      </Box>
    </Box>
  )
}

export default RadioBox
