import { Product } from '../../shared/schemas/product.type'
import publicAxiosInstance from '../api/axios-api'

export const updateProduct = async ({ id, name, price, description }: Product) => {
  const response = await publicAxiosInstance.put(`/products/${id}`, {
    name,
    price,
    description
  })
  return response
}
