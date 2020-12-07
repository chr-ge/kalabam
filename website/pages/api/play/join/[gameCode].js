import { getLobbyByGameCode } from '../../../../models/Lobby'

export default async (req, res) => {
  const gameCode = req.query.gameCode

  if (req.method === 'GET') {
    const lobby = await getLobbyByGameCode(gameCode)

    if (!lobby) {
      res.status(404).json({ success: false })
      return
    }

    return res.status(200).json({ success: true })
  }

  res.end()
}
