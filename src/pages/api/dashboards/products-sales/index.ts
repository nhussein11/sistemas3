import { NextApiRequest, NextApiResponse } from 'next'
import { getProductsSales } from '../../../../backend/server/controllers/dashboards/productsSales.controller'
import { errorHandler } from '../../../../backend/server/controllers/errors/errorResponseHandler'

export default async function productsSales (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const productsSales = await getProductsSales()
        return res.status(200).send({ data: productsSales })
      } catch (error) {
        return errorHandler(res, error)
      }

    default:
      return res.status(400).send('Invalid request')
  }
}
