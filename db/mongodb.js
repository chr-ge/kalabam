import { MongoClient } from 'mongodb'

const { NEXTAUTH_DATABASE_URL, MONGODB_DB } = process.env

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo
if (!cached) cached = global.mongo = {}

export async function connectToDatabase () {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    const conn = {}
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
    cached.promise = MongoClient.connect(NEXTAUTH_DATABASE_URL, opts)
      .then((client) => {
        conn.client = client
        return client.db(MONGODB_DB)
      })
      .then((db) => {
        conn.db = db
        cached.conn = conn
      })
  }
  await cached.promise
  return cached.conn
}
