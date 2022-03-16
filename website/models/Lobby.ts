import { PushOperator } from 'mongodb'
import mongodb from '../db/mongodb'
import type { Question } from '../utils/types'

export const getLobbyByGameCode = async (gameCode: string) => {
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

export async function updateLobbyByGameCode(gameCode: string, updates) {
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

export async function addQuestionToLobby(gameCode: string, question: Question) {
  const client = await mongodb
  const db = client.db()
  const collection = db.collection('lobbies')

  return await collection.findOneAndUpdate(
    { gameCode },
    {
      $push: {
        questions: question as never,
      },
    }
  )
}

export async function closeLobby(gameCode: string) {
  const client = await mongodb
  const db = client.db()
  const collection = db.collection('lobbies')

  const response = await collection.deleteOne({ gameCode })
  return response.deletedCount === 1
}
