import { Product } from '@prisma/client'
import { UseQueryResult } from '@tanstack/react-query'
import { RecordDetailData } from '../../@types/frontend.types'

export const ParseRecordDetails = (
  records: RecordDetailData[],
  productsQuery: UseQueryResult<{ products: Product[] }, unknown>
) => {
  return records.map((record) => {
    return {
      stockId: record.stockId,
      productId: record.productId,
      quantity: record.quantity,
      historicalPrice: record.historicalPrice,
      subtotal: record.historicalPrice ? record.historicalPrice * record.quantity : 0
    }
  })
}
