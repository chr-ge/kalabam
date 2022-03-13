import NextAuth from 'next-auth'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import AppleProvider from 'next-auth/providers/apple'
import EmailProvider from 'next-auth/providers/email'
import GoogleProvider from 'next-auth/providers/google'
import clientPromise from '../../../db/mongodb'

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    EmailProvider({
      server: process.env.NEXTAUTH_EMAIL_SERVER,
      from: process.env.NEXTAUTH_EMAIL_FROM,
    }),
    GoogleProvider({
      clientId: process.env.NEXTAUTH_GOOGLE_ID,
      clientSecret: process.env.NEXTAUTH_GOOGLE_SECRET,
    }),
    AppleProvider({
      clientId: process.env.NEXTAUTH_APPLE_ID,
      clientSecret: {
        appleId: process.env.NEXTAUTH_APPLE_ID,
        teamId: process.env.NEXTAUTH_APPLE_TEAM_ID,
        privateKey: process.env.NEXTAUTH_APPLE_PRIVATE_KEY,
        keyId: process.env.NEXTAUTH_APPLE_KEY_ID,
      },
    }),
  ],
  callbacks: {
    redirect: async ({ url, baseUrl }) => {
      return url.startsWith(baseUrl)
        ? Promise.resolve(url)
        : Promise.resolve(baseUrl)
    },
    session: async ({ session, user }) => {
      const sessionUser = {
        ...session.user,
        id: user.id,
      }
      return Promise.resolve({
        ...session,
        user: sessionUser,
      })
    },
  },
  pages: {
    signIn: '/auth/signin',
    // signOut: '/api/auth/signout',
    error: '/auth/signin', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: null // If set, new users will be directed here on first sign in
  },
  debug: false, // Use this option to enable debug messages in the console
})
