import { getSession } from 'next-auth/react'
import { ObjectId } from 'mongodb'
import mongodb from '../db/mongodb'

export async function getUserFromSession({ req }) {
  const session = await getSession({ req })

  if (!session) {
    throw new Error('No session')
  }

  return getUserFromId(session.user.id)
}

export async function getUserFromId(userId) {
  const client = await mongodb
  const db = client.db()

  const user = await db
    .collection('users')
    .findOne({ _id: new ObjectId(userId) })

  if (!user) {
    throw new Error('No user found')
  }

  user.id = user._id.toString()

  return user
}
