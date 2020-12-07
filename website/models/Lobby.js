import { connectToDatabase } from '../db/mongodb'

export const getLobbyByGameCode = async (gameCode) => {
  const { db } = await connectToDatabase()
  return await db.collection('lobbies').findOne({ gameCode: gameCode })
}

export const createLobby = async (newLobby) => {
  const dateNow = new Date()

  const lobby = {
    ...newLobby,
    players: [],
    created: dateNow
  }

  const { db } = await connectToDatabase()
  const collection = db.collection('lobbies')

  return await collection.insertOne(lobby)
}

export async function closeLobby (gameCode) {
  const { db } = await connectToDatabase()
  const collection = db.collection('lobbies')

  const response = await collection.deleteOne({ gameCode })
  return response.result.ok === 1
}
