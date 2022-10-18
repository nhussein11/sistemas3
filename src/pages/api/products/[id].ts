/* eslint-disable no-case-declarations */
import { NextApiRequest, NextApiResponse } from 'next'
import {
  getProductById,
  updateProductById,
  deleteProductById
} from '../../../backend/server/controllers/products/products.controller'
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
        const product = await getProductById(id)
        return res.status(200).send({ product })
      } catch (error) {
        return errorHandler(res, error)
      }
    case 'PUT':
      const { name, price, description, category } = body

      try {
        const updatedProduct = await updateProductById(
          id,
          name,
          price,
          description,
          category
        )
        return res.status(200).send({ updatedProduct })
      } catch (error: any) {
        return errorHandler(res, error)
      }

    case 'DELETE':
      try {
        const deletedProduct = await deleteProductById(id)
        return res.status(200).send({ deletedProduct })
      } catch (error: any) {
        return errorHandler(res, error)
      }

    default:
      return res.status(400).send('Invalid method')
  }
}
