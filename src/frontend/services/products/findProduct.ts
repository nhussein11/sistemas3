import { UseQueryResult } from '@tanstack/react-query'
import { Product } from '../../../shared/schemas/product.type'

export const findProduct = (
  id: string,
  productsQuery: UseQueryResult<{ products: Product[] }, unknown>
) => {
  const product = productsQuery.data?.products?.find(
    (product: Product) => product.id === id
  )
  return product?.name
}
