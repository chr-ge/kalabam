import type { NextApiHandler } from 'next'
import Cors from 'cors'
import { getLobbyByGameCode } from '../../../../models/Lobby'
import initMiddleware from '../../../../lib/init-middleware'
import { config } from '../../../../config'

const cors = initMiddleware(
  Cors({
    origin: config.corsOrigin,
    methods: 'GET',
  })
)

const handler: NextApiHandler = async (req, res) => {
  await cors(req, res)
  const gameCode = req.query.gameCode as string

  if (req.method === 'GET') {
    const lobby = await getLobbyByGameCode(gameCode)

    if (!lobby)
      return res.status(404).json({ success: false, message: 'Not Found' })

    if (lobby.locked)
      return res
        .status(401)
        .json({ success: false, message: 'The lobby is locked.' })

    return res.status(200).json({ success: true })
  }

  res.end()
}

export default handler
