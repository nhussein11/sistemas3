<<<<<<< HEAD:src/frontend/services/filterProducts.ts
import { Product } from '@prisma/client'
=======
import { Product } from '../../../shared/schemas/product.type'
>>>>>>> master:src/frontend/services/products/filterProducts.ts

export const filterProducts = (products: Product[], search: string) => {
  return products?.filter((product) => {
    return product.name.toLowerCase().includes(search.toLowerCase())
  })
}
