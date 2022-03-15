import type { NextApiHandler } from 'next'

export default function initMiddleware(middleware: any): NextApiHandler {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })
}
