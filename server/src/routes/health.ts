import { Router } from 'express'

export const healthRouter = Router()

healthRouter.get('/', (_request, response) => {
  response.json({
    ok: true,
    service: 'dev-atlas-api',
  })
})
