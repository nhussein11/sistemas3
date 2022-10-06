/* eslint-disable no-case-declarations */
import { NextApiRequest, NextApiResponse } from 'next'
import { deleteCustomerById, getCustomerById, updateCustomerById } from '../../../backend/server/controllers/customers/customers.controller'
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
        const customer = await getCustomerById(id)
        return res.status(200).send({ customer })
      } catch (error) {
        return res.status(500).send({ error })
      }
    case 'PUT':
      const { _id, name, debt } = body

      try {
        const updatedCustomer = await updateCustomerById(_id, name, debt)
        return res.status(200).send({ updatedCustomer })
      } catch (error) {
        return res.status(500).send({ error })
      }

    case 'DELETE':
      try {
        const deletedCustomer = await deleteCustomerById(id)
        return res.status(200).send({ deletedCustomer })
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
