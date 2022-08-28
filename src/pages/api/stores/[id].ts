/* eslint-disable no-case-declarations */
import { NextApiRequest, NextApiResponse } from 'next'
import { deleteStoreById, getStoreById, updateStoreById } from '../../../backend/server/controllers/stores/stores.controller'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body,
    query: { id }
  } = req

  if (typeof id !== 'string') {
    return res.status(500).send({ error: 'id must be string type' })
  }

  switch (method) {
    case 'GET':
      try {
        const store = await getStoreById(id)
        return res.status(200).send({ store })
      } catch (error) {
        return res.status(500).send({ error })
      }
    case 'PUT':
      const { name, address } = body

      try {
        const updatedStore = await updateStoreById(id, name, address)
        return res.status(200).send({ updatedStore })
      } catch (error) {
        return res.status(500).send({ error })
      }

    case 'DELETE':
      try {
        const deletedStore = await deleteStoreById(id)
        return res.status(200).send({ deletedStore })
      } catch (error) {
        return res.status(500).send({ error })
      }

    default:
      return res.status(400).send('Invalid method')
  }
}
