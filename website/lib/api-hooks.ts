import { useQuery, useMutation, queryCache } from 'react-query'

const defaultQueryFn = async (input: string, init) => {
  const res = await global.fetch(input, init)
  if (res.status >= 300) {
    throw res.status
  }
  return await res.json()
}

export function useGames() {
  return useQuery('/api/games', defaultQueryFn)
}

export function useGameById(gameId: string) {
  return useQuery(`/api/games/${gameId}`, defaultQueryFn, {
    enabled: gameId != null,
  })
}

export function useAddGame() {
  const addGame = (body) => {
    return defaultQueryFn('/api/games', {
      method: 'POST',
      body: JSON.stringify(body),
    })
  }

  return useMutation(addGame, {
    throwOnError: true,
    onSuccess: () => {
      queryCache.invalidateQueries('/api/games')
    },
  })
}

export function useEditGame(gameId: string) {
  const editGame = (body) => {
    return defaultQueryFn(`/api/games/${gameId}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    })
  }

  return useMutation(editGame, {
    throwOnError: true,
    onSuccess() {
      queryCache.invalidateQueries(`/api/games/${gameId}`)
      queryCache.invalidateQueries('/api/games')
    },
  })
}

export function useDeleteGame(gameId: string) {
  const deleteGame = () => {
    return defaultQueryFn(`/api/games/${gameId}`, {
      method: 'DELETE',
    })
  }

  return useMutation(deleteGame, {
    throwOnError: true,
    onSuccess() {
      queryCache.invalidateQueries(`/api/games/${gameId}`)
      queryCache.invalidateQueries('/api/games')
    },
  })
}

export function useCreateLobby() {
  const createLobby = (body) => {
    return defaultQueryFn('/api/play/lobby', {
      method: 'POST',
      body: JSON.stringify(body),
    })
  }

  return useMutation(createLobby, {
    throwOnError: true,
    onSuccess: () => {
      queryCache.invalidateQueries('/api/play/lobby')
    },
  })
}

export function useSaveLobby(gameCode: string) {
  const saveLobby = (body) => {
    return defaultQueryFn(`/api/play/lobby/${gameCode}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    })
  }

  return useMutation(saveLobby, {
    throwOnError: true,
    onSuccess: () => {
      queryCache.invalidateQueries(`/api/play/lobby/${gameCode}`)
      queryCache.invalidateQueries('/api/play/lobby')
    },
  })
}

export function useReports() {
  return useQuery('/api/reports', defaultQueryFn)
}

export function useReportById(lobbyId: string) {
  return useQuery(`/api/reports/${lobbyId}`, defaultQueryFn, {
    enabled: lobbyId != null,
  })
}

export function useDeleteReport(lobbyId: string) {
  const deleteReport = () => {
    return defaultQueryFn(`/api/reports/${lobbyId}`, {
      method: 'DELETE',
    })
  }

  return useMutation(deleteReport, {
    throwOnError: true,
    onSuccess() {
      queryCache.invalidateQueries(`/api/reports/${lobbyId}`)
      queryCache.invalidateQueries('/api/reports')
    },
  })
}

export function useSaveEmail() {
  const saveEmail = (body) => {
    return defaultQueryFn('/api/early-access', {
      method: 'POST',
      body: JSON.stringify(body),
    })
  }

  return useMutation(saveEmail, { throwOnError: true })
}
