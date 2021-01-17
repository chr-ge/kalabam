import { ObjectId } from 'mongodb'
import { connectToDatabase } from '../db/mongodb'

const populateCreatedByAggregateStages = [
  {
    $lookup: {
      from: 'users',
      foreignField: '_id',
      localField: 'createdBy',
      as: 'createdBy_user'
    }
  },
  {
    $addFields: {
      user: { $arrayElemAt: ['$createdBy_user', 0] },
      questionCount: {
        $size: '$questions'
      }
    }
  },
  {
    $project: {
      createdBy_user: 0
    }
  }
]

export async function getPublicGames (sortBy) {
  const { db } = await connectToDatabase()
  const collection = db.collection('games')

  return await collection.find({ visibility: '1' }).sort({ created: sortBy }).toArray()
}

export async function getGamesCreatedByUser (userId) {
  const { db } = await connectToDatabase()
  const collection = db.collection('games')

  const games = await collection
    .aggregate([
      {
        $match: {
          createdBy: new ObjectId(userId)
        }
      },
      ...populateCreatedByAggregateStages,
      { $sort: { _id: -1 } }
    ])
    .toArray()

  return games
}

export async function getGameById (gameId) {
  const { db } = await connectToDatabase()
  const collection = db.collection('games')

  const game = await collection
    .aggregate([
      {
        $match: {
          _id: new ObjectId(gameId)
        }
      },
      ...populateCreatedByAggregateStages
    ])
    .toArray()

  return game[0]
}

export async function createGame (newGame) {
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

export async function deleteGame (id) {
  const { db } = await connectToDatabase()
  const collection = db.collection('games')

  const response = await collection.deleteOne({ _id: new ObjectId(id) })
  return response.result.ok === 1
}

export async function updateGameById (gameId, updates) {
  const gameObjectId = new ObjectId(gameId)

  const { db } = await connectToDatabase()
  const collection = db.collection('games')

  const { changes, ...newUpdates } = updates

  const queryUpdates = {
    $set: {
      ...newUpdates
    }
  }

  return await collection.findOneAndUpdate({ _id: gameObjectId }, queryUpdates)
}
