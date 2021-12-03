import { Box, Flex, SimpleGrid, Stack, Skeleton } from '@chakra-ui/react'

const GameLoading = () => (
  <Flex direction={{ base: 'column', md: 'row' }} bgColor='lightPink' h='100%'>
    <Flex direction='column' h='100%' bgColor='gray.100'>
      <Stack
        w={{ base: '100%', md: '48', xl: '52' }}
        direction={{ base: 'row', md: 'column' }}
        align='stretch'
        overflowY='auto'
        maxH='calc(100vh - 7.3rem)'
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <Skeleton key={n} minH='32' w={{ base: '48', xl: '52' }} />
        ))}
      </Stack>
    </Flex>
    <Box flex={1} p='10'>
      <Skeleton h='28' rounded='md' />
      <Flex py='16' justify='space-evenly'>
        <Skeleton h='64' w='40%' />
        <Skeleton h='64' w={{ base: '50%', xl: '30%' }} />
      </Flex>
      <SimpleGrid columns={[1, 1, 2]} spacing={4}>
        {[1, 2, 3, 4].map((n) => (
          <Skeleton key={n} height='110px' rounded='md' shadow='lg' />
        ))}
      </SimpleGrid>
    </Box>
  </Flex>
)

export default GameLoading
