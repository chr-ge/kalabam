import { pusher } from './pusher/auth'

export default async (req, res) => {
  const { channelName, eventName, data } = JSON.parse(req.body)
  pusher.trigger(channelName, eventName, data)
  return res.status(200).end()
}
