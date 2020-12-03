import { closeLobby } from '../../../../models/Lobby'
import { getUserFromSession } from '../../../../models/User'

export default async (req, res) => {
  try {
    await getUserFromSession({ req })
  } catch {
    res.status(401).end()
    return
  }

  const gameCode = req.query.gameCode

  if (req.method === 'DELETE') {
    return res.status(200).json({ success: await closeLobby(gameCode) })
  }

  res.end()
}
