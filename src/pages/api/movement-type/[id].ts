/* eslint-disable no-case-declarations */
import { NextApiRequest, NextApiResponse } from 'next'
import { deleteMovementTypeById, getMovementTypeById, updateMovementTypeById } from '../../../backend/server/controllers/movement-types/movement-types.controller'

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
        const movementType = await getMovementTypeById(id)
        return res.status(200).send({ movementType })
      } catch (error) {
        return res.status(500).send({ error })
      }
    case 'PUT':
      const { movementType, movementName, cause } = body

      try {
        const updatedMovementType = await updateMovementTypeById(
          id,
          movementType,
          movementName,
          cause
        )
        return res.status(200).send({ updatedMovementType })
      } catch (error) {
        return res.status(500).send({ error })
      }

    case 'DELETE':
      try {
        const deletedMovementType = await deleteMovementTypeById(id)
        return res.status(200).send({ deletedMovementType })
      } catch (error) {
        return res.status(500).send({ error })
      }

    default:
      return res.status(400).send('Invalid method')
  }
}
