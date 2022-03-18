import NextAuth from 'next-auth'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import AppleProvider from 'next-auth/providers/apple'
import EmailProvider from 'next-auth/providers/email'
import GoogleProvider from 'next-auth/providers/google'
import clientPromise from '../../../db/mongodb'
import { config } from '../../../config'

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    EmailProvider({
      server: config.nextAuth.email.server,
      from: config.nextAuth.email.from,
    }),
    GoogleProvider({
      clientId: config.nextAuth.google.clientId,
      clientSecret: config.nextAuth.google.clientSecret,
    }),
    AppleProvider({
      clientId: config.nextAuth.apple.clientId,
      clientSecret: config.nextAuth.apple.clientSecret,
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
