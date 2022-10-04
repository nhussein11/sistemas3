/* eslint-disable no-case-declarations */
import { NextApiRequest, NextApiResponse } from 'next'
import { deleteSupplierById, getSupplierById, updateSupplierById } from '../../../backend/server/controllers/suppliers/suppliers.controller'
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
        const student = await getSupplierById(id)
        return res.status(200).send({ student })
      } catch (error) {
        return res.status(500).send({ error })
      }
    case 'PUT':
      const { _id, name, debt } = body

      try {
        const updatedStudent = await updateSupplierById(_id, name, debt)
        return res.status(200).send({ updatedStudent })
      } catch (error) {
        return res.status(500).send({ error })
      }

    case 'DELETE':
      try {
        const deletedStudent = await deleteSupplierById(id)
        return res.status(200).send({ deletedStudent })
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
