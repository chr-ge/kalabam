// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
  env: {
    HOST:
      process.env.VERCEL_ENV === 'production'
        ? 'https://www.kalabam.com'
        : process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : 'http://localhost:3000',
  },
  images: {
    domains: [
      'kalabam-staging.s3.us-east-2.amazonaws.com',
      'kalabam-images.s3.us-east-2.amazonaws.com',
      'images.unsplash.com',
    ],
  },
  swcMinify: true,
  rewrites: async () => [
    {
      source: '/bee.js',
      destination: 'https://cdn.splitbee.io/sb.js',
    },
    {
      source: '/_hive/:slug',
      destination: 'https://hive.splitbee.io/:slug',
    },
  ],
  reactStrictMode: true,
}
