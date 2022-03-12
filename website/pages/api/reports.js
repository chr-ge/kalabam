import { getUserFromSession } from '../../models/User'
import { getUserReports } from '../../models/Reports'

const handler = async (req, res) => {
  let user
  try {
    user = await getUserFromSession({ req })
  } catch {
    res.status(401).end()
    return
  }

  if (req.method === 'GET') {
    return res.status(200).json(await getUserReports(user.id, true))
  }

  res.end()
}

export default handler
