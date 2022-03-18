import type { NextApiHandler } from 'next'
import Cors from 'cors'
import Pusher from 'pusher'
import { getLobbyByGameCode } from '../../../models/Lobby'
import initMiddleware from '../../../lib/init-middleware'
import { config } from '../../../config'

export const pusher = new Pusher({
  appId: config.pusher.appId,
  key: config.pusher.clientKey,
  secret: config.pusher.secret,
  cluster: config.pusher.cluster,
  useTLS: true,
})

const cors = initMiddleware(
  Cors({
    methods: ['GET'],
  })
)

const handler: NextApiHandler = async (req, res) => {
  await cors(req, res)
  try {
    const socketId = req.body.socket_id
    const channelName = req.body.channel_name

    const gameCode = channelName.split('-')[2]
    const game = await getLobbyByGameCode(gameCode)
    if (game) {
      const auth = pusher.authenticate(socketId, channelName, {
        user_id: `player-${new Date().toISOString()}`,
      })
      return res.send(auth)
    }
    res.status(404).json({ message: 'Not Found' })
  } catch (err) {
    console.log('Pusher Auth Error: ', err)
    res.status(403).json({ message: 'Forbidden' })
  }
}

export default handler
