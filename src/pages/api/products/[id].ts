/* eslint-disable no-case-declarations */
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { NextApiRequest, NextApiResponse } from 'next'
import { ErrorProps } from 'next/error'
import {
  getProductById,
  updateProductById,
  deleteProductById
} from '../../../backend/server/controllers/products/products.controller'

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
      } catch (error) {
        return res.status(500).send({ error })
      }

    case 'DELETE':
      try {
        const deletedProduct = await deleteProductById(id)
        return res.status(200).send({ deletedProduct })
      } catch (error: any) {
        switch (error.code) {
          case 'P2003':
            return res.status(401).send({
              error,
              messageError:
                "You cannot delete this product because it's belong to an existing stock"
            })
          case 'P2025':
            return res.status(402).send({
              error,
              messageError: 'Id not provided'
            })
          default:
            return res.status(450).send({
              error,
              messageError: 'Something failed'
            })
        }
      }

    default:
      return res.status(400).send('Invalid method')
  }
}
