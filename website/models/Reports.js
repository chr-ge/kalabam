import { ObjectId } from 'mongodb'
import mongodb from '../db/mongodb'

const populateCreatedByAggregateStages = [
  {
    $lookup: {
      from: 'games',
      foreignField: '_id',
      localField: 'gameId',
      as: 'lobby_game',
    },
  },
  {
    $addFields: {
      game: { $arrayElemAt: ['$lobby_game', 0] },
    },
  },
  {
    $project: {
      lobby_game: 0,
    },
  },
]

export async function getUserReports(userId, limit = false) {
  const client = await mongodb
  const db = client.db()
  const collection = db.collection('lobbies')

  const controlResults = limit
    ? {
        $facet: {
          count: [{ $count: 'count' }],
          reports: [{ $sort: { _id: -1 } }, { $limit: 3 }],
        },
      }
    : { $sort: { _id: -1 } }

  const reports = await collection
    .aggregate([
      {
        $match: {
          createdBy: new ObjectId(userId),
          started: { $exists: true },
        },
      },
      ...populateCreatedByAggregateStages,
      controlResults,
    ])
    .toArray()

  return reports
}

export async function getReportById(lobbyId) {
  const client = await mongodb
  const db = client.db()
  const collection = db.collection('lobbies')

  const report = await collection
    .aggregate([
      {
        $match: {
          _id: new ObjectId(lobbyId),
        },
      },
      ...populateCreatedByAggregateStages,
    ])
    .toArray()

  return report[0]
}

export async function deleteReport(lobbyId) {
  const client = await mongodb
  const db = client.db()
  const collection = db.collection('lobbies')

  const response = await collection.deleteOne({ _id: new ObjectId(lobbyId) })
  return response.deletedCount === 1
}
