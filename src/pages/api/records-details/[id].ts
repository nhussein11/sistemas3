/* eslint-disable no-case-declarations */
import { NextApiRequest, NextApiResponse } from 'next'
import {
  deleteRecordDetailsById,
  getRecordDetailsById,
  updateRecordDetailsById
} from '../../../backend/server/controllers/record-details/record-details.controller'
import { errorHandler } from '../../utils/errorResponseHandler'

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
        const recordDetails = await getRecordDetailsById(id)
        return res.status(200).send({ recordDetails })
      } catch (error) {
        return errorHandler(res, error)
      }
    case 'PUT':
      const { recordId, quantity } = body

      try {
        const updatedRecordDetails = await updateRecordDetailsById(
          id,
          recordId,
          quantity
        )
        return res.status(200).send({ updatedRecordDetails })
      } catch (error) {
        return errorHandler(res, error)
      }

    case 'DELETE':
      try {
        const deletedRecordDetails = await deleteRecordDetailsById(id)
        return res.status(200).send({ deletedRecordDetails })
      } catch (error) {
        return errorHandler(res, error)
      }

    default:
      return res.status(400).send('Invalid method')
  }
}
