import { Product } from '../../shared/schemas/product.type'
import publicAxiosInstance from '../api/axios-api'

export const updateProduct = async ({ id, name, price, description, category }: Product) => {
  const response = await publicAxiosInstance.put(`/products/${id}`, {
    name,
    price,
    description,
    category
  })
  return response
}
