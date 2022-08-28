import { NextApiRequest, NextApiResponse } from 'next'
import {
  createMovementDetails,
  getMovementsDetails
} from '../../../backend/server/controllers/movements-details/movement-details.controller'

export default async function movementsDetails (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req

  switch (method) {
    case 'GET':
      try {
        const movementsDetails = await getMovementsDetails()
        return res.status(200).send({ movementsDetails })
      } catch (error) {
        return res.status(500).send({ error })
      }

    case 'POST':
      try {
        const { productId, movementId, quantity } = body
        const movementDetailsCreated = await createMovementDetails(
          productId,
          movementId,
          quantity
        )
        return res.status(201).send({ movementDetailsCreated })
      } catch (error) {
        return res.status(500).send({ error })
      }

    default:
      return res.status(400).send('Invalid request')
  }
}
