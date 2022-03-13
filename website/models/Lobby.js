import mongodb from '../db/mongodb'

export const getLobbyByGameCode = async (gameCode) => {
  const client = await mongodb
  const db = client.db()
  return await db
    .collection('lobbies')
    .findOne({ gameCode, ended: { $exists: false } })
}

export const createLobby = async (newLobby) => {
  const lobby = {
    ...newLobby,
    players: [],
    questions: [],
    created: new Date(),
  }

  const client = await mongodb
  const db = client.db()
  const collection = db.collection('lobbies')

  return await collection.insertOne(lobby)
}

export async function updateLobbyByGameCode(gameCode, updates) {
  const client = await mongodb
  const db = client.db()
  const collection = db.collection('lobbies')

  const { changes, ...newUpdates } = updates

  return await collection.findOneAndUpdate(
    { gameCode },
    {
      $set: {
        ...newUpdates,
      },
    }
  )
}

export async function addQuestionToLobby(gameCode, question) {
  const client = await mongodb
  const db = client.db()
  const collection = db.collection('lobbies')

  return await collection.findOneAndUpdate(
    { gameCode },
    {
      $push: {
        questions: question,
      },
    }
  )
}

export async function closeLobby(gameCode) {
  const client = await mongodb
  const db = client.db()
  const collection = db.collection('lobbies')

  const response = await collection.deleteOne({ gameCode })
  return response.deletedCount === 1
}
