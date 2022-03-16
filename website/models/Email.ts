import mongodb from '../db/mongodb'

type EmailInput = {
  email: string
  userAgent: string
}

export async function createEmail(newEmail: EmailInput) {
  const client = await mongodb
  const db = client.db()
  const collection = db.collection('emails')

  return await collection.insertOne({ ...newEmail, created: new Date() })
}
