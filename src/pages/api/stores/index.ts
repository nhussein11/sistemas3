import { NextApiRequest, NextApiResponse } from 'next'
import { getStores, createStore } from '../../../backend/server/controllers/stores/stores.controller'

export default async function products (
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
        return res.status(500).send({ error })
      }

    case 'POST':
      try {
        const { name, address } = body
        const storeCreated = await createStore(name, address)
        return res.status(201).send({ storeCreated })
      } catch (error) {
        return res.status(500).send({ error })
      }

    default:
      return res.status(400).send('Invalid request')
  }
}
