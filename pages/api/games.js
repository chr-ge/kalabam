import { ObjectId } from 'mongodb'
import { getUserFromSession } from '../../models/User'
import { createGame } from '../../models/Game'

export default async (req, res) => {
  let user
  try {
    user = await getUserFromSession({ req })
  } catch {} // eslint-disable-line no-empty

  if (req.method === 'POST') {
    if (!user) {
      res.status(401).end()
      return
    }

    const { title, description, questions } = JSON.parse(req.body)

    if (!title || !questions) {
      res.status(400).json({ success: false, status: 'malformed content' })
      return
    }

    const { result } = await createGame({
      title,
      description,
      questions,
      createdBy: new ObjectId(user.id)
    })

    if (!result.ok) {
      res.status(500).json({ success: false, status: 'unable to create game' })
      return
    }

    return res.status(201).json({ success: true, status: 'created' })
  }

  res.end()
}
