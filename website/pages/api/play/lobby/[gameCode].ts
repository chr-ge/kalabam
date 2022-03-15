import type { NextApiHandler } from 'next'
import {
  getLobbyByGameCode,
  updateLobbyByGameCode,
  addQuestionToLobby,
} from '../../../../models/Lobby'
import { getUserFromSession } from '../../../../models/User'
import {
  calculateAverageAccuracy,
  calculateAveragePlayerAccuracy,
} from '../../../../utils/math'

const handler: NextApiHandler = async (req, res) => {
  let user
  try {
    user = await getUserFromSession({ req })
  } catch {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  const gameCode = req.query.gameCode as string
  const lobby = await getLobbyByGameCode(gameCode)

  if (!lobby) return res.status(404).json({ message: 'Not Found' })
  if (user.id.toString() !== lobby.createdBy.toString())
    return res.status(403).json({ message: 'Forbidden' })

  if (req.method === 'PUT') {
    const updates = JSON.parse(req.body)
    ;['_id', 'createdBy', 'created'].forEach((key) => delete updates[key])

    const hasQuestion = 'question' in updates
    if (hasQuestion)
      updates.question.averageAccuracy = calculateAverageAccuracy(
        updates.question.answers
      )

    if ('players' in updates) {
      updates.players.forEach((player) => {
        player.averageAccuracy = calculateAveragePlayerAccuracy(
          lobby.questions,
          player.id
        )
      })
    }

    const result = hasQuestion
      ? await addQuestionToLobby(gameCode, updates.question)
      : await updateLobbyByGameCode(gameCode, updates)

    return res.status(200).json({ success: Boolean(result) })
  }

  res.end()
}

export default handler
