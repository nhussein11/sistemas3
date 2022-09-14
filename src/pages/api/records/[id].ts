/* eslint-disable no-case-declarations */
import { NextApiRequest, NextApiResponse } from 'next'
import {
  deleteRecordById,
  getRecordById,
  updateRecordById
} from '../../../backend/server/controllers/records/records.controller'

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
        return res.status(500).send({ error })
      }
    case 'PUT':
      const { observation, recordTypeId } = body

      try {
        const updatedRecord = await updateRecordById(
          id,
          observation,
          recordTypeId
        )
        return res.status(200).send({ updatedRecord })
      } catch (error) {
        return res.status(500).send({ error })
      }

    case 'DELETE':
      try {
        const deletedRecord = await deleteRecordById(id)
        return res.status(200).send({ deletedRecord })
      } catch (error) {
        console.log(error)

        return res.status(500).send({ error })
      }

    default:
      return res.status(400).send('Invalid method')
  }
}
