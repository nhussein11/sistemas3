import { NextApiRequest, NextApiResponse } from 'next'
import {
  createRecordDetails,
  getRecordsDetails
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
        const { productId, movementId, quantity, subtotal, historicalPrice } = body
        const recordDetailsCreated = await createRecordDetails(
          productId,
          movementId,
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
