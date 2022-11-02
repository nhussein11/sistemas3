import { RecordNameEnum } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { getTransactionsDashboard } from '../../../../backend/server/controllers/dashboards/transactions.controller'
import { errorHandler } from '../../../../backend/server/controllers/errors/errorResponseHandler'

export default async function purchases (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const purchases = await getTransactionsDashboard(RecordNameEnum.FACTURA_ORIGINAL)
        return res.status(200).send({ data: purchases })
      } catch (error) {
        return errorHandler(res, error)
      }

    default:
      return res.status(400).send('Invalid request')
  }
}
