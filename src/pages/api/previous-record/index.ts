import { NextApiRequest, NextApiResponse } from 'next'
import { createPreviousRecord, getPreviousRecord } from '../../../backend/server/controllers/previous-records/previous-record.controller'
import { errorHandler } from '../../../backend/server/controllers/errors/errorResponseHandler'

export default async function previousRecord (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req

  switch (method) {
    case 'GET':
      try {
        const previousRecords = await getPreviousRecord()
        return res.status(200).send({ previousRecords })
      } catch (error) {
        return errorHandler(res, error)
      }

    case 'POST':
      try {
        const {
          observation,
          address,
          letter,
          recordNumber,
          paidFor,
          recordTypeId,
          supplierId,
          customerId,
          paidForRecordIds
        } = body
        const previousRecordCreated = await createPreviousRecord(
          observation,
          address,
          letter,
          recordNumber,
          paidFor,
          recordTypeId,
          supplierId,
          customerId,
          paidForRecordIds
        )
        return res.status(201).send({ previousRecordCreated })
      } catch (error) {
        return errorHandler(res, error)
      }

    default:
      return res.status(400).send('Invalid request')
  }
}
