import { NextApiRequest, NextApiResponse } from 'next'
import {
  getProducts,
  createProduct
} from '../../../backend/server/controllers/products/products.controller'

export default async function products (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req

  switch (method) {
    case 'GET':
      try {
        const products = await getProducts()
        return res.status(200).send({ products })
      } catch (error) {
        return res.status(500).send({ error })
      }

    case 'POST':
      try {
        const {
          name,
          price,
          description,
          category
        } = body
        const productCreated = await createProduct(
          name,
          price,
          description,
          category
        )
        return res.status(201).send({ productCreated })
      } catch (error) {
        return res.status(500).send({ error })
      }

    default:
      return res.status(400).send('Invalid request')
  }
}
