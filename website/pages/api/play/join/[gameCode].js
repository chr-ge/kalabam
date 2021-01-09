import Cors from 'cors'
import { getLobbyByGameCode } from '../../../../models/Lobby'
import initMiddleware from '../../../../lib/init-middleware'

const cors = initMiddleware(
  Cors({
    origin: process.env.CORS_ORIGIN,
    methods: 'GET'
  })
)

export default async (req, res) => {
  await cors(req, res)
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
