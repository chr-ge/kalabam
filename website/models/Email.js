import { connectToDatabase } from '../db/mongodb'

export async function createEmail(newEmail) {
  const { db } = await connectToDatabase()
  const collection = db.collection('emails')

  return await collection.insertOne({ ...newEmail, created: new Date() })
}
