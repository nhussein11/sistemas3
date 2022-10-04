import { Product } from '@prisma/client'
import { UseQueryResult } from '@tanstack/react-query'

export const findProductPrice = (
  id: string,
  productsQuery: UseQueryResult<{ products: Product[] }, unknown>
) => {
  const product = productsQuery.data?.products?.find(
    (product: Product) => product.id === id
  )
  return product?.price
}
