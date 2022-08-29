import { NextApiRequest, NextApiResponse } from 'next'
import { createStock, getStocks } from '../../../backend/server/controllers/stocks/stock.controller'

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
        return res.status(500).send({ error })
      }

    case 'POST':
      try {
        const { productId, storeId, quantity, minQuantity } = body
        const stockCreated = await createStock(productId, storeId, quantity, minQuantity)
        return res.status(201).send({ stockCreated })
      } catch (error) {
        return res.status(500).send({ error })
      }

    default:
      return res.status(400).send('Invalid request')
  }
}
