import { NextApiRequest, NextApiResponse } from 'next'
import { createSupplier, getSuppliers } from '../../../backend/server/controllers/suppliers/suppliers.controller'

export default async function suppliers (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req

  switch (method) {
    case 'GET':
      try {
        const suppliers = await getSuppliers()
        return res.status(200).send({ suppliers })
      } catch (error) {
        return res.status(500).send({ error })
      }

    case 'POST':
      try {
        const { name, debt } = body
        const studentCreated = await createSupplier(name, debt)
        return res.status(201).send({ studentCreated })
      } catch (error) {
        return res.status(500).send({ error })
      }

    default:
      return res.status(400).send('Invalid request')
  }
}
