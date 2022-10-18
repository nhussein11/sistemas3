import { NextApiRequest, NextApiResponse } from 'next'
import { getStores, createStore } from '../../../backend/server/controllers/stores/stores.controller'
import { errorHandler } from '../../../backend/server/controllers/errors/errorResponseHandler'

export default async function stores (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req

  switch (method) {
    case 'GET':
      try {
        const stores = await getStores()
        return res.status(200).send({ stores })
      } catch (error) {
        return errorHandler(res, error)
      }

    case 'POST':
      try {
        const { name, address } = body
        const storeCreated = await createStore(name, address)
        return res.status(201).send({ storeCreated })
      } catch (error) {
        return errorHandler(res, error)
      }

    default:
      return res.status(400).send('Invalid request')
  }
}
