import { ObjectId } from 'mongodb'
import { getUserFromSession } from '../../models/User'
import { getGamesCreatedByUser, createGame } from '../../models/Game'

const handler = async (req, res) => {
  let user
  try {
    user = await getUserFromSession({ req })
  } catch {
    res.status(401).end()
    return
  }

  if (req.method === 'GET') {
    return res.status(200).json(await getGamesCreatedByUser(user.id))
  }

  if (req.method === 'POST') {
    const { title, description, visibility, image, questions } = JSON.parse(
      req.body
    )

    if (!title || !questions || !visibility) {
      return res
        .status(400)
        .json({ success: false, message: 'Malformed content' })
    }

    const { result } = await createGame({
      title,
      description,
      visibility,
      image,
      questions,
      createdBy: new ObjectId(user.id),
    })

    if (!result.ok) {
      return res
        .status(500)
        .json({ success: false, message: 'Unable to create game' })
    }

    return res.status(201).json({ success: true, message: 'Game created' })
  }

  res.end()
}

export default handler
