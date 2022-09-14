import { NextApiRequest, NextApiResponse } from 'next'
import {
  createRecord,
  getRecords
} from '../../../backend/server/controllers/records/records.controller'

export default async function records (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req

  switch (method) {
    case 'GET':
      try {
        const records = await getRecords()
        return res.status(200).send({ records })
      } catch (error) {
        return res.status(500).send({ error })
      }

    case 'POST':
      try {
        const {
          observation,
          senderName,
          address,
          recordTypeId,
          details
        } = body
        console.log(body)
        const recordCreated = await createRecord(
          observation,
          senderName,
          address,
          recordTypeId,
          details
        )
        return res.status(201).send({ recordCreated })
      } catch (error) {
        console.log('index record:', error)
        return res.status(500).send({ error })
      }

    default:
      return res.status(400).send('Invalid request')
  }
}
