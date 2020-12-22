import { getLobbyByGameCode, updateLobbyByGameCode, addQuestionToLobby } from '../../../../models/Lobby'
import { getUserFromSession } from '../../../../models/User'

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

  if (req.method === 'PUT') {
    if (user.id.toString() !== lobby.createdBy.toString()) {
      res.status(403).end()
      return
    }

    const updates = JSON.parse(req.body);
    ['_id', 'createdBy', 'created'].forEach((key) => delete updates[key])

    return res.status(200).json('questions' in updates
      ? await addQuestionToLobby(gameCode, updates.question)
      : await updateLobbyByGameCode(gameCode, updates)
    )
  }

  res.end()
}
