export const config: Config = {
  host: process.env.HOST || '',
  corsOrigin: process.env.CORS_ORIGIN,
  crisp: {
    websiteId: process.env.NEXT_PUBLIC_CRISP_CHAT || '',
  },
  splitbee: {
    events: {
      heroButton: 'Hero Button',
    },
  },
  pusher: {
    appId: process.env.PUSHER_APP_ID || '',
    clientKey: process.env.NEXT_PUBLIC_PUSHER_CLIENT_KEY || '',
    secret: process.env.PUSHER_SECRET || '',
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || '',
  },
  unsplash: {
    accessKey: process.env.UNSPLASH_ACCESS_KEY || '',
  },
  mongodbUri: process.env.MONGODB_URI || '',
  aws: {
    accessKeyId: process.env.S3_ACCESS_KEY || '',
    secretAccessKey: process.env.S3_SECRET_KEY || '',
    region: process.env.S3_REGION || '',
    bucketName: process.env.S3_BUCKET_NAME || '',
    signatureVersion: 'v4',
  },
  nextAuth: {
    email: {
      server: process.env.NEXTAUTH_EMAIL_SERVER || '',
      from: process.env.NEXTAUTH_EMAIL_FROM || '',
    },
    google: {
      clientId: process.env.NEXTAUTH_GOOGLE_ID || '',
      clientSecret: process.env.NEXTAUTH_GOOGLE_SECRET || '',
    },
    apple: {
      clientId: process.env.NEXTAUTH_APPLE_ID,
      clientSecret: process.env.NEXTAUTH_APPLE_SECRET,
    },
  },
}

interface Config {
  /**
   * Website host.
   */
  host: string
  /**
   * Cors origin.
   */
  corsOrigin: string
  /**
   * Crisp messaging config.
   */
  crisp: {
    websiteId: string
  }
  /**
   * Splitbee analytics config.
   */
  splitbee: {
    events: {
      heroButton: string
    }
  }
  /**
   * Pusher config.
   */
  pusher: {
    appId: string
    clientKey: string
    secret: string
    cluster: string
  }
  /**
   * Unsplash config.
   */
  unsplash: {
    accessKey: string
  }
  /**
   * Mongodb connection string.
   */
  mongodbUri: string
  /**
   * AWS config.
   */
  aws: {
    accessKeyId: string
    secretAccessKey: string
    region: string
    bucketName: string
    signatureVersion: string
  }
  /**
   * NextAuth authentication config.
   */
  nextAuth: {
    email: {
      server: string
      from: string
    }
    google: {
      clientId: string
      clientSecret: string
    }
    apple: {
      clientId: string
      clientSecret: string
    }
  }
}
