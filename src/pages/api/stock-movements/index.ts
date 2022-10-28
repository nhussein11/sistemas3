import { NextApiRequest, NextApiResponse } from 'next'
import { errorHandler } from '../../../backend/server/controllers/errors/errorResponseHandler'
import { createRecordByStockMovement } from '../../../backend/server/controllers/stock-movements/stock-movements.controller'

export default async function stocksMovements (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req

  switch (method) {
    case 'POST':
      try {
        const { recordTypeId, quantity, storeId, productId } = body
        const stockMovementCreated = await createRecordByStockMovement(
          recordTypeId,
          quantity,
          storeId,
          productId
        )
        return res.status(201).send({ stockMovementCreated })
      } catch (error) {
        return errorHandler(res, error)
      }

    default:
      return res.status(400).send('Invalid request')
  }
}
