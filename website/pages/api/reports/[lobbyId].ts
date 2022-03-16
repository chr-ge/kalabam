import type { NextApiHandler } from 'next'
import { getReportById, deleteReport } from '../../../models/Reports'
import { getUserFromSession } from '../../../models/User'

const handler: NextApiHandler = async (req, res) => {
  let user
  try {
    user = await getUserFromSession({ req })
  } catch {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  const lobbyId = req.query.lobbyId as string
  const lobby = await getReportById(lobbyId)

  if (user.id.toString() !== lobby.createdBy.toString())
    return res.status(403).json({ message: 'Forbidden' })

  if (req.method === 'GET') {
    return res.status(200).json(lobby)
  }

  if (req.method === 'DELETE') {
    return res.status(200).json(await deleteReport(lobbyId))
  }

  res.end()
}

export default handler
