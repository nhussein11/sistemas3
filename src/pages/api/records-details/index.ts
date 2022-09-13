import { NextApiRequest, NextApiResponse } from 'next'
import {
  createRecordDetails,
  getRecordsDetails
} from '../../../backend/server/controllers/record-details/record-details.controller'

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
        return res.status(500).send({ error })
      }

    case 'POST':
      try {
        const { productId, movementId, quantity, subtotal } = body
        const recordDetailsCreated = await createRecordDetails(
          productId,
          movementId,
          quantity,
          subtotal
        )
        return res.status(201).send({ recordDetailsCreated })
      } catch (error) {
        return res.status(500).send({ error })
      }

    default:
      return res.status(400).send('Invalid request')
  }
}
