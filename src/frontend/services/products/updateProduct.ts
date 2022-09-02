<<<<<<< HEAD:src/frontend/services/updateProduct.ts
import { Product } from '@prisma/client'
import publicAxiosInstance from '../api/axios-api'
=======
import { Product } from '../../../shared/schemas/product.type'
import publicAxiosInstance from '../../api/axios-api'
>>>>>>> master:src/frontend/services/products/updateProduct.ts

export const updateProduct = async ({ id, name, price, description, category }: Product) => {
  const response = await publicAxiosInstance.put(`/products/${id}`, {
    name,
    price,
    description,
    category
  })
  return response
}
