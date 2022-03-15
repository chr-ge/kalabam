import type { NextApiHandler } from 'next'
import { getGameById, updateGameById, deleteGame } from '../../../models/Game'
import { getUserFromSession } from '../../../models/User'

const handler: NextApiHandler = async (req, res) => {
  let user
  try {
    user = await getUserFromSession({ req })
  } catch {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  const gameId = req.query.gameId
  const game = await getGameById(gameId)
  if (!game) return res.status(404).json({ message: 'Not Found' })

  if (req.method === 'GET') {
    return res.status(200).json(game)
  }

  if (req.method === 'PUT') {
    if (user.id.toString() !== game.createdBy.toString()) {
      return res.status(403).json({ message: 'Forbidden' })
    }

    const updates = JSON.parse(req.body)

    ;['_id', 'createdBy', 'created'].forEach((key) => {
      delete updates[key]
    })
    const missingValue = [
      'title',
      'description',
      'visibility',
      'questions',
    ].some((key) => key == null)

    if (missingValue) {
      res
        .status(400)
        .json({ success: false, message: 'missing required value' })
    }

    updates.updated = new Date()

    return res.status(200).json(await updateGameById(gameId, updates))
  }

  if (req.method === 'DELETE') {
    if (user.id.toString() !== game.createdBy.toString()) {
      return res.status(403).json({ message: 'Forbidden' })
    }

    return res.status(200).json(await deleteGame(gameId))
  }

  res.end()
}

export default handler
