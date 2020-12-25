import { connectToDatabase } from '../db/mongodb'

export const getLobbyByGameCode = async (gameCode) => {
  const { db } = await connectToDatabase()
  return await db.collection('lobbies').findOne({ gameCode, ended: { $exists: false } })
}

export const createLobby = async (newLobby) => {
  const lobby = {
    ...newLobby,
    questions: [],
    created: new Date()
  }

  const { db } = await connectToDatabase()
  const collection = db.collection('lobbies')

  return await collection.insertOne(lobby)
}

export async function updateLobbyByGameCode (gameCode, updates) {
  const { db } = await connectToDatabase()
  const collection = db.collection('lobbies')

  const { changes, ...newUpdates } = updates

  return await collection.findOneAndUpdate({ gameCode }, {
    $set: {
      ...newUpdates
    }
  })
}

export async function addQuestionToLobby (gameCode, question) {
  const { db } = await connectToDatabase()
  const collection = db.collection('lobbies')

  return await collection.findOneAndUpdate({ gameCode }, {
    $push: {
      questions: question
    }
  })
}

export async function closeLobby (gameCode) {
  const { db } = await connectToDatabase()
  const collection = db.collection('lobbies')

  const response = await collection.deleteOne({ gameCode })
  return response.result.ok === 1
}
