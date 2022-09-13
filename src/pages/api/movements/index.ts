import { NextApiRequest, NextApiResponse } from 'next'
import {
  createMovement,
  getMovements
} from '../../../backend/server/controllers/records/records.controller'

export default async function movements (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req

  switch (method) {
    case 'GET':
      try {
        const movements = await getMovements()
        return res.status(200).send({ movements })
      } catch (error) {
        return res.status(500).send({ error })
      }

    case 'POST':
      try {
        const { observation, movementTypeId, details } =
          body
        const movementCreated = await createMovement(
          observation,
          movementTypeId,
          details
        )
        return res.status(201).send({ movementCreated })
      } catch (error) {
        return res.status(500).send({ error })
      }

    default:
      return res.status(400).send('Invalid request')
  }
}
