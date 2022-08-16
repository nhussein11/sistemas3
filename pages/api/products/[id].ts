import { NextApiRequest, NextApiResponse } from 'next'
import {
  getProductById,
  updateProductById,
  deleteProductById
} from '../../../server/controllers/products/products.controller'

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
        const product = await getProductById(id)
        return res.status(200).send({ product })
      } catch (error) {
        return res.status(500).send({ error })
      }
    case 'PUT':
      // eslint-disable-next-line no-case-declarations
      const { name, price } = body

      try {
        const updatedUser = await updateProductById(id, name, price)
        return res.status(200).send({ updatedUser })
      } catch (error) {
        return res.status(500).send({ error })
      }

    case 'DELETE':
      try {
        const deletedUser = await deleteProductById(id)
        return res.status(200).send({ deletedUser })
      } catch (error) {
        return res.status(500).send({ error })
      }
    default:
      return res.status(400).send('Invalid method')
  }
}
