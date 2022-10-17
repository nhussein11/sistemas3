/* eslint-disable no-case-declarations */
import { NextApiRequest, NextApiResponse } from 'next'
import {
  deleteStockById,
  getStockById,
  updateStockById
} from '../../../backend/server/controllers/stocks/stock.controller'
import { errorHandler } from '../../../backend/server/controllers/errors/errorResponseHandler'

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
        const stock = await getStockById(id)
        return res.status(200).send({ stock })
      } catch (error) {
        return errorHandler(res, error)
      }
    case 'PUT':
      const { productId, storeId, quantity, minQuantity } = body

      try {
        const updatedStock = await updateStockById(
          id,
          productId,
          storeId,
          quantity,
          minQuantity
        )
        return res.status(200).send({ updatedStock })
      } catch (error) {
        return errorHandler(res, error)
      }

    case 'DELETE':
      try {
        const deletedStock = await deleteStockById(id)
        return res.status(200).send({ deletedStock })
      } catch (error) {
        return errorHandler(res, error)
      }

    default:
      return res.status(400).send('Invalid method')
  }
}
