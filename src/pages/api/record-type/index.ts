import { NextApiRequest, NextApiResponse } from 'next'
import { createRecordType, getRecordsTypes } from '../../../backend/server/controllers/record-types/record-types.controller'
import { errorHandler } from '../../utils/errorResponseHandler'

export default async function recordType (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req

  switch (method) {
    case 'GET':
      try {
        const recordsTypes = await getRecordsTypes()
        return res.status(200).send({ recordsTypes })
      } catch (error) {
        return errorHandler(res, error)
      }

    case 'POST':
      try {
        const { recordType, recordName, cause } = body
        const recordTypeCreated = await createRecordType(
          recordType,
          recordName,
          cause
        )
        return res.status(201).send({ recordTypeCreated })
      } catch (error) {
        return errorHandler(res, error)
      }

    default:
      return res.status(400).send('Invalid request')
  }
}
