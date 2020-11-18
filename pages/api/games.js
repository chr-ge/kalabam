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

    const { title, description } = JSON.parse(req.body)

    if (!title || !description) {
      res.status(400).json({ status: 'malformed content' })
      return
    }

    const { result } = await createGame({
      title,
      description,
      createdBy: new ObjectId(user.id)
    })

    if (!result.ok) {
      res.status(500).json({ status: 'unable to add item' })
      return
    }

    return res.status(201).json({ status: 'created' })
  }

  res.end()
}
