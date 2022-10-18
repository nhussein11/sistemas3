import { NextApiRequest, NextApiResponse } from 'next'
import { createStock, getStocks } from '../../../backend/server/controllers/stocks/stock.controller'
import { errorHandler } from '../../../backend/server/controllers/errors/errorResponseHandler'

export default async function stocks (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req

  switch (method) {
    case 'GET':
      try {
        const stocks = await getStocks()
        return res.status(200).send({ stocks })
      } catch (error) {
        return errorHandler(res, error)
      }

    case 'POST':
      try {
        const { productId, storeId, quantity, minQuantity } = body
        const stockCreated = await createStock(productId, storeId, quantity, minQuantity)
        return res.status(201).send({ stockCreated })
      } catch (error) {
        return errorHandler(res, error)
      }

    default:
      return res.status(400).send('Invalid request')
  }
}
