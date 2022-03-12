import { getReportById, deleteReport } from '../../../models/Reports'
import { getUserFromSession } from '../../../models/User'

const handler = async (req, res) => {
  let user
  try {
    user = await getUserFromSession({ req })
  } catch {
    res.status(401).end()
    return
  }

  const lobbyId = req.query.lobbyId
  const lobby = await getReportById(lobbyId)

  if (user.id.toString() !== lobby.createdBy.toString())
    return res.status(403).end()

  if (req.method === 'GET') {
    return res.status(200).json(lobby)
  }

  if (req.method === 'DELETE') {
    return res.status(200).json(await deleteReport(lobbyId))
  }

  res.end()
}

export default handler
