import { ObjectId } from 'mongodb'
import { getUserFromSession } from '../../../models/User'
import { createLobby } from '../../../models/Lobby'
import { generateGameCode } from '../../../util/random'

export default async (req, res) => {
  let user
  try {
    user = await getUserFromSession({ req })
  } catch {
    res.status(401).end()
    return
  }

  if (req.method === 'POST') {
    const { gameId } = JSON.parse(req.body)

    if (!gameId) {
      res.status(400).json({ success: false, status: 'malformed content' })
      return
    }

    const gameCode = generateGameCode()
    const { result } = await createLobby({
      gameId,
      gameCode,
      createdBy: new ObjectId(user.id)
    })

    if (!result.ok) {
      res.status(500).json({ success: false, status: 'unable to create lobby' })
      return
    }

    return res.status(201).json({ success: true, status: 'created', data: { gameCode } })
  }

  res.end()
}
