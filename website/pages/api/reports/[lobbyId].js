import { getReportById } from '../../../models/Reports'
import { getUserFromSession } from '../../../models/User'

export default async (req, res) => {
  let user
  try {
    user = await getUserFromSession({ req })
  } catch {
    res.status(401).end()
    return
  }

  const lobbyId = req.query.lobbyId
  const lobby = await getReportById(lobbyId)

  if (req.method === 'GET') {
    if (user.id.toString() !== lobby.createdBy.toString()) return res.status(403).end()

    return res.status(200).json(lobby)
  }

  res.end()
}
