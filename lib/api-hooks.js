import { useMutation, queryCache } from 'react-query'
// import { Session, useSession } from "next-auth/client";

const defaultQueryFn = async (input, init) => {
  await global.fetch(input, init).then((res) => {
    if (res.status >= 300) {
      throw res.json()
    }
    return res.json()
  })
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
