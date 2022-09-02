import { Product } from '@prisma/client'

export const filterProducts = (products: Product[], search: string) => {
  return products?.filter((product) => {
    return product.name.toLowerCase().includes(search.toLowerCase())
  })
}
