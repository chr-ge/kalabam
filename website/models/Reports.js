import { ObjectId } from 'mongodb'
import { connectToDatabase } from '../db/mongodb'

const populateCreatedByAggregateStages = [
  {
    $lookup: {
      from: 'games',
      foreignField: '_id',
      localField: 'gameId',
      as: 'lobby_game'
    }
  },
  {
    $addFields: {
      game: { $arrayElemAt: ['$lobby_game', 0] }
    }
  },
  {
    $project: {
      lobby_game: 0
    }
  }
]

export async function getUserReports (userId) {
  const { db } = await connectToDatabase()
  const collection = db.collection('lobbies')

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
