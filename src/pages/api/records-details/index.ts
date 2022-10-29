import { NextApiRequest, NextApiResponse } from 'next'
import {
  getRecordsDetails,
  createRecordDetails
} from '../../../backend/server/controllers/record-details/record-details.controller'
import { errorHandler } from '../../../backend/server/controllers/errors/errorResponseHandler'

export default async function recordsDetails (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req

  switch (method) {
    case 'GET':
      try {
        const recordsDetails = await getRecordsDetails()
        return res.status(200).send({ recordsDetails })
      } catch (error) {
        return errorHandler(res, error)
      }

    case 'POST':
      try {
        const { stockId, recordId, quantity, subtotal, historicalPrice } = body
        const recordDetailsCreated = await createRecordDetails(
          stockId,
          recordId,
          quantity,
          subtotal,
          historicalPrice
        )
        return res.status(201).send({ recordDetailsCreated })
      } catch (error) {
        return errorHandler(res, error)
      }

    default:
      return res.status(400).send('Invalid request')
  }
}
