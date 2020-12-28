import { getLobbyByGameCode, updateLobbyByGameCode, addQuestionToLobby } from '../../../../models/Lobby'
import { getUserFromSession } from '../../../../models/User'
import { calculateAverageAccuracy } from '../../../../utils/math'

export default async (req, res) => {
  let user
  try {
    user = await getUserFromSession({ req })
  } catch {
    res.status(401).end()
    return
  }

  const gameCode = req.query.gameCode
  const lobby = await getLobbyByGameCode(gameCode)

  if (!lobby) return res.status(404).end()
  if (user.id.toString() !== lobby.createdBy.toString()) return res.status(403).end()

  if (req.method === 'PUT') {
    const updates = JSON.parse(req.body);
    ['_id', 'createdBy', 'created'].forEach((key) => delete updates[key])

    if ('question' in updates) updates.question.averageAccuracy = calculateAverageAccuracy(updates.question.answers)

    const result = 'question' in updates
      ? await addQuestionToLobby(gameCode, updates.question)
      : await updateLobbyByGameCode(gameCode, updates)

    return res.status(200).json({ success: result.ok === 1 })
  }

  res.end()
}
