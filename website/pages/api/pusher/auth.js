import Cors from 'cors'
import Pusher from 'pusher'
import { getLobbyByGameCode } from '../../../models/Lobby'
import initMiddleware from '../../../lib/init-middleware'

export const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_CLIENT_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  useTLS: true,
})

const cors = initMiddleware(
  Cors({
    methods: ['GET'],
  })
)

export default handler = async (req, res) => {
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
    res.status(404).end()
  } catch (err) {
    console.log('Pusher Auth Error: ', err)
    res.status(403).end()
  }
}
