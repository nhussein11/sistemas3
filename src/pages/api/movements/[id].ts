/* eslint-disable no-case-declarations */
import { NextApiRequest, NextApiResponse } from 'next'
import { deleteMovementById, getMovementById, updateMovementById } from '../../../backend/server/controllers/records/records.controller'

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
        const movement = await getMovementById(id)
        return res.status(200).send({ movement })
      } catch (error) {
        return res.status(500).send({ error })
      }
    case 'PUT':
      const { observation, movementTypeId } = body

      try {
        const updatedMovement = await updateMovementById(id, observation, movementTypeId)
        return res.status(200).send({ updatedMovement })
      } catch (error) {
        return res.status(500).send({ error })
      }

    case 'DELETE':
      try {
        const deletedMovement = await deleteMovementById(id)
        return res.status(200).send({ deletedMovement })
      } catch (error) {
        return res.status(500).send({ error })
      }

    default:
      return res.status(400).send('Invalid method')
  }
}
