import cors from 'cors'
import express from 'express'
import { env } from './config/env.js'
import { toNodeHandler } from 'better-auth/node'
import { auth } from './lib/auth.js'
import { dsaProgressRouter } from './routes/dsaProgress.js'
import { healthRouter } from './routes/health.js'
import { noteProgressRouter } from './routes/noteProgress.js'

export function createApp() {
  const app = express()

  app.use(
    cors({
      origin: env.clientOrigin,
      credentials: true,
    }),
  )

  app.get('/api/auth/providers', (_request, response) => {
    response.json({
      providers: {
        github: Boolean(env.githubClientId && env.githubClientSecret),
      },
    })
  })

  app.all('/api/auth', toNodeHandler(auth))
  app.all('/api/auth/*splat', toNodeHandler(auth))

  app.use(express.json({ limit: '1mb' }))

  app.use('/api/health', healthRouter)
  app.use('/api/dsa/progress', dsaProgressRouter)
  app.use('/api/notes/progress', noteProgressRouter)

  app.use((_request, response) => {
    response.status(404).json({
      message: 'Route not found',
    })
  })

  return app
}
