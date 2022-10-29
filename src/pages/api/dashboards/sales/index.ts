import { NextApiRequest, NextApiResponse } from 'next'
import { getSales } from '../../../../backend/server/controllers/dashboards/dashboards.controller'
import { errorHandler } from '../../../../backend/server/controllers/errors/errorResponseHandler'

export default async function sales (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const sales = await getSales()
        return res.status(200).send({ sales })
      } catch (error) {
        return errorHandler(res, error)
      }

    default:
      return res.status(400).send('Invalid request')
  }
}
