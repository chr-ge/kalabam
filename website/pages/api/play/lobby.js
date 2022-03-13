import { ObjectId } from 'mongodb'
import { getUserFromSession } from '../../../models/User'
import { createLobby } from '../../../models/Lobby'
import { generateGameCode } from '../../../utils/gameCode'

const handler = async (req, res) => {
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
      res.status(400).json({ success: false, message: 'Malformed content' })
      return
    }

    const gameCode = generateGameCode()
    const result = await createLobby({
      gameCode,
      gameId: new ObjectId(gameId),
      createdBy: new ObjectId(user.id),
    })

    if (!result.insertedId) {
      res
        .status(500)
        .json({ success: false, message: 'Unable to create lobby' })
      return
    }

    return res.status(201).json({
      success: true,
      data: gameCode,
    })
  }

  res.end()
}

export default handler
