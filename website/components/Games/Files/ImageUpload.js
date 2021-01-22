import { useState, useEffect, useCallback, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import { Center, IconButton, Image, Text, Spinner, useToast } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { useGameContext } from '../../../contexts/Game/GameContext'

const ImageUpload = ({ question }) => {
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [previewFile, setPreviewFile] = useState()
  const { updateQuestion } = useGameContext()

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0]

    setPreviewFile(Object.assign(file, { preview: URL.createObjectURL(file) }))

    const filename = encodeURIComponent(file.name)
    setLoading(true)

    const res = await global.fetch(`/api/upload-url?file=${filename}`)
    const { post: { url, fields }, imageUrl } = await res.json()

    const formData = new global.FormData()
    Object.entries({ ...fields, file }).forEach(([key, value]) => { formData.append(key, value) })

    const upload = await global.fetch(url, { method: 'POST', body: formData })

    if (upload.ok) {
      console.info('Image uploaded successfully!')
      updateQuestion({ ...question, image: imageUrl })
    } else {
      console.error('Image upload failed.')
      toast({
        position: 'bottom-right',
        title: 'The image was not accepted.',
        description: 'Please try another image.',
        status: 'error',
        duration: 9000,
        isClosable: true
      })
      setPreviewFile()
    }
    setLoading(false)
  }, [question])

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png, image/gif',
    maxFiles: 1
  })

  const borderColor = useMemo(() => ({
    ...{ borderColor: 'gray.400' },
    ...(isDragAccept ? { borderColor: 'teal.400' } : {}),
    ...(isDragReject ? { borderColor: 'red.400' } : {})
  }), [isDragAccept, isDragReject])

  const handleDelete = () => {
    setPreviewFile()
    const q = question
    delete q.image
    updateQuestion(q)
  }

  useEffect(() => () => {
    // revoke the data uri to avoid memory leak
    if (previewFile) URL.revokeObjectURL(previewFile.preview)
  }, [previewFile])

  useEffect(() => {
    setPreviewFile(question.image && { preview: question.image })
  }, [question])

  return (
    <Center
      bg='gray.50'
      pos='relative'
      w={{ base: '50%', xl: '30%' }}
      borderWidth={2}
      borderStyle='dashed'
      height='250px'
      rounded='md'
      _active={{ borderColor: 'gray.600' }}
      {...borderColor}
      {...getRootProps()}
    >
      {loading
        ? <Spinner label='Loading...' color='purple.500' size='lg' thickness='3px' />
        : previewFile
          ? (
            <>
              <Image src={previewFile.preview} h='100%' objectFit='contain' alt={previewFile.name} />
              <IconButton
                aria-label='Delete question image'
                pos='absolute'
                right='0'
                bottom='0'
                m='2'
                colorScheme='red'
                size='xs'
                onClick={handleDelete}
                icon={<DeleteIcon />}
              />
            </>
            )
          : (
            <>
              <input {...getInputProps()} />
              <Text p='2' align='center'>
                {isDragActive ? 'Drop the image here ...' : "Drag 'n' drop an image here, or click to select one."}
              </Text>
            </>
            )}
    </Center>
  )
}

export default ImageUpload
