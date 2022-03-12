import { createApi } from 'unsplash-js'

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
})

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const category = req.query.category || 'game'
    const orientation = req.query.orientation || 'landscape'

    try {
      const result = await unsplash.search.getPhotos({
        query: category,
        orientation,
        perPage: 21,
      })
      return res.status(200).json(result)
    } catch (err) {
      return res.status(500).json({ success: false, message: err })
    }
  }
  res.end()
}

export default handler
