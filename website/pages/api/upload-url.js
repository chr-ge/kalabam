import aws from 'aws-sdk'
import uniqid from 'uniqid'
import { getUserFromSession } from '../../models/User'

aws.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION,
  signatureVersion: 'v4'
})

const s3 = new aws.S3()
const S3_BUCKET = 'kalabam-images'

export default async function handler (req, res) {
  let user
  try {
    user = await getUserFromSession({ req })
  } catch {
    return res.status(401).end()
  }

  const imageKey = `img-${uniqid()}.${req.query.file.split('.').pop().toLowerCase()}`
  const imageUrl = `https://${S3_BUCKET}.s3.${process.env.REGION}.amazonaws.com/${imageKey}`

  const post = await s3.createPresignedPost({
    Bucket: process.env.BUCKET_NAME,
    Fields: {
      key: imageKey
    },
    Expires: 60, // seconds
    Conditions: [
      ['eq', '$x-amz-meta-userid', user.id],
      ['content-length-range', 0, 2097152] // up to 2 MB
    ]
  })

  post.fields['x-amz-meta-userid'] = user.id

  res.status(200).json({ post, imageUrl })
}
