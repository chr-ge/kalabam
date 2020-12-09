import Pusher from 'pusher'
import { getLobbyByGameCode } from '../../../models/Game'

export const pusher = new Pusher({
  appId: '1107416',
  key: '179761146c8708fdb1bb',
  secret: 'd1c1e2f60b59cd8ff5bc',
  cluster: 'mt1',
  useTLS: true
})

export default async (req, res) => {
  try {
    const { socketId, channelName } = req.body
    const gameCode = channelName.split('-')[1]
    const game = await getLobbyByGameCode(gameCode)

    if (game) {
      const auth = pusher.authenticate(socketId, channelName)
      return res.send(auth)
    }
  } catch (err) {
    console.log('Pusher Auth Error: ', err)
    res.status(403).end()
  }
}
