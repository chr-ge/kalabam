import type { NextApiHandler } from 'next'
import { createEmail } from '../../models/Email'
import { isEmail } from '../../utils/validate'

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { email } = JSON.parse(req.body)

    if (!email || !isEmail(email))
      return res
        .status(400)
        .json({ success: false, message: 'Malformed content' })

    const { result } = await createEmail({
      email: email.trim(),
      userAgent: req.headers['user-agent'],
    })

    if (!result.insertedId) return res.status(500).json({ success: false })

    return res.status(200).json({ success: true })
  }
  res.end()
}

export default handler
