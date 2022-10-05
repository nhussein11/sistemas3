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
    console.log('PRECIO:')
    console.log(productPrice)
    return {
      stockId: record.stockId,
      productId: record.productId,
      quantity: record.quantity,
      subtotal: productPrice ? productPrice * record.quantity : 0
    }
  })
}
