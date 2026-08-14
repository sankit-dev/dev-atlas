import { createServer } from 'node:http'
import { createApp } from './app.js'
import { connectDatabase } from './config/database.js'
import { assertRequiredEnv, env } from './config/env.js'
import { connectAuthDatabase } from './lib/auth.js'

async function bootstrap() {
  assertRequiredEnv()

  await connectDatabase(env.mongodbUri)
  await connectAuthDatabase()

  const app = createApp()
  const server = createServer(app)

  server.listen(env.port, () => {
    console.log(`Dev Atlas API listening on port ${env.port}`)
  })
}

bootstrap().catch((error) => {
  console.error('Failed to start API server', error)
  process.exit(1)
})
