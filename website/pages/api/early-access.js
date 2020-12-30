import { createEmail } from '../../models/Emails'

export default async (req, res) => {
  if (req.method === 'POST') {
    const { email } = JSON.parse(req.body)

    if (!email) return res.status(400).json({ success: false, message: 'Malformed content' })

    const { result } = await createEmail({
      email: email.trim(),
      userAgent: req.headers['user-agent']
    })

    if (!result.ok) return res.status(500).json({ success: false })

    return res.status(200).json({ success: true })
  }
  res.end()
}