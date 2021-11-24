module.exports = {
  env: {
    lang: 'en',
    locale: 'en-US'
  },
  images: {
    domains: [
      'kalabam-staging.s3.us-east-2.amazonaws.com',
      'kalabam-images.s3.us-east-2.amazonaws.com',
      'images.unsplash.com'
    ]
  },
  rewrites: async () => [
    {
      source: '/bee.js',
      destination: 'https://cdn.splitbee.io/sb.js'
    },
    {
      source: '/_hive/:slug',
      destination: 'https://hive.splitbee.io/:slug'
    }
  ],
  reactStrictMode: true
}
