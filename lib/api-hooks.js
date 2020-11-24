import { useQuery, useMutation, queryCache } from 'react-query'
// import { Session, useSession } from "next-auth/client";

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
