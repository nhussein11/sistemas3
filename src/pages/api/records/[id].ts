/* eslint-disable no-case-declarations */
import { NextApiRequest, NextApiResponse } from 'next'
import {
  deleteRecordById,
  getRecordById,
  updateRecordById
} from '../../../backend/server/controllers/records/records.controller'
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
        const record = await getRecordById(id)
        return res.status(200).send({ record })
      } catch (error) {
        return errorHandler(res, error)
      }
    case 'PUT':
      const {
        observation,
        address,
        letter,
        recordNumber,
        paidFor,
        recordTypeId,
        supplierId,
        customerId
      } = body

      try {
        const updatedRecord = await updateRecordById(
          id,
          observation,
          address,
          letter,
          recordNumber,
          paidFor,
          recordTypeId,
          supplierId,
          customerId
        )
        return res.status(200).send({ updatedRecord })
      } catch (error) {
        return errorHandler(res, error)
      }

    case 'DELETE':
      try {
        const deletedRecord = await deleteRecordById(id)
        return res.status(200).send({ deletedRecord })
      } catch (error) {
        return errorHandler(res, error)
      }

    default:
      return res.status(400).send('Invalid method')
  }
}
