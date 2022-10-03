/* eslint-disable no-case-declarations */
import { NextApiRequest, NextApiResponse } from 'next'
import { deletePreviousRecordById, getPreviousRecordById, updatePreviousRecordById } from '../../../backend/server/controllers/previous-records/previous-record.controller'

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
        const previousRecord = await getPreviousRecordById(id)
        return res.status(200).send({ previousRecord })
      } catch (error) {
        return res.status(500).send({ error })
      }
    case 'PUT':
      const { higherRecordId, paidForRecordId } = body

      try {
        const updatedPreviousRecord = await updatePreviousRecordById(
          id,
          higherRecordId,
          paidForRecordId
        )
        return res.status(200).send({ updatedPreviousRecord })
      } catch (error) {
        return res.status(500).send({ error })
      }

    case 'DELETE':
      try {
        const deletedPreviousRecord = await deletePreviousRecordById(id)
        return res.status(200).send({ deletedPreviousRecord })
      } catch (error: any) {
        switch (error.code) {
          case 'P2003':
            return res.status(401).send({
              error,
              messageError:
                "You cannot delete this product because it's belong to an existing stock"
            })
          case 'P2025':
            return res.status(402).send({
              error,
              messageError: 'Id not provided'
            })
          default:
            return res.status(450).send({
              error,
              messageError: 'Something failed'
            })
        }
      }

    default:
      return res.status(400).send('Invalid method')
  }
}
