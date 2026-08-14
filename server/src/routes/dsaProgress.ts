import { Router } from 'express'

export const dsaProgressRouter = Router()

dsaProgressRouter.get('/', (_request, response) => {
  response.status(501).json({
    message: 'List DSA progress endpoint is planned but not implemented yet.',
  })
})

dsaProgressRouter.post('/sync', (_request, response) => {
  response.status(501).json({
    message: 'Sync DSA progress endpoint is planned but not implemented yet.',
  })
})

dsaProgressRouter.put('/:questId', (_request, response) => {
  response.status(501).json({
    message: 'Update DSA progress endpoint is planned but not implemented yet.',
  })
})
