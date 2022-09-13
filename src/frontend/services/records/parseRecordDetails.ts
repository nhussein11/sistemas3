import { Product } from '@prisma/client'
import { UseQueryResult } from '@tanstack/react-query'
import { RecordDetailData } from '../../@types/frontend.types'

export const ParseRecordDetails = (
  records: RecordDetailData[],
  productsQuery: UseQueryResult<{ products: Product[] }, unknown>
) => {
  return records.map((record) => {
    const productPrice = productsQuery?.data?.products?.find(
      (product: Product) => product.id === record.productId
    )?.price
    return {
      stockId: record.stockId,
      quantity: record.quantity,
      subTotal: productPrice ? productPrice * record.quantity : 0
    }
  })
}
