import { connectToDatabase } from '../db/mongodb'

export const createLobby = async (newLobby) => {
  const dateNow = new Date()

  const lobby = {
    ...newLobby,
    created: dateNow
  }

  const { db } = await connectToDatabase()
  const collection = db.collection('lobbies')

  return await collection.insertOne(lobby)
}
