import { getSession } from 'next-auth/client'
import { connectToDatabase } from '../db/mongodb'
import { ObjectId } from 'mongodb'

export async function getUserFromSession({ req }) {
  const session = await getSession({ req })

  if (!session) {
    throw new Error()
  }

  return getUserFromId(session.user.id)
}

export async function getUserFromId(userId) {
  const { db } = await connectToDatabase()

  const user = await db
    .collection('users')
    .findOne({ _id: new ObjectId(userId) })

  if (!user) {
    throw new Error('No user found')
  }

  user.id = user._id.toString()

  return user
}
