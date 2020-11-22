import { connectToDatabase } from '../db/mongodb'

export const createGame = async (newGame) => {
  const dateNow = new Date()

  const game = {
    ...newGame,
    created: dateNow,
    updated: dateNow
  }

  const { db } = await connectToDatabase()
  const collection = db.collection('games')

  return await collection.insertOne(game)
}
