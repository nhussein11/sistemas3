/* eslint-disable no-case-declarations */
import { NextApiRequest, NextApiResponse } from 'next'
import { getRecordTypeById, updateRecordTypeById } from '../../../backend/server/controllers/record-types/record-types.controller'
import { deleteRecordById } from '../../../backend/server/controllers/records/records.controller'

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
        const recordType = await getRecordTypeById(id)
        return res.status(200).send({ recordType })
      } catch (error) {
        return res.status(500).send({ error })
      }
    case 'PUT':
      const { recordType, recordName, cause } = body

      try {
        const updatedRecordType = await updateRecordTypeById(
          id,
          recordType,
          recordName,
          cause
        )
        return res.status(200).send({ updatedRecordType })
      } catch (error) {
        return res.status(500).send({ error })
      }

    case 'DELETE':
      try {
        const deletedRecordType = await deleteRecordById(id)
        return res.status(200).send({ deletedRecordType })
      } catch (error) {
        return res.status(500).send({ error })
      }

    default:
      return res.status(400).send('Invalid method')
  }
}
