import { useQuery, useMutation, queryCache } from 'react-query'

const defaultQueryFn = async (input, init) => {
  const res = await global.fetch(input, init)
  if (res.status >= 300) {
    throw res.json()
  }
  return await res.json()
}

export function useGames () {
  return useQuery('/api/games', defaultQueryFn)
}

export function useAddGame () {
  const addGame = (body) => {
    return defaultQueryFn('/api/games', {
      method: 'POST',
      body: JSON.stringify(body)
    })
  }

  return useMutation(addGame, {
    throwOnError: true,
    onSuccess: () => {
      queryCache.invalidateQueries('/api/games')
    }
  })
}

export function useEditGame (gameId) {
  const editGame = (body) => {
    return defaultQueryFn(`/api/games/${gameId}`, {
      method: 'PUT',
      body: JSON.stringify(body)
    })
  }

  return useMutation(editGame, {
    throwOnError: true,
    onSuccess () {
      queryCache.invalidateQueries(`/api/games/${gameId}`)
      queryCache.invalidateQueries('/api/games')
    }
  })
}

export function useDeleteGame (gameId) {
  const deleteGame = () => {
    return defaultQueryFn(`/api/games/${gameId}`, {
      method: 'DELETE'
    })
  }

  return useMutation(deleteGame, {
    throwOnError: true,
    onSuccess () {
      queryCache.invalidateQueries(`/api/games/${gameId}`)
      queryCache.invalidateQueries('/api/games')
    }
  })
}
