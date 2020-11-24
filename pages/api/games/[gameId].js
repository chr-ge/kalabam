import { getGameById, deleteGame } from '../../../models/Game'
import { getUserFromSession } from '../../../models/User'

export default async (req, res) => {
  let user
  try {
    user = await getUserFromSession({ req })
  } catch {
    res.status(401).end()
    return
  }

  const gameId = req.query.gameId

  const game = await getGameById(gameId)

  if (req.method === 'DELETE') {
    if (user.id.toString() !== game.createdBy.toString()) {
      res.status(403).end()
      return
    }

    return res.status(200).json(await deleteGame(gameId))
  }

  res.end()
}
