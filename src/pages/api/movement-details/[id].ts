/* eslint-disable no-case-declarations */
import { NextApiRequest, NextApiResponse } from 'next'
import { deleteMovementDetailsById, getMovementDetailsById, updateMovementDetailsById } from '../../../backend/server/controllers/movements-details/movement-details.controller'

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
        const movementDetails = await getMovementDetailsById(id)
        return res.status(200).send({ movementDetails })
      } catch (error) {
        return res.status(500).send({ error })
      }
    case 'PUT':
      const { productId, movementId, quantity } = body

      try {
        const updatedMovementDetails = await updateMovementDetailsById(id, productId, movementId, quantity)
        return res.status(200).send({ updatedMovementDetails })
      } catch (error) {
        return res.status(500).send({ error })
      }

    case 'DELETE':
      try {
        const deletedMovementDetails = await deleteMovementDetailsById(id)
        return res.status(200).send({ deletedMovementDetails })
      } catch (error) {
        return res.status(500).send({ error })
      }

    default:
      return res.status(400).send('Invalid method')
  }
}
