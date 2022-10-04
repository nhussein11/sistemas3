import { NextApiRequest, NextApiResponse } from 'next'
import { createCustomer, getCustomers } from '../../../backend/server/controllers/customers/customers.controller'

export default async function customers (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req

  switch (method) {
    case 'GET':
      try {
        const customers = await getCustomers()
        return res.status(200).send({ customers })
      } catch (error) {
        return res.status(500).send({ error })
      }

    case 'POST':
      try {
        const { name, debt } = body
        const customerCreated = await createCustomer(name, debt)
        return res.status(201).send({ customerCreated })
      } catch (error) {
        return res.status(500).send({ error })
      }

    default:
      return res.status(400).send('Invalid request')
  }
}
